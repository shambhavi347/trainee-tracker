import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Trainee/RegStudent.css";
import { validEmail, validPassword } from "../../components/Regex";

const TraineeReg = () => {
  const [req, setReq] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (req) {
      const routeChange = () => {
        let path = "/";
        navigate(path);
      };
      routeChange();
    }
  }, [req, navigate]);

  const postData = async (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      const { email, password } = user;

      const res = await fetch("/trainee-reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        window.alert(data.error);
        console.log("Invalid Regestration");
      } else {
        window.alert("Registration Successfully");
        console.log("Successfull Regestration");
        routeChange();
      }
    } else {
      window.alert("Confirm Password does not match");
      console.log("Confirm Password does not match");
    }
  };

  return (
    <>
      <NavBar2 />
      {/* <div className="DivUpper">
        <div className="main">
          <br />
          <br />
          <h1 className="regHead">Register Yourself</h1>
          <br />
          <div className="regBox">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            > */}
      {/* className="forgot-bdy" */}
      <div>
        <div className="trainee-reg-pic ">
          <input
            style={{ marginTop: "12%" }}
            className="form-element form-email"
            type="email"
            name="email"
            placeholder="Registered Email"
            value={user.email}
            autoComplete="off"
            onChange={handleChange}
          />
          <input
            className="form-element form-password"
            type="password"
            name="password"
            value={user.password}
            placeholder="Set Password"
            autoComplete="off"
            onChange={handleChange}
          />
          <input
            className="form-element form-password"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={handleChange}
          />
          <br />
          <button className="btn-form" onClick={postData}>
            SUBMIT
          </button>
          {/* </form> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default TraineeReg;
