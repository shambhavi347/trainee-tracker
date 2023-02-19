import React, { useState } from "react";
// import Admin from "../../../server/dbmodel/admin";

const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setAdmin({ ...admin, [name]: value });
    console.log(admin);
  };

  const PostData = async (e) => {
    e.preventDefault();
    //console.log(admin);

    const { email, password } = admin;

    e.preventDefault();
    const res = await fetch("/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const reason = await res.json();
    console.log(reason);

    if (res.status === 400) {
      window.alert(reason.error);
    } else {
      console.log("Successfull Login");
      //   routeChange();
    }
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <form method="POST">
        EMAIL{" "}
        <input
          type="text"
          name="email"
          placegolder="email..."
          onChange={handleChange}
        />
        Password{" "}
        <input
          type="text"
          name="password"
          placeholder="Password.."
          onChange={handleChange}
        />
        <button onClick={PostData}>Login</button>
      </form>
    </>
  );
};

export default Login;
