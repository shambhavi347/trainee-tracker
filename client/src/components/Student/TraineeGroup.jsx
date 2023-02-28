import React, { useState } from "react";
import "../../CSS/Trainee/TraineeGroup.css";
// import { getStudent } from "../../service/api";
const TraineeGroup = () => {
  const [mentor, setMentor] = useState({ name: "Sunil Kumar" });
  // const [tra, setTra] = useState([]);
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
  ]);

  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     const response = await getStudent();
  //     setTra(response);
  //   };
  //   fetchPeople();
  // }, [tra]);

  return (
    <>
      <div className="DivUp2">
        <div className="scroll">
          <h3 className="coord-title">Coordinator Name</h3>
          <hr style={{ marginLeft: "26.2%", marginRight: "25.6%" }} />
          <div className="mentor"> {mentor.name}</div>
          <div className="trainee">
            <h3 className="trainee-title">Trainee</h3>
            <h3 className="strength-title">{trainee.length} trainees </h3>
            <hr style={{ marginLeft: "25.2%", marginRight: "24.6%" }} />
            {trainee.map((val, key) => (
              <div className="people">
                {" "}
                {val.name}{" "}
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
