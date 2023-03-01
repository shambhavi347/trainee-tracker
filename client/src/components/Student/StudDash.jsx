import React, { useState } from "react";
import NavBar4 from "../NavBar4";
import TraineeGroup from "./TraineeGroup";
import TraineeProject from "./TraineeProject";
import TraineeDiscuss from "./TraineeDiscuss";

import "../../CSS/Trainee/TraineeDash.css";

const StudDash = () => {
  const [Grp, setGrp] = useState(false);
  const [Proj, setProj] = useState(false);
  const [Diss, setDiss] = useState(true);

  return (
    <>
      <NavBar4 />
      <div className="selector-stud">
        <div className="btn-select-stud">
          <button
            className="btn-institute-stud"
            onClick={() => {
              setGrp(false);
              setDiss(true);
              setProj(false);
            }}
          >
            Discussion
          </button>
          <button
            className="btn-trainee-stud"
            onClick={() => {
              setGrp(false);
              setDiss(false);
              setProj(true);
            }}
          >
            Project Work
          </button>
          <button
            className="btn-coordinator-stud"
            onClick={() => {
              setGrp(true);
              setDiss(false);
              setProj(false);
            }}
          >
            People
          </button>
        </div>
      </div>
      {Grp ? (
        <TraineeGroup />
      ) : Proj ? (
        <TraineeProject />
      ) : Diss ? (
        <TraineeDiscuss />
      ) : (
        <p> ERROR </p>
      )}
      {/* <div>Heelo</div> */}
    </>
  );
};

export default StudDash;
