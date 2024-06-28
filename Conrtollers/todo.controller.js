const TodoModel = require("../Models/todo.model");

const postTodos = async (req, res) => {
  const { title, status, role, user_id, userName } = req.body;
  if (role == "admin" || role == "user") {
    const todo = new TodoModel({ title, status, user_id, userName });
    await todo.save();
    res.status(200).send({ message: "Todo added Successfully." });
  } else {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const patchTodos = async (req, res) => {
  const { role, status, user_id } = req.body;
  const id = req.params.id;

  try {
    if (role == "admin") {
      await TodoModel.findByIdAndUpdate(id, { $set: { status: status } });
      res.status(200).send({ message: "Updated Successfully." });
    } else if (role == "user") {
      const updateResult = await TodoModel.updateOne(
        { _id: id, user_id: user_id },
        { $set: { status: status } }
      );

      if (updateResult.nModified === 0) {
        res.status(403).send({ message: "Not Authorized to update." });
      } else {
        res.status(200).send({ message: "Updated Successfully." });
      }
    } else {
      res.status(403).send({ message: "Not Authorized to update." });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    if (!res.headersSent) {
      res.status(500).send({ message: "Internal Server Error." });
    }
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ message: "Internal Error." });
  }
};

const deleteTodos = async (req, res) => {
  const { role } = req.body;
  const id = req.params.id;
  if (role == "admin") {
    try {
      await TodoModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ message: "Deleted Successfully." });
    } catch (error) {
      res.status(500).send({ messge: "Internal error" });
    }
  } else {
    res.status(200).send({ message: "Not Authorised to delete." });
  }
};
module.exports = { postTodos, getTodos, patchTodos, deleteTodos };
