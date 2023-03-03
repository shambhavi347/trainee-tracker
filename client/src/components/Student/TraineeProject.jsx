import React, { useState, useEffect } from "react";
import "../../CSS/Trainee/TraineeProject.css";

const TraineeProject = () => {

  const [Projet, setProjet] = useState([
    {
      name: "Training Management System",
    },
    {
      name: "Plagiarism Checker",
    },
    {
      name: "AI based search engine",
    },
    {
      name: "Image Caption Generator using Deep Learning",
    },
    {
      name: "Google Calendar",
    },
    {
      name: "Captcha using AI images",
    },
    {
      name: "Student Work Harvester",
    },
    {
      name: "Library Management System",
    },
    {
      name: "Canteen Management System",
    },
    {
      name: "Dashboard Analytics",
    },
  ]);

  return (
    <>
    <div className="DivUPro">
      <div className="progress">
      </div>
      <div className="project">
        <h1 className="pro"> Project Details </h1>
        {Projet.map((val, key) => (
          <div className="proName">
            {" "}
            {val.name}{" "}
            <hr
              style={{
                backgroundColor: "#393e46",
                opacity: "0.2",
              }}
            />{" "}
          </div>
        ))}
      </div>
      <div className="document">
      </div>
      </div>
    </>
  )
}

export default TraineeProject
