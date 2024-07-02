import { useDrag } from "react-dnd";
import { Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const CardComponent = ({ item, type }) => {
  const role = localStorage.getItem("role");
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = async (id) => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/board/todoDelete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card boxShadow="lg" mt={3} mb={3}>
        <CardBody>
          <Heading fontSize="large">{item.title}</Heading>
          <Text>Created by {item.userName}</Text>
          <Button
            isDisabled={role !== "admin"}
            onClick={() => handleDelete(item._id)}
            bgColor={"red"}
            color={"white"}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(CardComponent);
