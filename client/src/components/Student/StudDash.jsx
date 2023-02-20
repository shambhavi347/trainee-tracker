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

//   const callHome = async () => {
//     try {
//       const res = await fetch("/admin-dashboard", {
//         method: "GET",
//         headers: {
//           "Content-Type": "appllication/json",
//           Accept: "application/json",
//         },
//         Credential: "include ",
//       });
//       const data = await res.json();
//       setUserdata(data);
//       if (!res.status === 200) {
//         const error = new Error(res.error);
//         throw error;
//       }
//     } catch (err) {
//       console.log(err);
//       navigate("/");
//     }
//   };

//   useEffect(() => {
//     callHome();
//   }, []);

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
    </>
  );
};

export default StudDash;
