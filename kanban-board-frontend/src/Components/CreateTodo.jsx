import { Box, Heading, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

const CreateTodo = () => {
  let [title, setTitle] = useState("");
  let [status, setStatus] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { title, status };
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/board/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      let data = await res.json(); 
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Heading mb={5}> Create Todo</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Todo"
          w="60%"
          value={title}
          onInput={(e) => setTitle(e.target.value)}
        />
        <br />
        <Select onChange={(e)=>setStatus(e.target.value)} w="60%" ml={307}>
          <option value="">Status</option>
          <option value="to-do">To Do </option>
          <option value="in progress">In Progress </option>
        </Select><br/>
        <Input type="submit" value="Add" w="10%" bgColor={"cyan"} />
      </form>
    </Box>
  );
};

export default CreateTodo;

