import React from "react";
import "../CSS/Trainee/StudReg.css";
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
      <div className="NavBodyy">
        <div className="logoDivv">
          <img src={cdacLogo} alt="CDAC LOGO" className="logoo" />
        </div>
        <div className="head-title-22">
          <h1>Trainee Work Harvester</h1>
        </div>
      </div>
    </>
  );
};

export default NavBar2;
