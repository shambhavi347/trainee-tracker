import React, { useState } from "react";
import NavBar3 from "../NavBar3";
import CoordPeople from "../Coordinator/CoordPeople";
import CoordProject from "../Coordinator/CoordProject";
import CoordDiscussion from "../Coordinator/CoordDiscussion";
import "../../CSS/Coordinator/CoordinatorDash.css";

const CoordinatorDash = () => {
  const [Ppl, setPpl] = useState(false);
  const [Proj, setProj] = useState(false);
  const [Diss, setDiss] = useState(true);

  return (
    <>
      <NavBar3 />
      <div className="selector-coord-home">
        <div className="btn-select-coord-home">
          <button
            className="btn-coord-home"
            onClick={() => {
              setPpl(false);
              setDiss(true);
              setProj(false);
            }}
          >
            Discussion
          </button>
          <button
            className="btn-coord-home2"
            onClick={() => {
              setPpl(false);
              setDiss(false);
              setProj(true);
            }}
          >
            Project Work
          </button>
          <button
            className="btn-coord-home3"
            onClick={() => {
              setPpl(true);
              setDiss(false);
              setProj(false);
            }}
          >
            People
          </button>
        </div>
        {Ppl ? (
          <CoordPeople />
        ) : Proj ? (
          <CoordProject />
        ) : Diss ? (
          <CoordDiscussion />
        ) : (
          <p> ERROR </p>
        )}
      </div>
      {/* <div>Heelo</div> */}
    </>
  );
};

export default CoordinatorDash;
