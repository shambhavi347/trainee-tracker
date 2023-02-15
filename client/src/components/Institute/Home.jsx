import React, {useState} from "react";
import NavBar3 from "../NavBar3";
import "../../CSS/Institute/Home.css";

const Home = () => {
  return (
    <>
      <NavBar3 />
      <div className="body">
        <h1>Welcome to CDAC Trainee Tracker👩🏽‍💻</h1>
        <h3>Thankyou for registering with us.🤝🏽Your application is successfully submitted and it's current status can be viewed here.</h3>
      </div>
      <div className="footer">
          <button type="button" className="btn" >Pending</button>
      </div>
    </>
  )
}
export default Home;
