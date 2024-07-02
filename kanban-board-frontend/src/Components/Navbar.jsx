import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = JSON.parse(localStorage.getItem("auth")) || false;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        marginBottom: "2%",
        marginTop: "1%",
        fontSize: "large",
      }}
    >
      <Link to="/kanban-board">Kanban Board</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">{auth ? "Logout" : "Login"}</Link>
    </div>
  );
};

export default Navbar;
