import React, { useState } from "react";
import NavBarCoord from "../NavBarCoord";
import CoordPeople from "../Coordinator/CoordPeople";
import CoordProject from "../Coordinator/CoordProject";
import CoordDiscussion from "../Coordinator/CoordDiscussion";
import "../../CSS/Coordinator/CoordinatorDash.css";

import { createContext } from "react";

export const ThemeContext = createContext(null);

const CoordinatorDash = () => {
  const [Ppl, setPpl] = useState(false);
  const [Proj, setProj] = useState(false);
  const [Diss, setDiss] = useState(true);
  const [theme, setTheme] = useState("light");

  const retTheme = (btn) => {
    setTheme(btn);
    console.log(theme);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, retTheme }}>
        <div id={theme}>
          <NavBarCoord retTheme={retTheme} />
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
      </ThemeContext.Provider>
    </>
  );
};

export default CoordinatorDash;
