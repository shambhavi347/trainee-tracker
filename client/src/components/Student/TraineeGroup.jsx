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
      name: "Muskan Gupta",
    },
  ]);

  return (
    <>
      <div className="DivUp1">
        <div className="main1">Coordinator Name</div>
        <hr />
        <div className="Head1">
          <h3 className="trainee-title">Trainee</h3>
          {trainee.map((val, key) => (
            <div className="people"> {val.name}</div>
          ))}
          {/* {map > div} */}
        </div>
      </div>
      {/* <div className="DivUp1">
        <div className="container">
          <h1 className="box-title">Co-ordinator </h1> */}
      {/* {mentor.map(teacher => {
                    if(teacher){
                        return <div className="box">
                                <b>{teacher.name}</b>
                                </div>
                    }else return null;
                })}
                <h1 className="box-title">Trainee </h1>
                {trainee.map(student => {
                    if(student){
                        return <div className="box">
                            <b>{student.name}</b>
                            </div>
                    }else return null;
                })} */}
      {/* </div>
      </div> */}
    </>
  );
};

export default TraineeGroup;
