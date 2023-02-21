import React, { useState } from "react";
import NavBar3 from "../NavBar3";
import TraineeGroup from "./TraineeGroup";
import TraineeProject from "./TraineeProject";
import TraineeDiscuss from "./TraineeDiscuss";

import "../../CSS/Admin/AdminDash.css";

const StudDash = () => {
  const [Grp, setGrp] = useState(false);
  const [Proj, setProj] = useState(false);
  const [Diss, setDiss] = useState(true);

  return (
    <>
      <NavBar3 />
      <div className="selector">
        <div className="btn-select">
          <button
            className="btn-institute"
            onClick={() => {
              setGrp(false);
              setDiss(true);
              setProj(false);
            }}
          >
            Discussion
          </button>
          <button
            className="btn-trainee"
            onClick={() => {
              setGrp(false);
              setDiss(false);
              setProj(true);
            }}
          >
            Project Work
          </button>
          <button
            className="btn-coordinator"
            onClick={() => {
              setGrp(true);
              setDiss(false);
              setProj(false);
            }}
          >
            People
          </button>
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
      </div>
      {/* <div>Heelo</div> */}
    </>
  );
};

export default StudDash;
