import React from "react";
import "../CSS/NavBar2.css";
import { cdacLogo } from "../Images/Images";
import { useNavigate } from "react-router-dom";
const NavBar2 = () => {
  //   let navigate = useNavigate();
  //   const routeChange = () => {
  //     let path = "/reg-institute";
  //     navigate(path);
  //   };

  return (
    <>
      <div className="NavBody">
        <div className="logoDiv">
          <img src={cdacLogo} alt="CDAC LOGO" className="logo" />
        </div>
        <div className="head-title">
          <h1>Trainee Tracker</h1>
        </div>
      </div>
    </>
  );
};

export default NavBar2;
