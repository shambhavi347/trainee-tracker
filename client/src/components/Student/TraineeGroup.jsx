import React, { useState } from "react";

const TraineeGroup = () => {
    const [mentor, setMentor] = useState({name: "Sunil Kumar"});
    const [trainee, setTrainee] = useState([
        {
            name: "Aakriti Saxena"
        },
        {
            name: "Ritu Yadav"
        },
        {
            name: "Muskan Gupta"
        }
    ]);

  return (
    <>
        <div className="container-fluid">
            <div className="container">
                <h1 className="box-title">Co-ordinator </h1>
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
            </div>
        </div>
    </>
  )
}

export default TraineeGroup
