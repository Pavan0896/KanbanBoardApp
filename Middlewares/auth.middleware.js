const jwt = require("jsonwebtoken");
const blacklist = require("../BlacklistToken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.send({ message: "Not Authorized" });
  }
  if (token) {
    if (blacklist.includes(token)) {
      res.send({ message: "You are logged out. Login Again." });
    }
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.send({ message: "Error while comparing token" });
      }
      req.body.role = decoded.role;
      req.body.user_id = decoded.id;
      req.body.userName = decoded.userName
      next();
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Error" });
  }
};

module.exports = auth;
