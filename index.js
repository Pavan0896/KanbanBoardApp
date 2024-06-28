const express = require("express");
const connection = require("./Config/db");
const userRouter = require("./Routes/user.route");
const boardRouter = require("./Routes/board.route");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
app.use("/user", userRouter);
app.use("/board", boardRouter);

app.get("/", (req, res) => {
  res.status(200).send("Health check is fine");
});

app.listen(port, async () => {
  await connection;
  console.log(`Server is running in port ${port} and db is connected`);
});
