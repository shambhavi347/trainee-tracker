import React, { useState } from "react";
import "../../CSS/Admin/InstituteAdmin.css";
import { arrowDown, cancel, expand } from "../../Images/Images";
// import FilterPannel, { filter } from "./FilterPannel";

const InstituteAdmin = () => {
  const [sortdrop, setSortdrop] = useState(false);

  const [sortvalue, setSortvalue] = useState("Sort By NAAC Ratings");

  const [filterdrop, setFilterdrop] = useState({
    "Institute Type": false,
    "Internship Start Month": false,
    "Internship Duration": false,
    "NAAC Rating": false,
  });
  // const [filterhead, setFilterhead] = useState([
  //   "Institute Type",
  //   "Internship Start Month",
  //   "Internship Duration",
  //   "NAAC Rating",
  // ]);

  const itype = [
    "Community Colleges",
    "Vocational Schools",
    "Public Universities",
    "Private Universities",
    "Semi-Private universities",
  ];

  const imonth = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const iduration = ["3 Months", "6 Months"];

  const naac = ["A++", "A+", "A", "B++", "B+", "B", "C", "D"];

  const [appliedfilter, setAppliedfilter] = useState([]);

  const [instInfo, setInstInfo] = useState([
    {
      name: "Banasthali Vidyapith",
      month: "May",
      duration: "6 Months",
      rating: "A++",
    },
    {
      name: "Banasthali Vidyapith",
      month: "June",
      duration: "3 Months",
      rating: "A++",
    },
    {
      name: "Banasthali Vidyapith",
      month: "May",
      duration: "6 Months",
      rating: "A++",
    },
    ,
    {
      name: "Banasthali Vidyapith",
      month: "May",
      duration: "6 Months",
      rating: "A++",
    },
    ,
    {
      name: "Banasthali Vidyapith 3",
      month: "May",
      duration: "3 Months",
      rating: "C",
    },
    ,
    {
      name: "Banasthali Vidyapith",
      month: "January",
      duration: "6 Months",
      rating: "A++",
    },
  ]);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (e.target.checked) {
      //so duplicate values are not added
      if (appliedfilter.includes(value) === false)
        setAppliedfilter([...appliedfilter, name]);
    } else {
      setAppliedfilter((oldValues) => {
        return oldValues.filter((appliedfilter) => appliedfilter !== value);
      });
    }
  };

  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">
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
          <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />
          <div className="filter-div">
            <div className="filter-name">
              Institute Type
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Institute Type"]
                    ? setFilterdrop({ "Institute Type": false })
                    : setFilterdrop({ "Institute Type": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Institute Type"] ? (
                <>
                  {itype.map((val, key) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="checkbox"
                          name={val}
                          id=""
                          value={val}
                          // checked={() => setChecked(!checked)}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
            <div className="filter-name">
              Insternship Start Month
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Insternship Start Month"]
                    ? setFilterdrop({ "Insternship Start Month": false })
                    : setFilterdrop({ "Insternship Start Month": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Insternship Start Month"] ? (
                <>
                  {imonth.map((val, key) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="checkbox"
                          name={val}
                          id=""
                          value={val}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
            <div className="filter-name">
              Insternship Duration
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Insternship Duration"]
                    ? setFilterdrop({ "Insternship Duration": false })
                    : setFilterdrop({ "Insternship Duration": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Insternship Duration"] ? (
                <>
                  {iduration.map((val) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="checkbox"
                          name={val}
                          id=""
                          value={val}
                          // checked={() => setChecked(!checked)}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
            <div className="filter-name">
              Institute Rating
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Institute Rating"]
                    ? setFilterdrop({ "Institute Rating": false })
                    : setFilterdrop({ "Institute Rating": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Institute Rating"] ? (
                <>
                  {naac.map((val, key) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="checkbox"
                          name={val}
                          id=""
                          value={val}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
          </div>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />

          {Object.keys(appliedfilter).length === 0 ? null : (
            <>
              <h4> Applied Filter</h4>
              <div className="applied-filter">
                {appliedfilter.map((key) => (
                  <>
                    <div className="filter">
                      <div className="cancel-text">{key}</div>
                      <button
                        className="cancel-btn"
                        onClick={() => {
                          setAppliedfilter((oldValues) => {
                            return oldValues.filter(
                              (appliedfilter) => appliedfilter !== key
                            );
                          });
                        }}
                      >
                        <img className="cancel-img" src={cancel} alt="" />
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="institute-panel">
          {instInfo.map((inst, key) => (
            <div className="inst-bdy">
              <div className="inst-expnd">
                <button className="btn-expnd">
                  <img src={expand} alt="" className="img-expnd" />
                </button>
              </div>
              <div className="inst-first">{inst.name}</div>
              <div className="inst-second">
                <div className="inst-month">{inst.month}</div>
                <div className="inst-rating">{inst.rating}</div>
                <div className="inst-duration">{inst.duration}</div>
              </div>
              <div className="inst-third">
                <div className="inst-accpt">
                  <button className="btn-accpt">Accept</button>
                </div>
                <div className="inst-reject">
                  <button className="btn-reject">Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InstituteAdmin;
