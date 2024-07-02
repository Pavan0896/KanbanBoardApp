import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Column from "./Column";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const TodoBoard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/board/todo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDrop = async (item, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === item._id ? { ...todo, status: newStatus } : todo
      )
    );
    console.log(
      `${import.meta.env.VITE_BACKEND_URL}/board/todoUpdate/${item._id}`
    );

    try {
      let response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/board/todoUpdate/${item._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
      // Optionally revert the status change in the frontend if the API call fails
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === item._id ? { ...todo, status: item.status } : todo
        )
      );
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/createTodo">
            <Button>Create new Todo</Button>
          </Link>
          <Box display="flex" justifyContent="space-evenly" gap={10} p={5}>
            <Column
              status="to-do"
              title={{ text: "To Do", bgColor: "#fc7f03" }}
              items={todos?.filter((e) => e.status === "to-do")}
              onDrop={handleDrop}
            />
            <Column
              status="in progress"
              title={{ text: "In Progress", bgColor: "#03fcba" }}
              items={todos?.filter((e) => e.status === "in progress")}
              onDrop={handleDrop}
            />
            <Column
              status="done"
              title={{ text: "Done", bgColor: "#03fc07" }}
              items={todos?.filter((e) => e.status === "done")}
              onDrop={handleDrop}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default TodoBoard;
