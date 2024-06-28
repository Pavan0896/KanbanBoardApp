const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
      type: [{ type: String, require: true, enum: ["admin", "user"] }],
      default: ["user"],
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
