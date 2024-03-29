import React, { useState } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/Coordinator/RegCoordinator.css";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import Captcha from "../Captcha";
import { closeeye, seen } from "../../Images/Images";

export const ThemeContext = createContext(null);
const CoordReg = () => {
  const [theme, setTheme] = useState("light");
  const [showPass, setShowPass] = useState("password");
  const [eye, setEye] = useState(closeeye);
  const [hover, setHover] = useState(false);
  const retTheme = (btn) => {
    setTheme(btn);
  };
  const [user, setUser] = useState({
    salutation: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_pass: "",
  });
  console.log(user);
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + value);
    setUser({ ...user, [name]: value });
    // setUserRegistration({ ...userRegistration, [name]: value });
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const [valid, setValid] = useState(false);

  const retValid = (btn) => {
    setValid(btn);
  };

  const PostData = async (e) => {
    e.preventDefault();
    if (user.password === user.confirm_pass && valid === true) {
      console.log(user);
      const {
        salutation,
        first_name,
        middle_name,
        last_name,
        email,
        phone,
        password,
      } = user;

      const res = await fetch("/coordinator-reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salutation,
          first_name,
          middle_name,
          last_name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.status === 422 || data.error) {
        window.alert(data.error);
        console.log("Invalid Registration!❌");
      } else {
        window.alert("Registration Successfull !✔");
        routeChange();
      }
    } else if (valid !== true) {
      window.alert("Captcha does not match");
      // console.log("Successfull Regestration");
    } else {
      window.alert("Confirm Password does not match");
      console.log("Confirm Password does not match");
    }
  };
  const handlePass = (e) => {
    e.preventDefault();
    if (showPass === "password") {
      setShowPass("text");
      setEye(seen);
    } else {
      setShowPass("password");
      setEye(closeeye);
    }
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, retTheme }}>
        <div id={theme}>
          <NavBar2 retTheme={retTheme} />
          <div className="body-reg-coord">
            <h1 className="regHead-coord">Register Yourself</h1>
            {hover ? (
              <>
                <div className="pass-rules">
                  <h4>Password Rules</h4>
                  <ul>
                    <li>Must conatain an uppercase letter</li>
                    <li>Must conatain a lowercase letter</li>
                    <li>Must conatain a number</li>
                    <li>Must conatain a special character </li>
                    <li>Must be of minimum 8 character</li>
                  </ul>
                </div>
              </>
            ) : null}
            <div className="form-body-coord-up">
              <form action="" method="POST" className="form-body-coord">
                <select
                  name="salutation"
                  className="drop-down-coord"
                  value={user.salutation}
                  onChange={handlechange}
                >
                  <option value="Select">Salutation *</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>

                <input
                  className="form-text-coord"
                  type="text"
                  autoComplete="off"
                  value={user.first_name}
                  onChange={handlechange}
                  name="first_name"
                  id="name"
                  placeholder="First Name *"
                />

                <input
                  className="form-text-coord"
                  type="text"
                  autoComplete="off"
                  value={user.middle_name}
                  onChange={handlechange}
                  name="middle_name"
                  id="name"
                  placeholder="Middle Name"
                />
                <input
                  className="form-text-coord"
                  type="text"
                  autoComplete="off"
                  value={user.last_name}
                  onChange={handlechange}
                  name="last_name"
                  id="name"
                  placeholder="Last Name"
                />
                <input
                  className="form-text-coord"
                  type="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handlechange}
                  name="email"
                  id="email"
                  placeholder="Email *"
                />

                <input
                  className="form-text-coord"
                  type="text"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handlechange}
                  name="phone"
                  id="phone"
                  placeholder="Phone No. *"
                />

                {/* <input
                  className="form-text-coord"
                  type="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={handlechange}
                  name="password"
                  id="password"
                  placeholder="Set Password *"
                /> */}
                <div
                  className="form-element-coord-pass"
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                >
                  {/* {showPass ? ( */}
                  <input
                    type={showPass}
                    name="password"
                    placeholder="Set Password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handlechange}
                    className="input-pass"
                  />

                  <button className="show-pass" onClick={handlePass}>
                    <img className="pass-img" src={eye} alt="" />
                  </button>
                </div>
                <input
                  className="form-text-coord"
                  type="password"
                  autoComplete="off"
                  value={user.confirm_pass}
                  onChange={handlechange}
                  name="confirm_pass"
                  id="password"
                  placeholder="Confirm Password *"
                />

                <Captcha
                  retValid={retValid}
                  captchaRefreshContainer="captcha-refresh-container captcha-refresh-container-reg-coord"
                  inputContainerClass="input-container input-container-reg-coord"
                  captchaClass="captcha captcha-login"
                />

                <div className="footer-coord">
                  <button
                    type="submit"
                    className="btn-coord"
                    onClick={PostData}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
};
export default CoordReg;
