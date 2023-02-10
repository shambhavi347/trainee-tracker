import React, { useState } from "react";
import NavBar3 from "../NavBar3";
import InstituteAdmin from "./InstituteAdmin";
import TraineeAdmin from "./TraineeAdmin";
import CoordinatorAdmin from "./CoordinatorAdmin";

import "../../CSS/Admin/AdminDash.css";
const AdminDash = () => {
  const [inst, setInst] = useState(true);
  const [trainee, setTrainee] = useState(false);
  const [Coord, setCoord] = useState(false);

  return (
    <>
      <NavBar3 />
      <div className="selector">
        <div className="btn-select">
          <button
            className="btn-institute"
            onClick={() => {
              setInst(true);
              setCoord(false);
              setTrainee(false);
            }}
          >
            Institute
          </button>
          <button
            className="btn-trainee"
            onClick={() => {
              setInst(false);
              setCoord(false);
              setTrainee(true);
            }}
          >
            Trainee
          </button>
          <button
            className="btn-coordinator"
            onClick={() => {
              setInst(false);
              setCoord(true);
              setTrainee(false);
            }}
          >
            Coordinator
          </button>
        </div>
        {inst ? (
          <InstituteAdmin />
        ) : Coord ? (
          <CoordinatorAdmin />
        ) : trainee ? (
          <TraineeAdmin />
        ) : (
          <p> ERROR </p>
        )}
      </div>
    </>
  );
};

export default AdminDash;