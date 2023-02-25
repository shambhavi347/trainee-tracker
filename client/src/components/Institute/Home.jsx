import React, { useState, useEffect } from "react";
import NavBar3 from "../NavBar3";
import "../../CSS/Institute/Home.css";
import "../Institute/RegInstitute";
import { getAppstatus } from "../../service/api";

const Home = () => {
  const [status, setStatus] = useState("");
  //made a function for calling api.js and then calling same function below
  useEffect(() => {
    const fetchStatus = async () => {
      const response = await getAppstatus();
      setStatus(response);
    };
    fetchStatus();
  }, []);

  return (
    <>
      <NavBar3 />
      <div className="body">
        <h1>Welcome to CDAC Trainee Tracker👩🏽‍💻</h1>
        <h3>
          Thankyou for registering with us.🤝🏽Your application is successfully
          submitted and it's current status can be viewed here.
        </h3>
        <div className="container">
          <h3>Application Status</h3>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
};
export default Home;
