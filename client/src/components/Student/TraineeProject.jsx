import React, { useState, useEffect } from "react";
import "../../CSS/Trainee/TraineeProject.css";
import ProgressBar from "./ProgressBar";
import { expand, cancel } from "../../Images/Images";

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
  const [expnd, setExpnd] = useState(false);
  const [projetList, setprojetList] = useState([]); //trainee
  const [projet, setprojet] = useState([
    //studList
    {
      name: "Training Management System",
      desc: "The objective and scope of my Project Trainee Management System are to record the details various activities of the user. It will simplify the task and reduce the paperwork. During implementation, every user will be given appropriate training to suit their specific needs. Specific support will also be provided at key points within the academic calendar. Training will be provided on a timely basis, and you will be trained as the new is Trainee Management System rolled out to your area of responsibility. At the moment we are in the very early stages, so it is difficult to put a specific time on the training, but we will keep people informed as plans are developed. The system is very user-friendly and it is anticipated that functions of the system will be easily accessed by administrators, academics. Hence the management system for the College management has been designed to remove all the deficiency from which the present system is suffering and to ensure.",
      group_members: ["Shambhavi Shanker", "Aakriti Saxena", "Ritu Yadav", "Divya Jain", "Shambhavi Shanker", "Aakriti Saxena", "Ritu Yadav", "Divya Jain"],
    },
    {
      name: "Plagiarism Checker",
      desc: "Plagiarism checkers are software that can be used to cross-check text for duplicated content (this may include quoted material, paraphrased material, similarities in wording, etc.). These tools help to ensure that writing is original and correctly cited.",
      group_members: ["Isha", "Apporva Tyagi", "Aditi Bansal"],
    },
    {
      name: "AI based search engine",
      desc: "bkjbk",
      group_members: ["Chelsi", "Vrinda"],
    },
    {
      name: "Image Caption Generator using Deep Learning",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
    {
      name: "Google Calendar",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
    {
      name: "Captcha using AI images",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
    {
      name: "Student Work Harvester",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
    {
      name: "Library Management System",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
    {
      name: "Canteen Management System",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
    {
      name: "Dashboard Analytics",
      desc: "bkjbk",
      group_members: ["Shambhavi", "Aakriti"],
    },
  ]);
  const handleExpand = (val) => {
    setExpnd(true);
    setprojetList(val);
  };

  return (
    <>
      <div className="project-divUp">
        <ProgressBar />

        <div className="proj-list-outer">
          {/* <div className="proj-list">Project Deatils</div> */}
          <h1 className="pro"> Project Details </h1>
          <div className="form-body-pro">
            {projet ? (
              <>
                {projet.map((val) => (
                  <div className="proName">
                    <div className="down-button" id="arrowDown-button">
                      <img
                        src={expand}
                        alt=""
                        className="downarrow-imagee"
                        onClick={() => handleExpand(val)}
                      />
                    </div>
                    {val.name}
                    <hr
                      style={{
                        backgroundColor: "#393e46",
                        opacity: "0.2",
                      }}
                    />
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
        {expnd ? (
          <div className="expanded-div1">
            <button onClick={() => setExpnd(false)} className="expnd-remove">
              <img className="expnd-imagee" src={cancel} alt="" />
            </button>
            <div className="info-box">
              <div className="information">
                <div className="info1">
                  {projetList.name}
                </div>
                <div className="info2">
                  <p style={{marginTop:"0%", fontWeight:"bolder", fontSize:"x-large"}}>Description:</p>
                  <div className="info-desc">
                    {projetList.desc}
                  </div>
                </div>

                <div className="info3">
                  <div className="info-group">
                  <p style={{marginTop:"0%", fontWeight:"bolder", fontSize:"x-large"}}>Group Members:</p>
                    {/* Group Members  */}
                    {projetList.group_members.map((val) => (
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
        {projet.map((val, key) => (
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
