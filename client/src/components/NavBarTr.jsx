import React, { useState } from "react";
import "../CSS/Trainee/StudReg.css";
import { cdacLogo } from "../Images/Images";
import "../CSS/NavBar2.css";

const NavBarTr = () => {
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

export default NavBarTr;
