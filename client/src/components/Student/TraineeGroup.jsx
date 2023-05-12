import React, { useState, useEffect } from "react";
import "../../CSS/Trainee/TraineeGroup.css";
// import { StudentData } from "../../service/api";
import { getTraineeData, getCoordinatorData } from "../../service/api";
import { expand, cancel } from "../../Images/Images";
const TraineeGroup = () => {
  var date, dob1;
  const [traineeEx, setTraineeEx] = useState(false);
  const [traineeVal, setTraineeVal] = useState([]);
  const [trainee, setTrainee] = useState([]);
  const [mentor, setMentor] = useState([]);
  useEffect(() => {
    const M_data = async () => {
      const response = await getCoordinatorData();
      setMentor(response);
    };
    M_data();
  }, [mentor]);
  // console.log(mentor);

  useEffect(() => {
    const T_data = async () => {
      const data = await getTraineeData();
      setTrainee(data);
    };
    T_data();
  }, [trainee]);
  // console.log(trainee);

  const handleExpandTrainee = (val) => {
    setTraineeEx(true);
    setTraineeVal(val);
  };
  if (traineeVal) {
    date = new Date(traineeVal.dob);
    dob1 = date.toLocaleDateString("en-US");
  }
  return (
    <>
      <div className="body-trainee-people">
        <div className="coordDeetsTrainee">
          <h2 className="coordTitle">Coordinator Name</h2>
          <hr className="lineCoordName" />
          <div className="CoordDetails">
            {mentor.first_name ? (
              <div>
              <div className="coordNameTrainee">
              {mentor.salutation} {mentor.first_name} {mentor.middle_name}
              {mentor.last_name}
            </div>
            <div className="coordInfo">
              <div className="coordEmailTrainee">Email : {mentor.email}</div>
              <div className="coordPhoneTrainee">Phone No: {mentor.phone}</div>
            </div>
            </div>
            ) : (
              <div className="coord-not-assigned">Coordinator Not Assigned Yet !!</div>
            )}
            {/* <div className="coordNameTrainee">
              {mentor.salutation} {mentor.first_name} {mentor.middle_name}
              {mentor.last_name}
            </div>
            <div className="coordInfo">
              <div className="coordEmailTrainee">Email : {mentor.email}</div>
              <div className="coordPhoneTrainee">Phone No: {mentor.phone}</div>
            </div> */}
          </div>
        </div>
        <div className="TraineeDiv">
          <div>
            <h2 className="traineeTitle">Trainee</h2>
            <h2 className="traineeStrength">{trainee.length} </h2>
          </div>

          <hr className="lineCoordName" />
          {trainee.map((val, key) => (
            <>
              <div className="peopleInd">
                {" "}
                {val.prefix} {val.first_name}{" "}
                {val.middle_name ? val.middle_name : null}
                {val.last_name ? val.last_name : null}
                <div className="expnd-img-trainee">
                  <img
                    src={expand}
                    alt=""
                    className="downarrow-img"
                    onClick={() => handleExpandTrainee(val)}
                  />
                </div>{" "}
              </div>
            </>
          ))}
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
      {/* <div className="DivUp2">
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
      </div> */}
    </>
  );
};

export default TraineeGroup;
