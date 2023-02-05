import React from "react";
import "../CSS/NavBar3.css";
import { cdacLogo, settings } from "../Images/Images";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavBar3 = () => {
  //navigation
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/reg-institute";
    navigate(path);
  };

  //Drop-Down Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

            <MenuItem id="menu-items" onClick={handleClose}>
              Change Password
            </MenuItem>
            <MenuItem id="menu-items" onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default NavBar3;
