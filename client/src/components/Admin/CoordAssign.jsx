import React, { useEffect, useState } from "react";
import "../../CSS/Admin/CoordinatorAdmin.css";
import { arrowDown, cancel, expand } from "../../Images/Images";
import {
  getTrainees,
  getCoordClass,
  removeTrainee,
  postClass,
  getInstName,
  getSem,
  getStream,
  getCourse,
  getPassYear,
} from "../../service/api";

const CoordAssign = ({ coord }) => {
  var date, dob;
  const [filterdrop, setFilterdrop] = useState({
    "Institute Name": false,
    Stream: false,
    Course: false,
    Semester: false,
    "Passout Year": false,
  });
  const [instname, setInstname] = useState([]);
  const [stream, setStream] = useState([]);
  const [course, setCourse] = useState([]);
  const [sem, setSem] = useState([]);
  const [passyear, setPassyear] = useState([]);
  const [appliedfilter, setAppliedfilter] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studList, setStudList] = useState([]);
  const [group, setGroup] = useState([]);
  const [classGroup, setClassGroup] = useState([]);
  const [expnd, setExpnd] = useState(false);
  const [trainee, setTrainee] = useState([]);
  let trainee_id = [];

  useEffect(() => {
    try {
      const getTainee = async () => {
        const res = await getTrainees();
        setStudList(res);
        if (studentList.length === 0 && group.length === 0)
          setStudentList(studList);
      };
      getTainee();
    } catch (error) {
      console.log(error);
    }
  }, [studList]);

  useEffect(() => {
    try {
      const getClassDeets = async () => {
        const data = await getCoordClass({ coordId: coord._id });
        setClassGroup(data);
      };
      getClassDeets();
    } catch (error) {
      console.log(error);
    }
  }, [classGroup]);

  useEffect(() => {
    group.map((val) => {
      setStudentList(studentList.filter((item) => item._id !== val._id));
    });
  }, [group]);
  useEffect(() => {
    classGroup.map((val) =>
      setGroup(group.filter((item) => item._id !== val._id))
    );
  }, [classGroup]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstName();
      setInstname(data);
    };
    fetchData();
  }, [instname]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSem();
      setSem(data);
    };
    fetchData();
  }, [sem]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourse();
      setCourse(data);
    };
    fetchData();
  }, [course]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStream();
      setStream(data);
    };
    fetchData();
  }, [stream]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPassYear();
      setPassyear(data);
    };
    fetchData();
  }, [passyear]);

  useEffect(() => {
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (instname.includes(val)) {
            const newItem = studentList.filter((newVal) => {
              return newVal.instname === val;
            });
            setStudentList(newItem);
          } else if (course.includes(val)) {
            const newItem = studentList.filter((newVal) => {
              return newVal.course === val;
            });
            setStudentList(newItem);
          } else if (stream.includes(val)) {
            const newItem = studentList.filter((newVal) => {
              return newVal.stream === val;
            });

            setStudentList(newItem);
          } else if (sem.includes(val)) {
            const newItem = studentList.filter((newVal) => {
              return newVal.semester === val;
            });
            setStudentList(newItem);
          } else {
            const newItem = studentList.filter((newVal) => {
              console.log(newVal.passout_year + "  " + val);
              if (newVal.passout_year == val) return newVal;
            });
            setStudentList(newItem);
          }
        })
      : setStudentList(studList);
  }, [appliedfilter]);

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
  const handleTrainee = (val) => {
    setStudentList(studentList.filter((item) => item._id !== val._id));
    setGroup([...group, val]);
  };
  const handleRemove = (val) => {
    setGroup(group.filter((item) => item._id !== val._id));
    setStudentList([...studentList, val]);
  };
  const traineeRemove = async (val) => {
    try {
      setStudentList([...studentList, val]);
      const data = await removeTrainee({ trainee_id: val._id });
    } catch (error) {
      console.log(error);
    }
  };
  const handleExpand = (val) => {
    setExpnd(true);
    setTrainee(val);
    date = new Date(val.dob);
    dob = date.toLocaleDateString("en-US");
    console.log(expnd + "Val: " + trainee + dob);
  };
  if (trainee) {
    date = new Date(trainee.dob);
    dob = date.toLocaleDateString("en-US");
    console.log(dob);
  }
  const handleSubmit = async () => {
    try {
      group.map((val) => {
        trainee_id.push(val._id);
      });
      const data = await postClass({
        trainees: trainee_id,
        coord_id: coord._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="coordAssign-div">
        <div className="coordDeets">
          <div className="title-coord">
            {coord.salutation} {coord.name}
          </div>
          <div className="coordPhone">
            Phone:
            {coord.phone}
          </div>
          <div className="coordEmail">Email: {coord.email}</div>
        </div>
        <hr
          style={{
            backgroundColor: "#393e46",
            opacity: "0.2",
            marginTop: "2%",
            marginBottom: "1%",
          }}
        />
        <div className="assignPannel">
          <div className="filters-outer">
            <div className="filters">
              <div className="filter-div" style={{ color: "#00adb5" }}>
                <div className="filter-name" style={{ color: "#00adb5" }}>
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
                      {instname.map((val, key) => (
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
                <div className="filter-name" style={{ color: "#00adb5" }}>
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
                      {stream.map((val, key) => (
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
                <div className="filter-name" style={{ color: "#00adb5" }}>
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
                      {course.map((val, key) => (
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
                <div className="filter-name" style={{ color: "#00adb5" }}>
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
                      {sem.map((val, key) => (
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
                <div className="filter-name" style={{ color: "#00adb5" }}>
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
                      {passyear.map((val, key) => (
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

              <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />

              {Object.keys(appliedfilter).length === 0 ? null : (
                <>
                  <h4 style={{ color: "#00adb5" }}>Applied Filter</h4>
                  <div className="applied-filter-coord-outer">
                    <div className="applied-filter-coord">
                      {appliedfilter.map((key) => (
                        <>
                          <div className="filter-coord">
                            <div className="cancel-text">{key}</div>
                            <button
                              className="cancel-btn-coord"
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
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="studentList-outer">
            <div className="studentList" style={{ color: "#eee" }}>
              List of Students
              {studentList.map((val) => (
                <div className="name-title">
                  <div className="check-div" onClick={() => handleTrainee(val)}>
                    <img
                      src="./Images/check.png"
                      alt=""
                      className="check-img"
                    />
                  </div>
                  <div
                    className="down-btn"
                    id="arrowDown-btn"
                    onClick={() => handleExpand(val)}
                  >
                    <img src={expand} alt="" className="downarrow-img" />
                  </div>
                  {val.prefix} {val.first_name} {val.middle_name}{" "}
                  {val.last_name}
                </div>
              ))}
            </div>
          </div>
          <div className="classPannel-outer">
            <div className="classPannel" style={{ color: "#eee" }}>
              Class Assigned
              {classGroup ? (
                <>
                  {classGroup.map((val) => (
                    <div className="name-title">
                      <div className="check-div">
                        <img
                          src="./Images/remove.png"
                          alt=""
                          className="check-img"
                          onClick={() => traineeRemove(val)}
                        />
                      </div>
                      <div
                        className="down-btn"
                        id="arrowDown-btn"
                        onClick={() => handleExpand(val)}
                      >
                        <img src={expand} alt="" className="downarrow-img" />
                      </div>
                      {val.prefix} {val.first_name} {val.middle_name}{" "}
                      {val.last_name}
                    </div>
                  ))}
                </>
              ) : null}
              {group ? (
                <>
                  {group.map((val) => (
                    <div className="name-title">
                      <div className="check-div">
                        <img
                          src="./Images/remove.png"
                          alt=""
                          className="check-img"
                          onClick={() => handleRemove(val)}
                        />
                      </div>
                      <div className="down-btn" id="arrowDown-btn">
                        <img
                          src={expand}
                          alt=""
                          className="downarrow-img"
                          onClick={() => handleExpand(val)}
                        />
                      </div>
                      {val.prefix} {val.first_name} {val.middle_name}{" "}
                      {val.last_name}
                    </div>
                  ))}

                  {group.length === 0 ? null : (
                    <button className="submit-btn" onClick={handleSubmit}>
                      Submit
                    </button>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
        {expnd ? (
          <div className="expanded-div">
            <button onClick={() => setExpnd(false)} className="expnd-cancel">
              <img className="expnd-img" src={cancel} alt="" />
            </button>
            <div className="info-outer">
              <div className="info-first">
                {trainee.prefix} {trainee.first_name} {trainee.middle_name}{" "}
                {trainee.last_name}
              </div>
              <div className="info-second">
                <div className="info-type">Gender : {trainee.gender}</div>
                <div className="info-rating">
                  {" "}
                  DOB: {dob}
                  {console.log("date: " + date)}
                </div>
              </div>
              <div className="info-third">
                <div>Institue Name: {trainee.instname} </div>
                <div>Course: {trainee.course}</div>
                <div>Stream:{trainee.stream}</div>
                <div>Semester: {trainee.semester}</div>
                <div>CGPA:{trainee.cgpa}</div>
              </div>
              <div className="info-fourth">
                <div className="info-email">Email : {trainee.email}</div>
                <div className="info-phone">Phone No : {trainee.phone_no}</div>
              </div>
              <div className="info-fifth">
                <div className="info-month">
                  Internship Start Month: {trainee.month}
                </div>
                <div className="info-duration">
                  traineeernship Duration : {trainee.duration}
                </div>
              </div>
              <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />
              <div className="info-coord-title">
                traineeitute Coordinator's Details
              </div>
              <div className="info-sixth">Name : {trainee.coordName}</div>
              <div className="info-seventh">
                <div className="info-coor-email">
                  Email: {trainee.coordEmail}
                </div>
                <div className="info-coor-phone">
                  Phone: {trainee.coordPhone}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CoordAssign;
