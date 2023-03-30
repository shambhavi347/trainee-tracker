import React, { useState, useEffect } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/NavBar3.css";
import "../Coordinator/CoordProject";
import { getProdesc, getProtitle } from "../../service/api";
import "../../CSS/Coordinator/ProjectDetails.css";

const ProjectDetails = () => {
  const [titles, setTitles] = useState("");
  useEffect(() => {
    const fetchTitles = async () => {
      const response = await getProtitle();
      setTitles(response);
    };
    fetchTitles();
  }, []);

  const [desc, setDesc] = useState("");
  useEffect(() => {
    const fetchDesc = async () => {
      const response = await getProdesc();
      setDesc(response);
    };
    fetchDesc();
  }, []);

  return (
    <>
      <NavBar2 />
      <div className="main-pro-del">
        <div className="head-pro-del">
          {/* {titles.map((val) => ( */}
          <h3>{titles}</h3>
          {/* ))} */}
        </div>
        <div className="desc-pro-del">
          <>
            <div className="div1">
              <h3>Description</h3>
              <div className="content">
                <p>{desc}hii</p>
                <button className="editme">Edit</button>
              </div>
            </div>

            <div className="div2">
              <h3>Group Details</h3>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
