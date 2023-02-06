import { useState } from "react";
// import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Trainee/RegStudent.css";
import React, { useEffect } from "react";

const RegStudent = ({ page, setPage }) => {
  //js
  const [user, setUser] = useState({
    first_name: "",
    // middle_name: "",
    last_name: "",
    email: "",
    dob: "",
    // username: "",
    // password: "",
    phone_no: "",
    gender: "male",
  });

  const [err, setErr] = useState("");
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  // const [req, setReq] = useState(false);
  // const [count, setCount] = useState(0);
  // console.log(count);
  let navigate = useNavigate();
  // useEffect(() => {
  //     if (req) {
  //     const routeChange = () => {
  //         let path = "/reg-student1";
  //         navigate(path);
  //     };
  //     routeChange();
  //     }
  // }, [req, navigate]);

  return (
    //html
    <>
      <NavBar2 />
      <div class="divUpper">
        {/* <div className="body"> */}

        <div className="main">
          <h1 className="regHead">Register Yourself</h1>
          <div className="regBox">
            <form onSubmit={handleSubmit}>
              <input
                className="form-element"
                type="text"
                placeholder="First Name"
                name="first_name"
                value={user.first_name}
                autoComplete="off"
                onChange={handleChange}
              />
              {/* <input
                                className="form-element"
                                type="text"
                                placeholder="Middle Name"
                                name="name"
                                value={user.middle_name}
                                autoComplete="off"
                                onChange={handleChange}
                            /> */}{" "}
              <input
                className="form-element"
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={user.last_name}
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                className="form-element"
                type="email"
                name="email"
                placeholder="Email Address"
                value={user.email}
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                className="form-element"
                type="text"
                name="phone_no"
                value={user.phone_no}
                placeholder="Contact Number"
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                className="form-element"
                type="date"
                name="dob"
                value={user.dob}
                placeholder="DOB (dd/mm/yy)"
                autoComplete="off"
                onChange={handleChange}
              />
              {/* <input
                                className="form-element"
                                type="text"
                                name="username"
                                value={user.username}
                                placeholder="Username..."
                                autoComplete="off"
                                onChange={handleChange}
                            /> */}
              {/* <input
                                className="form-element"
                                type="password"
                                name="password"
                                value={user.password}
                                placeholder="Password..."
                                autoComplete="off"
                                onChange={handleChange}
                            /> */}
              <div className="radioGroup">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleChange}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleChange}
                />
                Female
                <input
                  type="radio"
                  name="gender"
                  value="transgender"
                  checked={user.gender === "transgender"}
                  onChange={handleChange}
                />
                Transgender
              </div>
              <button className="btn" onClick={() => navigate("/reg-student1")}>
                Next
              </button>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default RegStudent;
