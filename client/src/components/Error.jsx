import React from "react";
import NavBar1 from "../components/NavBar1.jsx";
import { caveman } from "../Images/Images.js";
import "../CSS/Error.css";
import { useNavigate } from "react-router-dom";
const Error = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  return (
    <>
      {/* <NavBar1 /> */}
      <div className="err-bdy">
        <div className="img-error-div">
          <img src={caveman} alt="" className="img-error" />
        </div>
        <div className="text-error">
          <h1 className="error-title">404</h1>{" "}
          <h1 className="error-title-1">UH OH! You're lost</h1>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the buton below to go back to the
            homepage
          </p>
          <button className="btn-home" onClick={routeChange}>
            Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
