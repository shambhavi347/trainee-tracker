import React from "react";
import "../CSS/NavBar1.css";
import { cdacLogo } from "../Images/Images";
import { useNavigate } from "react-router-dom";
const NavBar1 = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/reg-institute";
    navigate(path);
  };

  return (
    <>
      <div class="NavBody">
        <div class="logoDiv">
          <img src={cdacLogo} alt="CDAC LOGO" className="logo" />
        </div>
        <div class="head-title">
          <h1>Trainee Tracker</h1>
        </div>
        <div class="buttonLogin">
          <button class="btn-login" onClick={routeChange}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar1;
