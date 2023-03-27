import React, { useState, useEffect } from "react";
import NavBarInst from "../NavBarInst";
import "../../CSS/Institute/Home.css";
import "../Institute/RegInstitute";
import { getAppstatus, getSelectedStudents } from "../../service/api";
import { expand, cancel, check, remove } from "../../Images/Images";
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

  const [stud, setStud] = useState([]);
  useEffect(() => {
    const getStudent = async () => {
      const response = await getSelectedStudents();
      console.log(response);
      setStud(response);
    };
    getStudent();
  }, [stud]);

  const [expnd, setExpnd] = useState("none");

  return (
    <>
      <NavBarInst />
      <div className="body-inst-home">
        <div className="head-inst-home">
          <h1>Welcome to CDAC Trainee Tracker👩🏽‍💻</h1>
        </div>
        <div className="content-inst-home">
          <h3>
            Thankyou for registering with us.🤝🏽Your application is
            successfully submitted and it's current status can be viewed here.
          </h3>
        </div>

        {/* <div className="container-inst-home"> */}
        {/* <button className="btn-inst-home">Application Status</button> */}

        <div className="modal-bdy-inst-home">
          <div className="modal-expnd-inst-home">
            <button
              className="btn-expnd-inst-home"
              onClick={() => {
                setExpnd("block");
              }}
            >
              <img src={expand} alt="" className="img-expnd-inst-home" />
            </button>
          </div>
          <div className="info-home">
            {/* <img src={expand} alt="" className="img-expnd" /> */}
            <button className="btn-inst-home">Application Status</button>
          </div>
          <div className="expanded-div-inst-home" style={{ display: expnd }}>
            <button
              onClick={() => setExpnd("none")}
              className="expnd-cancel-inst-home"
            >
              <img className="expnd-img-inst-home" src={cancel} alt="" />
            </button>
            <div className="info-outer-inst-home">
              {/* <div className="info"> */}
              <div>
                <button className="trans-btn">{status}</button>
              </div>
              <div>
                {status === "accept" ? (
                  <div className="message-inst-home">
                    Congratulations for grabbing this wonderful opportunity.
                    Kindly register all the selected students on our portal.
                    Registration Link:
                    <a href="http://localhost:3000/reg-stud">
                      http://localhost:3000/reg-stud
                    </a>
                  </div>
                ) : status === "reject" ? (
                  <div className="message-inst-home">
                    We are sorry to inform you that your Institute could not fit
                    our criteria of selection. Better luck next time!
                  </div>
                ) : null}
                {/* </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* <button className="trans-btn">{status}</button> */}
        </div>

        <div className="info-inst-home">
          <h3 className="content">List of selected Students</h3>

          {stud.map((val) => (
            <div className="data-inst-home">
              {val.first_name} {val.last_name}
              <button className="Accept-btn">
                <img
                  src="../Images/check.png"
                  alt="accept"
                  width="20"
                  heigth="2"
                />
              </button>
              <button className="Reject-btn">
                <img
                  src="../Images/remove.png"
                  alt="reject"
                  width="20"
                  heigth="2"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
