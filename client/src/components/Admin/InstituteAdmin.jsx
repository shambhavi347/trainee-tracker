import React, { useState, useEffect } from "react";
import "../../CSS/Admin/InstituteAdmin.css";
import { arrowDown, cancel, expand } from "../../Images/Images";
// import FilterPannel, { filter } from "./FilterPannel";

const InstituteAdmin = () => {
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

  let countSort = 0;
  let original = [];
  let countSrch = 0;
  let org = [];

  const [sortdrop, setSortdrop] = useState(false);

  const [sortvalue, setSortvalue] = useState("Sort By NAAC Ratings");

  const [filterdrop, setFilterdrop] = useState({
    "Institute Type": false,
    "Internship Start Month": false,
    "Internship Duration": false,
    "NAAC Rating": false,
  });

  const [appliedfilter, setAppliedfilter] = useState([]);

  const [instInfo, setInstInfo] = useState([
    {
      name: " IIT Delhi",
      month: "September",
      duration: "3 Months",
      rating: "A++",
      rvalue: 8,
      type: "Private University",
    },
    {
      name: " IIM Delhi",
      month: "December",
      duration: "6 Months",
      rating: "A",
      rvalue: 6,
      type: "Private University",
    },
    {
      name: " IIM Delhi",
      month: "July",
      duration: "6 Months",
      rating: "A+",
      rvalue: 7,
      type: "Private University",
    },
    {
      name: " Bansathli Vidyapith",
      month: "June",
      duration: "6 Months",
      rating: "A++",
      rvalue: 8,
      type: "Private University",
    },
    {
      name: " Amity University",
      month: "May",
      duration: "3 Months",
      rating: "C",
      rvalue: 2,
      type: "Private University",
    },
    {
      name: "JNU",
      month: "July",
      duration: "3 Months",
      rating: "B+",
      rvalue: 4,
      type: "Private University",
    },
  ]);

  const [institute, setInstitute] = useState([]);

  const [text, setText] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    // let name = e.target.name;
    if (e.target.checked) {
      //so duplicate values are not added
      if (appliedfilter.includes(value) === false)
        setAppliedfilter([...appliedfilter, value]);
    } else {
      setAppliedfilter((oldValues) => {
        return oldValues.filter((appliedfilter) => appliedfilter !== value);
      });
    }
  };

  if (institute.length == 0) setInstitute(instInfo);
  useEffect(() => {
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (itype.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.type === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.type === val;
                  });
            setInstitute(newItem);
          } else if (imonth.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.month === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.month === val;
                  });
            setInstitute(newItem);
          } else if (iduration.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.duration === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.duration === val;
                  });
            setInstitute(newItem);
          } else {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.rating === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.rating === val;
                  });
            setInstitute(newItem);
          }
        })
      : setInstitute(instInfo);
  }, [appliedfilter]);

  useEffect(() => {
    let strDescending = [];
    // original = institute;
    // setInstitute(strDescending);
    // if (countSort == 1) original = institute;
    // countSort += 1;
    // console.log(original);
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...institute].sort((a, b) => b.rvalue - a.rvalue);
      setInstitute(strDescending);
      // console.log(institute);
      //console.log(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...institute].sort((a, b) => a.rvalue - b.rvalue);
      setInstitute(strDescending);
      // console.log(institute);
    } else {
      // setInstitute(original);
    }
    // setInstitute(strDescending);
  }, [sortdrop]);

  useEffect(() => {
    let filteredData1 = "";
    // if (countSrch == 1) org = institute;
    // countSrch += 1;
    // console.log("prev" + org);
    if (text.length == 0) {
      setInstitute(org);
    } else {
      filteredData1 = institute.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setInstitute(filteredData1);
    }
  }, [text]);

  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">
          <div className="search-bar">
            <input
              className="search-text"
              type="text"
              name=""
              id=""
              placeholder="Search by name..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />

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
                          type="radio"
                          name="type"
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
                          type="radio"
                          name="month"
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
                          type="radio"
                          name="duartion"
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
                          type="radio"
                          name="rating"
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
              <h4>
                {" "}
                Applied Filter
                <button
                // onClick={() =>

                // }
                >
                  {}
                  Apply
                </button>
              </h4>
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
          {institute.map((inst, key) => (
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
