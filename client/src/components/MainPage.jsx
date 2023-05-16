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
        <div className="div-text-upper">
          <div className="div-text">
            <h3>
              Join CDAC to have a hassel free and enriching internship training
              experience.
            </h3>
            <li>
              We manage and track the onboarding process of new trainees.
            </li>
            <li>
              We provide Project management features like set your goals, track your key 
              performance indicators and performance evaluation.
            </li>
            <li>
              We facilitate smooth communication between fellow trainee's
              and mentors, with ability to share documents and meeting invitations.
            </li>
            <li>
              We also provide functionalities like storage, sharing and
              management of trainee's documents like resumes, project
              documentation, etc.
            </li>{" "}
            <br />
            <a href="https://www.cdac.in/">
              <button className="btn-learnMore">Learn More</button>
            </a>
            {/* <button className="btn-learnMore">Learn More</button> */}
          </div>
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
          <div className="footer-left">
            {/* <div className="center">Centers</div> */}
            <ul>
              <li className="center">Centers</li>

              <a href="https://www.cdac.in/index.aspx?id=BL">
                <li className="centers">Bengaluru</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=CH">
                <li className="centers">Chennai</li>
              </a>

              <a href="https://www.cdac.in/index.aspx?id=DL">
                <li className="centers">Delhi</li>
              </a>

              <a href="https://www.cdac.in/index.aspx?id=HY">
                <li className="centers">Hyderabad</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=KL">
                <li className="centers">Kolkata</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=ML">
                <li className="centers">Mohali</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=MB">
                {" "}
                <li className="centers">Mumbai</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=ND">
                <li className="centers">Nodia</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=PT">
                <li className="centers">Patna</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=PN">
                <li className="centers">Pune</li>
              </a>

              <a href="https://www.cdac.in/index.aspx?id=SL">
                <li className="centers">Silcher</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=TVM">
                <li className="centers">Thiruvananthpuram</li>
              </a>
            </ul>
          </div>
          <div className="footer-right">
            <div className="footer-media">
              {" "}
              <div className="media-left">Follow Us</div>
              <div className="media-right">
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
              </div>{" "}
            </div>
            <ul>
              <a href="https://www.cdac.in/index.aspx?id=about">
                <li className="links link">About Us</li>
              </a>
              <a href="https://www.cdac.in/index.aspx?id=reach_us">
                <li className="links link">Reach Us</li>
              </a>

              <li className="links">Contact Us</li>
              <p className="address">
                Centre for Development of Advanced Computing C-DAC
                <br />
                Innovation Park, Panchavati, Pashan, Pune - 411 008, <br />{" "}
                Maharashtra (India) <br />
                Phone: +91-20-25503100 <br />
                Fax: +91-20-25503131
              </p>
            </ul>
          </div>
          {/*<div className="footer-media"> <div className="media-left">Follow:</div>
            <div className="media-right">
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
            </div> </div>*/}

          {/* <div className="footer-right">
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MainPage;
