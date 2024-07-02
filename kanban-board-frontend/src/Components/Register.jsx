import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Input, Select } from '@chakra-ui/react'


const Register = () => {
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      userName,
      email,
      password,
      role,
    };
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      let data = await res.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Heading mb={5}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="User Name"
          width={350}
          value={userName}
          onInput={(e) => setUserName(e.target.value)}
        />
        <br />
        <Input
          type="text"
          placeholder="Email"
          width={350}
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          width={350}
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
        <br />
        <Select onChange={(e) => setRole(e.target.value)} width={350} alignItems={"center"} textAlign={"center"} marginLeft={592}>
          <option value="">Choose role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
        <br />
        <Input type="submit" placeholder="Submit" width={350} bgColor={"#0384fc"} color={"white"}/>
      </form>
    </div>
  );
};

export default Register;
