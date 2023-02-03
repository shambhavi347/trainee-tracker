import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "./NavBar1";
import { cdacLogo } from "../Images/Images";
import "../CSS/MainPage.css";

const MainPage = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/reg-institute";
    navigate(path);
  };

  return (
    <>
      <NavBar1 />
      <div class="divUpper">
        <div class="divLower">MAIN PAGE</div>
      </div>
      {/* <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img
              src={cdacLogo}
              alt="Avatar"
              style="width:300px;height:300px;"
            />
          </div>
          <div class="flip-card-back">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MainPage;
