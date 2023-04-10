import React, { useState } from "react";
import "../CSS/Trainee/StudReg.css";
import { cdacLogo } from "../Images/Images";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import "../CSS/NavBar2.css";

const NavBar2 = ({ retTheme }) => {
  const [theme, setTheme] = useState("");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
    retTheme((curr) => (curr === "dark" ? "light" : "dark"));
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
          <label htmlFor="switch" className="switchLabel">
            Dark Mode
          </label>
          <Switch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
    </>
  );
};

export default NavBar2;
