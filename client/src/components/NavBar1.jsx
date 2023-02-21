import React, { useState } from "react";
import "../CSS/NavBar1.css";
import { cdacLogo, cancel } from "../Images/Images";
import { useNavigate } from "react-router-dom";
const NavBar1 = () => {
  let navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const routeChangeAdmin = () => {
    let path = "/admin-dashboard";
    navigate(path);
  };

  const routeChangeTrainee = () => {
    let path = "/trainee-dashboard";
    navigate(path);
  };

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
      if (reason.message === "Admin") {
        console.log("Admin login");
        routeChangeAdmin();
      } else if (reason.message === "Institute") console.log("Institute Login");
      else if (reason.message === "Trainee") {
        console.log("Trainee Login");
        routeChangeTrainee();
      } else console.log("Coord Login");
    }
  };

  return (
    <>
      <div className="NavBody">
        <div className="logoDiv">
          <img src={cdacLogo} alt="CDAC LOGO" className="logo" />
        </div>
        <div className="head-title">
          <h1>Trainee Tracker</h1>
        </div>
        <div className="buttonLogin">
          <button className="btn-login" onClick={() => setOpenLogin(true)}>
            Login
          </button>
        </div>
        {openLogin ? (
          <div className="login-box">
            <button className="cancel-btn-login">
              <img
                className="cancel-img"
                src={cancel}
                alt="close login box"
                onClick={() => setOpenLogin(false)}
              />
            </button>
            {/* <h3>Login Yourself!!</h3> */}
            <div className="login-form">
              <form method="POST">
                {/* <h3>Login</h3> */}
                <input
                  type="email"
                  name="email"
                  className="login-component"
                  placeholder="email..."
                  autoComplete="off"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="password"
                  className="login-component"
                  placeholder="Password.."
                  autoComplete="off"
                  onChange={handleChange}
                />
                <button
                  onClick={PostData}
                  className="login-component login-btn"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NavBar1;
