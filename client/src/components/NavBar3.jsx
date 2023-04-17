import React, { useState } from "react";
import "../CSS/NavBar3.css";
import { cdacLogo, settings, cancel } from "../Images/Images";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "react-switch";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const NavBar3 = ({ retTheme }) => {
  //navigation
  let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = "/reg-institute";
  //   navigate(path);
  // };

  // let theme;
<<<<<<< HEAD
  const [theme, setTheme] = useState("light");
  // var theme = "";
=======
  const [theme, setTheme] = useState("");
>>>>>>> fbb110e81b65fe633b60284fdfc96c71549ada6f
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    retTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const routeMain = () => {
    let path = "/";
    navigate(path);
  };
  //Drop-Down Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [password, setPassword] = useState(false);
  const [pass, setPass] = useState({
    old_pass: "",
    new_pass: "",
  });
  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setPass({ ...pass, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { old_pass, new_pass } = pass;

    e.preventDefault();
    if (old_pass === new_pass) {
      window.alert("New Password is same as old Password! Enter again");
    } else {
      const res = await fetch("/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          old_pass,
          new_pass,
        }),
      });
      const reason = await res.json();
      console.log(reason);

      if (res.status === 422) {
        window.alert(reason.error);
      } else {
        window.alert("Password Change Successful");
      }
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePassword = () => {
    setAnchorEl(null);
    setPassword(true);
  };
  return (
    <>
      <div className="NavBody">
        <div className="logoDiv" onClick={routeMain}>
          <img src={cdacLogo} alt="CDAC LOGO" className="logo" />
        </div>
        <div className="head-title">
          <h1>Trainee Work Harvester</h1>
        </div>
        {/* <div className="buttonLogin">
          <button className="btn-login">Login</button>
        </div> */}

        <div className="menu">
          <Button
            // className="div-setting"
            sx={{ height: 50, width: 30, marginRight: 7, marginTop: 1 }}
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {/* Dashboard */}
            <img className="settings-icon" src={settings} alt="" />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}

            <MenuItem id="menu-items" onClick={handlePassword}>
              Change Password
            </MenuItem>
            <MenuItem id="menu-items" style={{color:theme === "light" ? "#FFB319" : "#00abd5"}} className="switch-toggle-coord">
              <label htmlFor="switch" className="switchLabel-coord"> 
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </label>
              {/* <Switch onChange={toggleTheme} checked={theme === "light"} /> */}
              <DarkModeSwitch onChange={toggleTheme} checked={theme === "dark"} style={{color:theme === "light" ? "FFB319" : "lightblue"}} />
            </MenuItem>
            <Link to="/logout">
              <MenuItem id="menu-items" onClick={handleClose}>
                Logout
              </MenuItem>
            </Link>
          </Menu>
        </div>
        {password ? (
          <>
            <div className="pass-box">
              <button className="cancel-btn-login">
                <img
                  className="cancel-img"
                  src={cancel}
                  alt="close login box"
                  onClick={() => setPassword(false)}
                />
              </button>
              <form method="POST">
                <input
                  type="text"
                  name="old_pass"
                  placeholder="Old Password"
                  className="login-component"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="new_pass"
                  placeholder="Set New Password"
                  className="login-component"
                  onChange={handleChange}
                />
                <button
                  className="login-component login-btn"
                  onClick={PostData}
                >
                  Submit
                </button>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default NavBar3;
