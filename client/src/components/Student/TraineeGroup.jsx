import React, { useState, useEffect } from "react";
import "../../CSS/Trainee/TraineeGroup.css";
// import { StudentData } from "../../service/api";
import { getTraineeData, getCoordinatorData } from "../../service/api";
import { expand, cancel } from "../../Images/Images";
const TraineeGroup = () => {
  var date, dob1;
  const [traineeEx, setTraineeEx] = useState(false);
  const [traineeVal, setTraineeVal] = useState([]);

  const [mentor, setMentor] = useState([]);
  useEffect(() => {
    const M_data = async () => {
      const response = await getCoordinatorData();
      console.log(response);
      setMentor(response);
    };
    M_data();
    // console.log(mentor);
  }, [mentor]);
  const [trainee, setTrainee] = useState([]);
  useEffect(() => {
    const T_data = async () => {
      const response = await getTraineeData();
      // console.log(response);
      setTrainee(response);
    };
    T_data();
  }, [trainee]);

  const handleExpandTrainee = (val) => {
    setTraineeEx(true);
    setTraineeVal(val);

    // console.log(val);
  };
  if (traineeVal) {
    date = new Date(traineeVal.dob);
    dob1 = date.toLocaleDateString("en-US");
  }
  return (
    <>
      <div className="DivUp2">
        <div className="scroll">
          <h3 className="coord-title">Coordinator Name</h3>
          <hr style={{ marginLeft: "26.2%", marginRight: "25.6%" }} />
          <div className="mentor">
            {mentor.salutation} {mentor.first_name} {mentor.middle_name}
            {mentor.last_name}
            <div className="mentor-info">
              <div className="mentor-email">Email : {mentor.email}</div>
              <div className="mentor-phone">Phone No: {mentor.phone}</div>
            </div>
          </div>
          <div className="trainee">
            <h3 className="trainee-title">Trainee</h3>
            <h3 className="strength-title">{trainee.length} </h3>
            <hr style={{ marginLeft: "25.2%", marginRight: "24.6%" }} />
            {trainee.map((val, key) => (
              <>
                <div className="people">
                  {" "}
                  {val.prefix} {val.first_name}{" "}
                  {val.middle_name ? val.middle_name : null}
                  {val.last_name ? val.last_name : null}
                  <div className="expnd-img-trainee">
                    <img
                      src={expand}
                      alt=""
                      className="downarrow-img "
                      onClick={() => handleExpandTrainee(val)}
                    />
                  </div>{" "}
                </div>
                {/* <hr
                  style={{
                    backgroundColor: "#393e46",
                    opacity: "0.2",
                    marginRight: "32.7%",
                  }}
                /> */}
              </>
            ))}
          </div>
        </div>
        {traineeEx ? (
          <div className="expanded-div">
            <button
              onClick={() => setTraineeEx(false)}
              className="expnd-cancel"
            >
              <img className="expnd-img" src={cancel} alt="" />
            </button>
            <div className="info-outer">
              <div className="info">
                <div className="info-first">
                  {traineeVal.prefix} {traineeVal.first_name}{" "}
                  {traineeVal.middle_name} {traineeVal.last_name}
                </div>
                <div className="info-second">
                  <div className="info-type">Gender: {traineeVal.gender}</div>
                  <div className="info-rating"> DOB: {dob1}</div>
                </div>
                <div className="info-third">
                  <div className="info-instname">
                    Institue Name: {traineeVal.instname}{" "}
                  </div>
                  <div className="info-email">Course: {traineeVal.course}</div>
                  <div className="info-email">Stream: {traineeVal.stream}</div>
                  <div className="info-email">
                    Semester: {traineeVal.semester}
                  </div>
                  <div className="info-email">CGPA: {traineeVal.cgpa}</div>
                </div>
                <div className="info-fourth">
                  <div className="info-email">Email: {traineeVal.email}</div>
                  <div className="info-phone">
                    Phone No : {traineeVal.phone_no}
                  </div>
                </div>
                <div className="info-fifth">
                  <div className="info-month">
                    Familiar Technologies <br />
                    <br />
                    {traineeVal.famtech.map((val) => (
                      <>
                        {val}
                        <hr
                          style={{ backgroundColor: "#393e46", opacity: "0.2" }}
                        />
                      </>
                    ))}
                  </div>
                  <div className="info-duration">
                    Interseted Technologies
                    <br />
                    <br />
                    {traineeVal.inttech.map((val) => (
                      <>
                        {val}
                        <hr
                          style={{ backgroundColor: "#393e46", opacity: "0.2" }}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TraineeGroup;
