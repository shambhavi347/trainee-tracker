import React, { useState } from "react";
import "../../CSS/Trainee/TraineeGroup.css";

const TraineeGroup = () => {
  const [mentor, setMentor] = useState({ name: "Sunil Kumar" });
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

  return (
    <>
      <div className="DivUp1">
        <h3 className="coord-title">Coordinator Name</h3>
        {/* <hr /> */}
        <hr style={{marginLeft: "26.2%", marginRight: "2%"}} />
        <div className="mentor"> {mentor.name}</div>
        {/* <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} /> */}
        <div className="trainee">
            <h3 className="trainee-title">Trainee</h3>
            <h3 className="strength-title">{trainee.length} trainees </h3>
            <hr style={{marginLeft: "26.2%", marginRight: "2%"}} />
            {trainee.map((val, key) => (
                <div className="people"> {val.name} <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} /> </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TraineeGroup;
