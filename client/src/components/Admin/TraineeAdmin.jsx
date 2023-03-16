import React, { useEffect, useState } from "react";
import { arrowLeft, arrowDown, cancel } from "../../Images/Images";
import "../../CSS/Admin/TraineeAdmin.css";
import {
  getStudent,
  getAcceptStudent,
  getRejectStudent,
  getInstNamePenCat,
  getInstNameAccCat,
  getInstNameRejCat,
  getStreamAccCat,
  getStreamRejCat,
  getStreamPenCat,
  getPassYearAccCat,
  getPassYearRejCat,
  getPassYearPenCat,
  getSemesterAccCat,
  getSemesterRejCat,
  getSemesterPenCat,
  getCourseAccCat,
  getCourseRejCat,
  getCoursePenCat,
} from "../../service/api";
import PendingStudent from "./PendingStudent";

const TraineeAdmin = () => {
  const [filterdrop, setFilterdrop] = useState({
    "Institute Name": false,
    Stream: false,
    Course: false,
    Semester: false,
    "Passout Year": false,
  });
  const [text, setText] = useState("");
  const [accBtn, setAccBtn] = useState("");
  const [instnamePenCat, setInstnamePenCat] = useState([]);
  const [instnameAccCat, setInstnameAccCat] = useState([]);
  const [instnameRejCat, setInstnameRejCat] = useState([]);

  const [streamPenCat, setStreamPenCat] = useState([]);
  const [streamAccCat, setStreamAccCat] = useState([]);
  const [streamRejCat, setStreamRejCat] = useState([]);

  const [coursePenCat, setCoursePenCat] = useState([]);
  const [courseAccCat, setCourseAccCat] = useState([]);
  const [courseRejCat, setCourseRejCat] = useState([]);

  const [semPenCat, setSemPenCat] = useState([]);
  const [semAccCat, setSemAccCat] = useState([]);
  const [semRejCat, setSemRejCat] = useState([]);

  const [passPenCat, setPassPenCat] = useState([]);
  const [passAccCat, setPassAccCat] = useState([]);
  const [passRejCat, setPassRejCat] = useState([]);

  const [disPend, setDisPend] = useState(true);
  const [disAcc, setDisAcc] = useState(false);
  const [disRej, setDisRej] = useState(false);
  const [student, setStudent] = useState([]);
  const [studs, setStuds] = useState([]);
  const [acceptedStudents, setAcceptedStudents] = useState([]);
  const [acceptStud, setAcceptStud] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [rejectStud, setRejectStud] = useState([]);
  const [sortdrop, setSortdrop] = useState(false);
  const [sortvalue, setSortvalue] = useState("Sort By CGPA");
  const [appliedfilter, setAppliedfilter] = useState([]);
  //fetch pending students

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudent();
      // console.log(data);
      setStudent(data);
      // console.log("Students: " + student);
    };
    fetchData();
    if (studs.length === 0 || accBtn === "clicked") setStuds(student);
  }, [student]);

  //fetch accepted students
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAcceptStudent();
      setAcceptedStudents(data);
      console.log(acceptedStudents);
      if (acceptStud.length === 0 || accBtn === "clicked")
        setAcceptStud(acceptedStudents);
    };
    fetchData();
  }, [acceptedStudents]);

  //fetch rejected students
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRejectStudent();
      setRejectedStudents(data);
      if (rejectStud.length === 0 || accBtn === "clicked")
        setRejectStud(rejectedStudents);
    };
    fetchData();
  }, [rejectedStudents]);
  //get Institute Name Category
  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstNamePenCat();
      setInstnamePenCat(data);
    };
    fetchData();
  }, [instnamePenCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstNameAccCat();
      setInstnameAccCat(data);
    };
    fetchData();
  }, [instnameAccCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstNameRejCat();
      setInstnameRejCat(data);
    };
    fetchData();
  }, [instnameRejCat]);

  //get Stream Category
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStreamPenCat();
      setStreamPenCat(data);
    };
    fetchData();
  }, [streamPenCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStreamAccCat();
      setStreamAccCat(data);
    };
    fetchData();
  }, [streamAccCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStreamRejCat();
      setStreamRejCat(data);
    };
    fetchData();
  }, [streamRejCat]);

  //get Course Category

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoursePenCat();
      setCoursePenCat(data);
    };
    fetchData();
  }, [coursePenCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseAccCat();
      setCourseAccCat(data);
    };
    fetchData();
  }, [courseAccCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseRejCat();
      setCourseRejCat(data);
    };
    fetchData();
  }, [courseRejCat]);

  //get Semester Category
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSemesterPenCat();
      setSemPenCat(data);
    };
    fetchData();
  }, [semPenCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSemesterAccCat();
      setSemAccCat(data);
    };
    fetchData();
  }, [semAccCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSemesterRejCat();
      setSemRejCat(data);
    };
    fetchData();
  }, [semRejCat]);

  //get Passout Year Category
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPassYearPenCat();
      setPassPenCat(data);
    };
    fetchData();
  }, [passPenCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPassYearAccCat();
      setPassAccCat(data);
    };
    fetchData();
  }, [passAccCat]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPassYearRejCat();
      setPassRejCat(data);
    };
    fetchData();
  }, [passRejCat]);

  //accept-reject button clicked
  const btnClicked = (btn) => {
    if (btn === "accept") {
      setAccBtn("clicked");
    }
  };
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
  //Search Filter
  //Pending Students
  useEffect(() => {
    let filteredData1 = "";
    if (text.length === 0) {
      setStuds(student);
    } else {
      filteredData1 = studs.filter((user) =>
        user.first_name.toLowerCase().includes(text.toLowerCase())
      );
      setStuds(filteredData1);
    }
  }, [text]);

  //Accepted Students
  useEffect(() => {
    let filteredData1 = "";
    if (text.length === 0) {
      setAcceptStud(acceptedStudents);
    } else {
      filteredData1 = acceptStud.filter((user) =>
        user.first_name.toLowerCase().includes(text.toLowerCase())
      );
      setAcceptStud(filteredData1);
    }
  }, [text]);

  //Rjected Students
  useEffect(() => {
    let filteredData1 = "";
    if (text.length === 0) {
      // setAcceptStud(acceptedStudents);
      setRejectStud(rejectedStudents);
    } else {
      filteredData1 = rejectStud.filter((user) =>
        user.first_name.toLowerCase().includes(text.toLowerCase())
      );
      setRejectStud(filteredData1);
    }
  }, [text]);

  //sort filter
  //Pending Students
  useEffect(() => {
    let strDescending = [];
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...studs].sort((a, b) => b.cgpa - a.cgpa);
      setStuds(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...studs].sort((a, b) => a.cgpa - b.cgpa);
      setStuds(strDescending);
    } else {
      setStuds(student);
    }
  }, [sortdrop]);

  //accepted students
  useEffect(() => {
    let strDescending = [];
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...acceptStud].sort((a, b) => b.cgpa - a.cgpa);
      setAcceptStud(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...acceptStud].sort((a, b) => a.cgpa - b.cgpa);
      setAcceptStud(strDescending);
    } else {
      setAcceptStud(acceptedStudents);
    }
  }, [sortdrop]);

  //rejected students
  useEffect(() => {
    let strDescending = [];
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...rejectStud].sort((a, b) => b.cgpa - a.cgpa);
      setRejectStud(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...rejectStud].sort((a, b) => a.cgpa - b.cgpa);
      setRejectStud(strDescending);
    } else {
      setRejectStud(rejectedStudents);
    }
  }, [sortdrop]);

  //Filters

  //pending students
  useEffect(() => {
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (instnamePenCat.includes(val)) {
            const newItem = studs.filter((newVal) => {
              return newVal.instname === val;
            });
            setStuds(newItem);
          } else if (coursePenCat.includes(val)) {
            const newItem = studs.filter((newVal) => {
              return newVal.course === val;
            });
            setStuds(newItem);
          } else if (streamPenCat.includes(val)) {
            const newItem = studs.filter((newVal) => {
              return newVal.stream === val;
            });

            setStuds(newItem);
          } else if (semPenCat.includes(val)) {
            const newItem = studs.filter((newVal) => {
              return newVal.semester === val;
            });
            setStuds(newItem);
          } else {
            const newItem = studs.filter((newVal) => {
              console.log(newVal.passout_year + "  " + val);
              if (newVal.passout_year == val) return newVal;
            });
            setStuds(newItem);
          }
        })
      : setStuds(student);
  }, [appliedfilter]);

  //Accepted students
  useEffect(() => {
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (instnameAccCat.includes(val)) {
            const newItem = acceptStud.filter((newVal) => {
              return newVal.instname === val;
            });
            setAcceptStud(newItem);
          } else if (courseAccCat.includes(val)) {
            const newItem = acceptStud.filter((newVal) => {
              return newVal.course === val;
            });
            setAcceptStud(newItem);
          } else if (streamAccCat.includes(val)) {
            const newItem = acceptStud.filter((newVal) => {
              return newVal.stream === val;
            });

            setAcceptStud(newItem);
          } else if (semAccCat.includes(val)) {
            const newItem = acceptStud.filter((newVal) => {
              return newVal.semester === val;
            });
            setAcceptStud(newItem);
          } else {
            const newItem = acceptStud.filter((newVal) => {
              console.log(newVal.passout_year + "  " + val);
              if (newVal.passout_year == val) return newVal;
            });
            setAcceptStud(newItem);
          }
        })
      : setAcceptStud(acceptedStudents);
  }, [appliedfilter]);

  //Rejected Students
  useEffect(() => {
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (instnameRejCat.includes(val)) {
            const newItem = rejectStud.filter((newVal) => {
              return newVal.instname === val;
            });
            setRejectStud(newItem);
          } else if (courseRejCat.includes(val)) {
            const newItem = rejectStud.filter((newVal) => {
              return newVal.course === val;
            });
            setRejectStud(newItem);
          } else if (streamRejCat.includes(val)) {
            const newItem = rejectStud.filter((newVal) => {
              return newVal.stream === val;
            });

            setRejectStud(newItem);
          } else if (semRejCat.includes(val)) {
            const newItem = rejectStud.filter((newVal) => {
              return newVal.semester === val;
            });
            setRejectStud(newItem);
          } else {
            const newItem = rejectStud.filter((newVal) => {
              if (newVal.passout_year == val) return newVal;
            });
            setRejectStud(newItem);
          }
        })
      : setRejectStud(rejectedStudents);
  }, [appliedfilter]);

  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">
          <div className="btns-inst">
            <button
              className="accepted-btn"
              onClick={() => {
                setDisAcc(true);
                setDisPend(false);
                setDisRej(false);
              }}
            >
              Accepted List
            </button>
            <button
              className="rejected-btn"
              onClick={() => {
                setDisPend(false);
                setDisAcc(false);
                setDisRej(true);
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
                    setSortvalue("Sort by CGPA");
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
          {/* filters */}
          {disPend ? (
            <>
              <div className="filter-div">
                <div className="filter-name">
                  Institute Name
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Institute Name"]
                        ? setFilterdrop({ "Institute Name": false })
                        : setFilterdrop({ "Institute Name": true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Institute Name"] ? (
                    <>
                      {instnamePenCat.map((val, key) => (
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
                  Stream
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Stream"]
                        ? setFilterdrop({ Stream: false })
                        : setFilterdrop({ Stream: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Stream"] ? (
                    <>
                      {streamPenCat.map((val, key) => (
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
                  Course
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Course"]
                        ? setFilterdrop({ Course: false })
                        : setFilterdrop({ Course: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Course"] ? (
                    <>
                      {coursePenCat.map((val, key) => (
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
                  Semester
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Semester"]
                        ? setFilterdrop({ Semester: false })
                        : setFilterdrop({ Semester: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Semester"] ? (
                    <>
                      {semPenCat.map((val, key) => (
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
                  Passout Year
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Passout Year"]
                        ? setFilterdrop({ "Passout Year": false })
                        : setFilterdrop({ "Passout Year": true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Passout Year"] ? (
                    <>
                      {passPenCat.map((val, key) => (
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
              </div>
            </>
          ) : null}

          {disAcc ? (
            <>
              <div className="filter-div">
                <div className="filter-name">
                  Institute Name
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Institute Name"]
                        ? setFilterdrop({ "Institute Name": false })
                        : setFilterdrop({ "Institute Name": true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Institute Name"] ? (
                    <>
                      {instnameAccCat.map((val, key) => (
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
                  Stream
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Stream"]
                        ? setFilterdrop({ Stream: false })
                        : setFilterdrop({ Stream: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Stream"] ? (
                    <>
                      {streamAccCat.map((val, key) => (
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
                  Course
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Course"]
                        ? setFilterdrop({ Course: false })
                        : setFilterdrop({ Course: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Course"] ? (
                    <>
                      {courseAccCat.map((val, key) => (
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
                  Semester
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Semester"]
                        ? setFilterdrop({ Semester: false })
                        : setFilterdrop({ Semester: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Semester"] ? (
                    <>
                      {semAccCat.map((val, key) => (
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
                  Passout Year
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Passout Year"]
                        ? setFilterdrop({ "Passout Year": false })
                        : setFilterdrop({ "Passout Year": true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Passout Year"] ? (
                    <>
                      {passAccCat.map((val, key) => (
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
              </div>
            </>
          ) : null}

          {disRej ? (
            <>
              <div className="filter-div">
                <div className="filter-name">
                  Institute Name
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Institute Name"]
                        ? setFilterdrop({ "Institute Name": false })
                        : setFilterdrop({ "Institute Name": true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Institute Name"] ? (
                    <>
                      {instnameRejCat.map((val, key) => (
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
                  Stream
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Stream"]
                        ? setFilterdrop({ Stream: false })
                        : setFilterdrop({ Stream: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Stream"] ? (
                    <>
                      {streamRejCat.map((val, key) => (
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
                  Course
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Course"]
                        ? setFilterdrop({ Course: false })
                        : setFilterdrop({ Course: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Course"] ? (
                    <>
                      {courseRejCat.map((val, key) => (
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
                  Semester
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Semester"]
                        ? setFilterdrop({ Semester: false })
                        : setFilterdrop({ Semester: true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Semester"] ? (
                    <>
                      {semRejCat.map((val, key) => (
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
                  Passout Year
                  <button
                    className="down-btn"
                    onClick={() => {
                      filterdrop["Passout Year"]
                        ? setFilterdrop({ "Passout Year": false })
                        : setFilterdrop({ "Passout Year": true });
                    }}
                  >
                    <img className="downarrow-img " src={arrowDown} alt="" />
                  </button>
                  {filterdrop["Passout Year"] ? (
                    <>
                      {passRejCat.map((val, key) => (
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
              </div>
            </>
          ) : null}

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
          {disAcc ? (
            <>
              <div className="accept-bdy">
                <div className="head-inst">
                  <button className="back-inst-btn">
                    <img
                      src={arrowLeft}
                      alt=""
                      className="back-inst"
                      onClick={() => {
                        setDisAcc(false);
                        setDisPend(true);
                        setDisRej(false);
                      }}
                    />
                  </button>
                  <h3 className="title-inst-accpt"> Accepted Student List</h3>
                </div>
                <div
                  style={{
                    padding: "1%",
                    height: "80vh",
                    overflowY: "auto",
                  }}
                >
                  {acceptStud ? (
                    acceptStud.map((val) => (
                      <PendingStudent stud={val} btnClicked={btnClicked} />
                    ))
                  ) : (
                    <>No accepted list</>
                  )}
                </div>
              </div>
            </>
          ) : null}

          {disPend
            ? studs.map((val, key) => (
                <PendingStudent stud={val} btnClicked={btnClicked} />
              ))
            : null}

          {disRej ? (
            <>
              <div className="accept-bdy">
                <div className="head-inst">
                  <button className="back-inst-btn">
                    <img
                      src={arrowLeft}
                      alt=""
                      className="back-inst"
                      onClick={() => {
                        setDisAcc(false);
                        setDisPend(true);
                        setDisRej(false);
                      }}
                    />
                  </button>
                  <h3 className="title-inst-accpt"> Rejcted Student List</h3>
                </div>
                <div
                  style={{
                    padding: "1%",
                    height: "80vh",
                    overflowY: "auto",
                  }}
                >
                  {rejectStud ? (
                    rejectStud.map((val) => (
                      <PendingStudent stud={val} btnClicked={btnClicked} />
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

export default TraineeAdmin;
