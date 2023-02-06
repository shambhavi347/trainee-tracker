import React, { useState } from "react";
import "../../CSS/Admin/InstituteAdmin.css";
import { arrowDown } from "../../Images/Images";

const InstituteAdmin = () => {
  const [sortdrop, setSortdrop] = useState(false);
  const [sortvalue, setSortvalue] = useState("Sort By NAAC Ratings");
  console.log(sortdrop);
  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">
          Filters
          <div className="sort-div">
            {sortvalue}
            <button
              className="down-btn"
              onClick={() => {
                sortdrop ? setSortdrop(false) : setSortdrop(true);
              }}
            >
              <img className="downarrow-img " src={arrowDown} alt="" />
            </button>
            {sortdrop ? (
              <>
                <ul
                  className="sort-menu-list"
                  onClick={() => {
                    setSortvalue("Highest to Lowest");
                    setSortdrop(false);
                  }}
                >
                  Highest to Loweset
                </ul>
                <ul
                  className="sort-menu-list"
                  onClick={() => {
                    setSortvalue("Lowest to Highest");
                    setSortdrop(false);
                  }}
                >
                  Lowset to Highest
                </ul>
                <ul
                  className="sort-menu-list"
                  onClick={() => {
                    setSortvalue("Sort by NAAC Ratings");
                    setSortdrop(false);
                  }}
                >
                  None
                </ul>
              </>
            ) : null}
          </div>
          <div className="filter-div"> Filter by</div>
        </div>
        <div className="institute-panel"> List of institutes</div>
      </div>
    </>
  );
};

export default InstituteAdmin;
