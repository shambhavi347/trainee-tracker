import React from "react";
import "../CSS/Trainee/StudReg.css";
import { cdacLogo } from "../Images/Images";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

const NavBar2 = ({ retTheme }) => {
  //   let navigate = useNavigate();
  //   const routeChange = () => {
  //     let path = "/reg-institute";
  //     navigate(path);
  //   };
  let theme;
  const toggleTheme = () => {
    retTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className="NavBodyy">
        <div className="logoDivv">
          <img src={cdacLogo} alt="CDAC LOGO" className="logoo" />
        </div>
        <div className="head-title-22">
          <h1>Trainee Work Harvester</h1>
        </div>
        <div className="switch-toggle">
          <Switch onChange={toggleTheme} checked={theme === "light"} />
        </div>
      </div>
    </>
  );
};

export default NavBar2;
