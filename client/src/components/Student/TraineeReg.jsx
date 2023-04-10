import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/Trainee/RegStudent.css";
import NavBarTr from "../NavBarTr";

const TraineeReg = () => {
  const [req, setReq] = useState(false);
  const [error, setError] = useState("");
  const [passUpper, setPassUpper] = useState("red");
  const [passLower, setPassLower] = useState("red");
  const [passNum, setPassNum] = useState("red");
  const [passSpe, setPassSpe] = useState("red");
  const [passMin, setPassMin] = useState("red");
  const [btnDisable, setBtnDisable] = useState(true);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    var hasNumber = /\d/;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password.length === 0) {
      setPassUpper("red");
      setPassLower("red");
      setPassMin("red");
      setPassNum("red");
      setPassSpe("red");
      setBtnDisable(true);
    } else {
      if (password !== password.toLowerCase()) setPassUpper("green");
      else setPassUpper("red");
      if (password !== password.toUpperCase()) setPassLower("green");
      else setPassLower("red");
      if (hasNumber.test(password)) setPassNum("green");
      else setPassNum("red");
      if (format.test(password)) setPassSpe("green");
      else setPassSpe("red");
      if (password.length > 7) setPassMin("green");
      else setPassMin("red");
    }
  }, [password]);
  useEffect(() => {
    if (
      passLower === "green" &&
      passUpper === "green" &&
      passNum === "green" &&
      passSpe === "green" &&
      passMin === "green"
    )
      setBtnDisable(false);
    else setBtnDisable(true);
  }, [passUpper, passLower, passMin, passNum, passSpe]);
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
    if (password === user.confirmPassword) {
      const { email } = user;

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
        setError(data.error);
        // window.alert(data.error);
        // console.log("Invalid Regestration");
      } else {
        window.alert("Registration Successfully");
        console.log("Successfull Regestration");
        routeChange();
      }
    } else {
      setError("Confirm Password does not match");
    }
  };

  return (
    <>
      {/* <ThemeContext.Provider value={{ theme, retTheme }}>
        <div id={theme}>
          <NavBar2 retTheme={retTheme} /> */}
      <NavBarTr />
      <div className="trainee-reg-up" style={{ marginTop: "1%" }}>
        <h1 style={{ textAlign: "center" }}>Trainee Registration</h1>
        {error ? (
          <div style={{ color: "red", marginRight: "5%" }}>{error}</div>
        ) : null}
        <div className="trainee-reg-box">
          <div className="formRegTrainee">
            <input
              className="form-element-trainee"
              type="email"
              name="email"
              placeholder="Registered Email"
              value={user.email}
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              className="form-element-trainee"
              type="text"
              // type="password"
              name="password"
              value={password}
              placeholder="Set Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="form-element-trainee"
              type="text"
              // type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={handleChange}
            />
            <br />

            {btnDisable ? (
              <button className="btn-trainee-disable" disabled={btnDisable}>
                SUBMIT
              </button>
            ) : (
              <button className="btn-form-trainee" onClick={postData}>
                SUBMIT
              </button>
            )}
          </div>
          <div className="rules">
            {/* <p style={{ fontSize: "small" }}> */}
            <ul>
              <p style={{ color: passUpper }}>Must Conatin Uppercase Letter</p>
              <p style={{ color: passLower }}>Must Contain Lowercase Letter</p>
              <p style={{ color: passNum }}>Must Contain a Numeric Value</p>
              <p style={{ color: passSpe }}>Must Contain a Special Symbol</p>
              <p style={{ color: passMin }}>
                Must Contain Minimum 8 Characters
              </p>
            </ul>
            {/* </p> */}
          </div>
        </div>
      </div>
      {/* </div>
      </ThemeContext.Provider> */}
    </>
  );
};

export default TraineeReg;
