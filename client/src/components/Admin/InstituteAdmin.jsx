import React, { useState, useEffect } from "react";
import "../../CSS/Admin/InstituteAdmin.css";
import { arrowDown, arrowLeft, cancel } from "../../Images/Images";
import { getInstitutes, getInstAccept, getInstReject } from "../../service/api";
import PendingInst from "./PendingInst";

const InstituteAdmin = () => {
  const itype = [
    "Central University",
    "State University",
    "Private Institution",
    "Deemed University",
    "Autonomous College",
    "Affiliated College",
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

  const [sortdrop, setSortdrop] = useState(false);

  const [sortvalue, setSortvalue] = useState("Sort By NAAC Ratings");

  const [filterdrop, setFilterdrop] = useState({
    "Institute Type": false,
    "Internship Start Month": false,
    "Internship Duration": false,
    "NAAC Rating": false,
  });

  const [appliedfilter, setAppliedfilter] = useState([]);

  const [insti, setInsti] = useState([]);

  const [institute, setInstitute] = useState([]);

  const [text, setText] = useState("");
  const [acceptList, setAcceptList] = useState([]);
  const [accepts, setAccepts] = useState([]);
  const [rejectList, setRejectList] = useState([]);
  const [rejects, setRejects] = useState([]);
  const [disAccept, setDisAccept] = useState(false);
  const [disPending, setDisPending] = useState(true);
  const [disReject, setDisReject] = useState(false);

  const [accBtn, setAccBtn] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstitutes();
      setInsti(data);
      console.log(insti);
      if (institute.length === 0 || accBtn === "clicked") setInstitute(insti);
    };
    fetchData();
  }, [insti]);

  useEffect(() => {
    const handleAcceptList = async () => {
      const data = await getInstAccept();
      // console.log(data);
      setAcceptList(data);
      if (accepts.length === 0 || accBtn === "clicked") setAccepts(acceptList);
    };
    handleAcceptList();
  }, [acceptList, accepts]);

  useEffect(() => {
    const handleRejectList = async () => {
      const data = await getInstReject();
      setRejectList(data);
      if (rejects.length === 0 || accBtn === "clicked") setRejects(rejectList);
    };
    handleRejectList();
  }, [rejectList]);

  const handleChange = (e) => {
    let value = e.target.value;
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
  //accept-reject button clicked
  const btnClicked = (btn) => {
    console.log("Button" + btn);
    if (btn === "accept") {
      console.log("btn clicked");
      setAccBtn("clicked");
    }
  };
  useEffect(() => {
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (itype.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.type === val;
                  })
                : insti.filter((newVal) => {
                    return newVal.type === val;
                  });
            setInstitute(newItem);
          } else if (imonth.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.month === val;
                  })
                : insti.filter((newVal) => {
                    return newVal.month === val;
                  });
            setInstitute(newItem);
          } else if (iduration.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.duration === val;
                  })
                : insti.filter((newVal) => {
                    return newVal.duration === val;
                  });
            setInstitute(newItem);
          } else {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.rating === val;
                  })
                : insti.filter((newVal) => {
                    return newVal.rating === val;
                  });
            setInstitute(newItem);
          }
        })
      : setInstitute(insti);
  }, [appliedfilter]);

  useEffect(() => {
    let strDescending = [];
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...institute].sort((a, b) => b.rvalue - a.rvalue);
      setInstitute(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...institute].sort((a, b) => a.rvalue - b.rvalue);
      setInstitute(strDescending);
    } else {
      setInstitute(insti);
    }
  }, [sortdrop]);

  useEffect(() => {
    let filteredData1 = "";
    if (text.length == 0) {
      setInstitute(insti);
    } else {
      filteredData1 = institute.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setInstitute(filteredData1);
    }
  }, [text]);

  useEffect(() => {
    let filteredData1 = "";
    if (text.length == 0) {
      setAccepts(acceptList);
    } else {
      filteredData1 = accepts.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setAccepts(filteredData1);
    }
  }, [text]);

  useEffect(() => {
    let filteredData1 = "";
    if (text.length === 0) {
      setRejects(rejectList);
    } else {
      filteredData1 = rejects.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setRejects(filteredData1);
    }
  }, [text]);

  useEffect(() => {
    let strDescending = [];
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...accepts].sort((a, b) => b.rvalue - a.rvalue);

      setAccepts(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...accepts].sort((a, b) => a.rvalue - b.rvalue);

      setAccepts(strDescending);
    } else {
      setAccepts(acceptList);
    }
  }, [sortdrop]);

  useEffect(() => {
    let strDescending = [];
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...rejects].sort((a, b) => b.rvalue - a.rvalue);

      setRejects(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...rejects].sort((a, b) => a.rvalue - b.rvalue);

      setRejects(strDescending);
    } else {
      setRejects(rejectList);
    }
  }, [sortdrop]);

  useEffect(() => {
    // callInst();
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (itype.includes(val)) {
            const newItem =
              accepts.length > 0
                ? accepts.filter((newVal) => {
                    return newVal.type === val;
                  })
                : acceptList.filter((newVal) => {
                    return newVal.type === val;
                  });
            setAccepts(newItem);
          } else if (imonth.includes(val)) {
            const newItem =
              accepts.length > 0
                ? accepts.filter((newVal) => {
                    return newVal.month === val;
                  })
                : acceptList.filter((newVal) => {
                    return newVal.month === val;
                  });
            setAccepts(newItem);
          } else if (iduration.includes(val)) {
            const newItem =
              accepts.length > 0
                ? accepts.filter((newVal) => {
                    return newVal.duration === val;
                  })
                : acceptList.filter((newVal) => {
                    return newVal.duration === val;
                  });
            setAccepts(newItem);
          } else {
            const newItem =
              accepts.length > 0
                ? accepts.filter((newVal) => {
                    return newVal.rating === val;
                  })
                : acceptList.filter((newVal) => {
                    return newVal.rating === val;
                  });
            setAccepts(newItem);
          }
        })
      : setAccepts(acceptList);
  }, [appliedfilter]);

  useEffect(() => {
    // callInst();
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (itype.includes(val)) {
            const newItem =
              rejects.length > 0
                ? rejects.filter((newVal) => {
                    return newVal.type === val;
                  })
                : rejectList.filter((newVal) => {
                    return newVal.type === val;
                  });
            setRejects(newItem);
          } else if (imonth.includes(val)) {
            const newItem =
              rejects.length > 0
                ? rejects.filter((newVal) => {
                    return newVal.month === val;
                  })
                : rejectList.filter((newVal) => {
                    return newVal.month === val;
                  });
            setRejects(newItem);
          } else if (iduration.includes(val)) {
            const newItem =
              rejects.length > 0
                ? rejects.filter((newVal) => {
                    return newVal.duration === val;
                  })
                : rejectList.filter((newVal) => {
                    return newVal.duration === val;
                  });
            setRejects(newItem);
          } else {
            const newItem =
              rejects.length > 0
                ? rejects.filter((newVal) => {
                    return newVal.rating === val;
                  })
                : rejectList.filter((newVal) => {
                    return newVal.rating === val;
                  });
            setRejects(newItem);
          }
        })
      : setRejects(rejectList);
  }, [appliedfilter]);

  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">
          <div className="btns-inst">
            <button
              className="accepted-btn"
              onClick={() => {
                setDisAccept(true);
                setDisPending(false);
                setDisReject(false);
                // handleAcceptList();
              }}
            >
              Accepted List
            </button>
            <button
              className="rejected-btn"
              onClick={() => {
                setDisAccept(false);
                setDisPending(false);
                setDisReject(true);
                // handleAcceptList();
              }}
            >
              Rejected List
            </button>
          </div>

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
            ) : (
              <></>
            )}
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
              <h4>Applied Filter</h4>
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
          {disAccept ? (
            <>
              <div className="accept-bdy">
                <div className="head-inst">
                  <button className="back-inst-btn">
                    <img
                      src={arrowLeft}
                      alt=""
                      className="back-inst"
                      onClick={() => {
                        setDisAccept(false);
                        setDisPending(true);
                      }}
                    />
                  </button>
                  <h3 className="title-inst-accpt"> Accepted Institute List</h3>
                </div>
                <div
                  style={{
                    padding: "1%",
                    height: "80vh",
                    overflowY: "auto",
                  }}
                >
                  {accepts ? (
                    accepts.map((val) => (
                      <PendingInst inst={val} btnClicked={btnClicked} />
                    ))
                  ) : (
                    <>No accepted list</>
                  )}
                </div>
              </div>
            </>
          ) : null}

          {disPending ? (
            institute ? (
              institute.map((inst, key) => (
                <PendingInst inst={inst} btnClicked={btnClicked} />
              ))
            ) : (
              <>No application</>
            )
          ) : null}

          {disReject ? (
            <>
              <div className="accept-bdy">
                <div className="head-inst">
                  <button className="back-inst-btn">
                    <img
                      src={arrowLeft}
                      alt=""
                      className="back-inst"
                      onClick={() => {
                        setDisAccept(false);
                        setDisPending(true);
                        setDisReject(false);
                      }}
                    />
                  </button>
                  <h3 className="title-inst-accpt">Rejected Institute List</h3>
                </div>
                <div
                  style={{
                    padding: "1%",
                    height: "80vh",
                    overflowY: "auto",
                  }}
                >
                  {rejects ? (
                    rejects.map((val) => (
                      <PendingInst inst={val} btnClicked={btnClicked} />
                    ))
                  ) : (
                    <>No rejected list</>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default InstituteAdmin;
