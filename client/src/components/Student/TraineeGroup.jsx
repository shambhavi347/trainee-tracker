import React, { useState, useEffect } from "react";
import "../../CSS/Trainee/TraineeGroup.css";
// import { StudentData } from "../../service/api";
import { getTraineeData, getCoordinatorData } from "../../service/api";
const TraineeGroup = () => {
  // const [mentor, setMentor] = useState({ name: "Sunil Kumar" });
  {
    /* const [Tra, setTra] = useState([]);
   const [trainee, setTrainee] = useState([
    {
      name: "Aakriti Saxena",
    },
    {
      name: "Ritu Yadav",
    },
    {
      name: "Sanjay Yadav",
    },
    {
      name: "Muskan Gupta",
    },
    {
      name: "Shambhavi Shanker",
    },
    {
      name: "Tannu mullic",
    },
    {
      name: "Apporva jain",
    },
    {
      name: "Ankita Mahajan",
    },
    {
      name: "Prachee Singh",
    },
   ]);*/
  }

  // call user Profile
  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     const response = await StudentData();
  //     setTra(response);
  //   };
  //   fetchPeople();
  // }, [Tra]);
  const [mentor, setMentor] = useState([]);
  useEffect(() => {
    const M_data = async () => {
      const response = await getCoordinatorData();
      console.log(response);
      setMentor(response);
    };
    M_data();
    console.log(mentor);
  }, [mentor]);
  const [trainee, setTrainee] = useState([]);
  useEffect(() => {
    const T_data = async () => {
      const response = await getTraineeData();
      console.log(response);
      setTrainee(response);
    };
    T_data();
  }, [trainee]);

  return (
    <>
      <div className="DivUp2">
        <div className="scroll">
          <h3 className="coord-title">Coordinator Name</h3>
          <hr style={{ marginLeft: "26.2%", marginRight: "25.6%" }} />
          <div className="mentor">
            {mentor.salutation} {mentor.name}
          </div>
          <div className="trainee">
            <h3 className="trainee-title">Trainee</h3>
            <h3 className="strength-title">{trainee.length} </h3>
            <hr style={{ marginLeft: "25.2%", marginRight: "24.6%" }} />
            {trainee.map((val, key) => (
              <div className="people">
                {" "}
                {val.prefix} {val.first_name}{" "}
                {val.middle_name ? val.middle_name : null}
                {val.last_name}
                <hr
                  style={{
                    backgroundColor: "#393e46",
                    opacity: "0.2",
                    marginRight: "32.7%",
                  }}
                />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TraineeGroup;
