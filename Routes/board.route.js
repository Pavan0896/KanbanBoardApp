const express = require("express");
const auth = require("../Middlewares/auth.middleware");
const TodoModel = require("../Models/todo.model");
const {
  postTodos,
  patchTodos,
  getTodos,
  deleteTodos,
} = require("../Conrtollers/todo.controller");

const boardRouter = express.Router();

boardRouter.post("/todo", auth, postTodos);

boardRouter.get("/todo", auth, getTodos);

boardRouter.patch("/todoUpdate/:id", auth, patchTodos);

boardRouter.delete("/todoDelete/:id", auth, deleteTodos);

module.exports = boardRouter;
