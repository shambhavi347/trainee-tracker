import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar1 from "./NavBar1";
import "../CSS/MainPage.css";
import {
  instagram,
  facebook,
  youtube,
  twitter,
  wallpaperMain,
} from "../Images/Images";

const MainPage = () => {
  const [req, setReq] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    if (req) {
      const routeChange = () => {
        let path = "/reg-institute";
        navigate(path);
      };
      routeChange();
    }
  }, [req, navigate]);

  return (
    <>
      <NavBar1 />
      <div className="divUpper">
        <div className="div-text">
          <h3>
            Join CDAC to have a hassel free and enriching internship training
            experience.
          </h3>
          <li>
            We provide a way to track and manage the onboarding process for new
            trainees.
          </li>
          <li>
            We provide features like goal setting, progress tracking, and
            evaluation.
          </li>
          <li>
            We facilitate smooth facilitate communication between trainees,
            institute coordinators, and trainers, including the ability to share
            documents, schedule meetings, and receive updates.
          </li>
          <li>
            We also provide functionalities like storage, sharing and management
            of trainee's documents like resumes , project documentation, etc
          </li>{" "}
          <br />
          <a href="https://www.cdac.in/">
            <button className="btn-learnMore">Learn More</button>
          </a>
          {/* <button className="btn-learnMore">Learn More</button> */}
        </div>
        <div className="div-img">
          <div className="inner-div">
            <img className="imgWallpaper" src={wallpaperMain} alt="" />
          </div>
          <button className="btn-regIns" onClick={() => setReq(true)}>
            Register Your Institute Now!!
          </button>
        </div>

        <div className="footer">
          <div className="footer-right">
            <ul>
              <a href="https://www.cdac.in/index.aspx?id=about">
                <li className="links">About Us</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=reach_us">
                <li className="links">Reach Us</li>
              </a>

              <li className="links">
                Contact Us
                <p className="address">
                  Centre for Development of Advanced Computing C-DAC
                  <br />
                  Innovation Park, Panchavati, Pashan, Pune - 411 008, <br />{" "}
                  Maharashtra (India) <br />
                  Phone: +91-20-25503100 <br />
                  Fax: +91-20-25503131
                </p>
              </li>
            </ul>
          </div>
          <div className="footer-left">
            <ul>
              <p className="follow">Follow Us</p>
              <a href="https://www.instagram.com/cdacnoida/?hl=en">
                <img className="mediaLogo" src={instagram} alt="" />
              </a>
              <a href="https://www.facebook.com/CDACINDIA/">
                <img className="mediaLogo" src={facebook} alt="" />
              </a>

              <a href="https://twitter.com/cdacindia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                <img className="mediaLogo" src={twitter} alt="" />
              </a>

              <a href="https://www.youtube.com/@CDACOfficial">
                <img className="mediaLogo" src={youtube} alt="" />
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
