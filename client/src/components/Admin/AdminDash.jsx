import React, { useState, useEffect } from "react";
import NavBar3 from "../NavBar3";
import InstituteAdmin from "./InstituteAdmin";
import TraineeAdmin from "./TraineeAdmin";
import CoordinatorAdmin from "./CoordinatorAdmin";

import "../../CSS/Admin/AdminDash.css";

import { createContext } from "react";

export const ThemeContext = createContext(null);
const AdminDash = () => {
  const [inst, setInst] = useState(true);
  const [trainee, setTrainee] = useState(false);
  const [Coord, setCoord] = useState(false);

  const [theme, setTheme] = useState("light");

  const retTheme = (btn) => {
    setTheme(btn);
    console.log(theme);
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, retTheme }}>
        <div id={theme}>
          <NavBar3 retTheme={retTheme} />
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
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default AdminDash;
