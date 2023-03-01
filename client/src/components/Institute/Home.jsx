import React, { useState, useEffect } from "react";
import NavBar3 from "../NavBar3";
import "../../CSS/Institute/Home.css";
import "../Institute/RegInstitute";
import { getAppstatus, getSelectedStudents } from "../../service/api";

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

  return (
    <>
      <NavBar3 />
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

        <div className="container-inst-home">
          <button className="btn-inst-home">Application Status</button>
          <button className="trans-btn">{status}</button>
        </div>
        <div>
          {status === "accept" ? (
            <div className="message-inst-home">
              Congratulations for grabbing this wonderful opportunity. Kindly
              forward this mail to all the selected students for further
              registration on our portal. Registration Link:
              <a href="http://localhost:3000/reg-stud">
                http://localhost:3000/reg-stud
              </a>
            </div>
          ) : status === "reject" ? (
            <div className="message-inst-home">
              We are sorry to inform you that your Institute could not fit our
              criteria of selection. Better luck next time!
            </div>
          ) : null}
        </div>
        <div className="info-inst-home">
          <h3 className="content">List of selected Students</h3>

          {stud.map((val) => (
            <div className="data-inst-home">
              {val.first_name} {val.last_name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
