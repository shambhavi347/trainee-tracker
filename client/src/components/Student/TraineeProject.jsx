import React, { useState, useEffect } from "react";
import "../../CSS/Trainee/TraineeProject.css";
import ProgressBar from "./ProgressBar";

// ProjectSchema.js
// name: "Training Management System",
// desc: "bkjbk",
// coordinatorID: "cdfd",
// groupID: "jb",

// try {
//   const coor_id = 0;
//   // let group_memebers
//   let projects = [
//     {
//       name: "",
//       desc: "",
//       group_memebers: "",
//     },
//   ];
//   const id = rootUSer.id;
//   const classes = await Class.findOne({ traineeID: id });
//   coor_id = classes.coordinatorID;

//   const Pro = await Project.find({ coordinatorID: coor_id });
//   Pro.map((val) =>
//     {projects.push(val);
//     projects.group_memebers = await Group.findOne({ _id: val.groupID });}
//   )
//   res.send(projects)
// } catch (error) {
//   console.log(error);
// }

const TraineeProject = () => {
  const [project, setProject] = useState([]);
  const [Projet, setProjet] = useState([
    {
      name: "Training Management System",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
    {
      name: "Plagiarism Checker",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Ritu"],
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
      <div className="project-divUp">
        <ProgressBar />
        <div className="proj-list-outer">
          {/* <div className="proj-list">Project Deatils</div> */}
          <h1 className="pro"> Project Details </h1>
          <div className="form-body-pro">
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
        </div>
        <div className="proj-sub-outer">
          <div className="proj-sub">Project Submission</div>
        </div>
      </div>
      {/* <div className="DivUPro">

      <div className="progress">
        <div class="circle1">
          <h1 className="text1">SRS</h1>
          <div class="fadedbox1">
            <h1 class="title1 text1"> 10-MARCH-2023 </h1>
          </div>
        </div>

        <hr style={{ width:"17.4%", marginLeft:"27.9%", marginTop:"-6%" }} ></hr>
        
        <div class="circle2">
          <h1 className="text2">SDS</h1>
          <div class="fadedbox2">
            <h1 class="title2 text2"> 20-MARCH-2023 </h1>
          </div>
        </div>

        <hr style={{ width:"17.4%", marginLeft:"58%", marginTop:"-6%" }} ></hr>
        
        <div class="circle3">
          <h1 className="text3">Project Report</h1>
          <div class="fadedbox3">
            <h1 class="title3 text3"> 30-MARCH-2023 </h1>
          </div>
        </div>

      </div>

      <div className="project">
        <h1 className="pro"> Project Details </h1>
        <div className="form-body-pro">
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
      </div>
      <div className="document">
      </div>
      </div> */}
    </>
  );
};

export default TraineeProject;
