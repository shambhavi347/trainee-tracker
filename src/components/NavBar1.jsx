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
      <div className="NavBody">
        <div className="logoDiv">
          <img src={cdacLogo} alt="CDAC LOGO" className="logo" />
        </div>
        <div className="head-title">
          <h1>Trainee Tracker</h1>
        </div>
        <div className="buttonLogin">
          <button className="btn-login">Login</button>
        </div>
      </div>
    </>
  );
};

export default NavBar1;
