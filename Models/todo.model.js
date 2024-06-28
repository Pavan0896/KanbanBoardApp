const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, require: true },
  status: {
    type: String,
    enum: ["to-do", "in progress", "done"],
    default: ["to-do"],
  },
  user_id: { type: String, require: true },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
