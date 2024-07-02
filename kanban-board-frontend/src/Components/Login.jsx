import { useEffect, useState } from "react";
import { Button, Heading, Input } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [auth, setAuth] = useState(false);

  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem("auth")) || false;
    setAuth(auth);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      let data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", (data.role[0]));
      localStorage.setItem("auth", JSON.stringify(true));
      setAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      console.log(data);
      localStorage.setItem("auth", JSON.stringify(false));
      setAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!auth ? (
        <>
          <Heading mb={5}>Login</Heading>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter Email"
              width={350}
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              type="password"
              placeholder="Enter Password"
              width={350}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
            <br />
            <Input
              type="submit"
              value="Login"
              width={150}
              bgColor={"#0384fc"}
              color={"white"}
            />
          </form>
        </>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
    </div>
  );
};

export default Login;
