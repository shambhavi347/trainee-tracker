import React, { useState } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/Trainee/StudReg.css";
import { arrowDown, cancel } from "../../Images/Images";
import { validEmail } from "../../components/Regex";
import Multiselect from 'multiselect-react-dropdown';


const Demo = () => {

  const [page0, setPage0] = useState(true);
  const [page2, setPage2] = useState(false);

  const [famdrop, setFamdrop] = useState(false);
  const [intdrop, setIntdrop] = useState(false);

  const [tech, setTech] = useState([
    "Javascript",
    "Python",
    "Go",
    "Java",
    "Kotlin",
    "PHP",
    "C#",
    "Swift",
    "R",
    "Ruby",
    "C and C++",
    "Matlab",
    "TypeScript",
    "ML/AI",
    "SQL",
    "HTML",
    "CSS",
    "NoSQL",
    "Rust",
    "Perl",
  ]);

  const [user, setUser] = useState({
    prefix: "Mr.",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    dob: "",
    phone_no: "",
    gender: "",
    instname: "",
    course: "",
    stream: "",
    semester: "",
    cgpa: "",
    passout_year: "",
    resume: null,
    pdfname: "",
    status: "pending",
    invite: "pending",
  });

  const fileType = ["application/pdf"];
  const [famtech, setFamtech] = useState([]);
  const [inttech, setInttech] = useState([]);

  let name, value, pdf;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    if (name === "resume") {
      let selectedFile = e.target.files[0];
      pdf = e.target.files[0].name;
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = (v) => {
            // setPdf(v.target.result);
            // setUser({ ...user });
            setUser({ ...user, pdfname: pdf, resume: v.target.result });
            // setUser({ ...user,});
          };
        }
      } else {
        setUser({ ...user, resume: null });
      }
    } else {
      value = e.target.value;
      setUser({ ...user, [name]: value });
    }
    console.log(name, value);

    // setUser({ ...user, resume: pdf });
  };

  // console.log(pdf);
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if(name === "resume" && value != null) {
  //     setViewPdf(value)
  //   }
  //   else {
  //     setViewPdf(null)
  //   }
  // }

  const handlefamTech = (e) => {
    e.preventDefault();
    let value = e.target.value;
    // let name = e.target.name;
    if (e.target.checked) {
      //so duplicate values are not added
      if (famtech.includes(value) === false) setFamtech([...famtech, value]);
    } else {
      setFamtech((oldValues) => {
        return oldValues.filter((famtech) => famtech !== value);
      });
    }
  };

  const handleintTech = (e) => {
    e.preventDefault();
    let value = e.target.value;
    // let name = e.target.name;
    if (e.target.checked) {
      //so duplicate values are not added
      if (inttech.includes(value) === false) setInttech([...inttech, value]);
    } else {
      setInttech((oldValues) => {
        return oldValues.filter((inttech) => inttech !== value);
      });
    }
  };

  console.log(famtech);

  const validateData = async (e) => {
    e.preventDefault();
    const {
      prefix,
      first_name,
      middle_name,
      last_name,
      email,
      dob,
      gender,
      instname,
      course,
      stream,
      phone_no,
      semester,
      cgpa,
      passout_year,
    } = user;

    const res = await fetch("/reg-stud1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix,
        first_name,
        middle_name,
        last_name,
        email,
        dob,
        gender,
        instname,
        course,
        stream,
        phone_no,
        semester,
        cgpa,
        passout_year,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.error) {
      window.alert(data.error);
      console.log("Invalid Regestration");
    } else {
      setPage2(true);
      setPage0(false);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const {
      prefix,
      first_name,
      middle_name,
      last_name,
      email,
      dob,
      gender,
      instname,
      course,
      stream,
      phone_no,
      semester,
      cgpa,
      passout_year,
      status,
      invite,
    } = user;

    const res = await fetch("/reg-stud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix,
        first_name,
        middle_name,
        last_name,
        email,
        dob,
        gender,
        instname,
        course,
        stream,
        phone_no,
        semester,
        cgpa,
        passout_year,
        famtech,
        inttech,
        status,
        invite,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!validEmail.test(email)) {
      window.alert("Fill the correct Email Id ");
      console.log("Invalid Email id");
    } else if (data.error) {
      window.alert("Invalid Registration, " + data.error);
      console.log("Invalid Regestration");
    } else {
      window.alert("Registration Successfully");
      console.log("Successfull Regestration");
    }
  };

  console.log(user);
  return (
    <>
      <NavBar2 />
      {/* write your page 1 code here*/}
      <div className="DivUpper">
        <div className="main">
          <h1 className="regHead">Register Yourself</h1>
          <br />
          <div className="regBox">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {page0 ? (
                <>
                  <select
                    name="prefix"
                    className="drop-down"
                    value={user.prefix}
                    onChange={handleChange}
                  >
                    <option value="null">Enter Salutation</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                  </select>
                  <br />
                  <input
                    className="form-element form-text"
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={user.first_name}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element form-text"
                    type="text"
                    placeholder="Middle Name"
                    name="middle_name"
                    value={user.middle_name}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element form-text"
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={user.last_name}
                    autoComplete="off"
                    onChange={handleChange}
                  />

                  <input
                    className="form-element form-email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={user.email}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element form-text"
                    type="text"
                    name="phone_no"
                    value={user.phone_no}
                    placeholder="Contact Number"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element form-date"
                    type="date"
                    name="dob"
                    value={user.dob}
                    placeholder="DOB (dd/mm/yy)"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <br />
                  <select
                    name="gender"
                    className="drop-down"
                    value={user.gender}
                    onChange={handleChange}
                  >
                    <option value="null">Enter Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Binary">Binary</option>
                  </select>
                  <br />

                  {/* write your page 1 code here */}
                  <h1 className="regHead">
                    Hey {user.prefix} {user.first_name}, fill your Academic
                    details
                  </h1>
                  <br />
                  <input
                    className="form-element form-text"
                    type="text"
                    placeholder="Institute Name"
                    name="instname"
                    value={user.instname}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <br />
                  <select
                    name="course"
                    className="drop-down"
                    value={user.course}
                    onChange={handleChange}
                  >
                    <option value="null">Enter your Course</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="BTech">BTech</option>
                    <option value="MTech">MTech</option>
                  </select>
                  <br />
                  <select
                    name="stream"
                    className="drop-down1"
                    value={user.stream}
                    onChange={handleChange}
                  >
                    <option value="null">Enter your Stream</option>
                    <option value="Aeronautical Engineering">
                      Aeronautical Engineering
                    </option>
                    <option value="Automobile Engineering">
                      Automobile Engineering
                    </option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Computer Application">
                      Computer Application
                    </option>
                    <option value="Electronics & Communication">
                      Electronics & Communication
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Electrical and Electronics Engineering">
                      Electrical and Electronics Engineering
                    </option>
                    <option value="Computer Science and Engineering">
                      Computer Science and Engineering
                    </option>
                  </select>
                  <br />
                  <select
                    name="semester"
                    className="drop-down1"
                    value={user.semester}
                    onChange={handleChange}
                  >
                    <option value="null">Enter your Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                  <br />
                  <input
                    className="drop-down1"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name="cgpa"
                    placeholder="CGPA"
                    value={user.cgpa}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    className="drop-down1"
                    type="number"
                    step="1"
                    min="1887"
                    max="3000"
                    name="passout_year"
                    placeholder="Passout Year"
                    value={user.passout_year}
                    autoComplete="off"
                    onChange={handleChange}
                  />

                  <div>
                    <input
                      style={{ border: 0, display: "none" }}
                      className="form-control"
                      type="file"
                      accept="application/pdf"
                      name="resume"
                      id="files"
                      onChange={handleChange}
                    />
                    <label htmlFor="files" onChange={handleChange}>
                      {user.pdfname ? (
                        <div className="choose-file">{user.pdfname}</div>
                      ) : (
                        <div className="choose-file">Choose File</div>
                      )}
                    </label>
                  </div>
                  <button className="btn-form" onClick={validateData}>
                    NEXT
                  </button>
                </>
              ) : page2 ? (
                <>
                  {/* write your page 2 code here */}
                  <h1 className="regHead">
                    {" "}
                    {user.prefix} {user.first_name}, choose Technologies
                  </h1>
                  <div className="fam-tech">
                    <div className="drop-first">
                      Familiar Technologies
                      <button
                        className="down-btn"
                        onClick={() => {
                          famdrop ? setFamdrop(false) : setFamdrop(true);
                        }}
                      >
                        <img
                          className="downarrow-img "
                          src={arrowDown}
                          alt=""
                        />
                      </button>
                    </div>

                    {famdrop ? (
                      <>
                        <div className="option">
                          {tech.map((val, key) => (
                            <>
                              <label className="container-form">
                                {val}
                                <input
                                  type="checkbox"
                                  name={val}
                                  id=""
                                  value={val}
                                  onClick={handlefamTech}
                                />

                                <span className="checkmark-form"></span>
                              </label>
                              <hr
                                style={{
                                  backgroundColor: "#393e46",
                                  opacity: "0.2",
                                }}
                              />
                            </>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="int-drop">
                    <div className="drop-first">
                      Instrested Technologies
                      <button
                        className="down-btn"
                        onClick={() => {
                          intdrop ? setIntdrop(false) : setIntdrop(true);
                        }}
                      >
                        <img
                          className="downarrow-img "
                          src={arrowDown}
                          alt=""
                        />
                      </button>
                    </div>
                    {intdrop ? (
                      <>
                        <div className="option">
                          {tech.map((val, key) => (
                            <>
                              <label className="container-form">
                                {val}
                                <input
                                  type="checkbox"
                                  name={val}
                                  id=""
                                  value={val}
                                  onChange={handleintTech}
                                />

                                <span className="checkmark-form"></span>
                              </label>
                              <hr
                                style={{
                                  backgroundColor: "#393e46",
                                  opacity: "0.2",
                                }}
                              />
                            </>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>

                  {Object.keys(famtech).length === 0 ? null : (
                    <>
                      <h4>Familiar Technologies</h4>
                      <div className="tech-box-outer">
                        <div className="tech-box">
                          {famtech.map((key) => (
                            <>
                              <div className="tech-outer"></div>
                              <div className="tech">
                                <div className="cancel-text-tech">
                                  {key}
                                  <button
                                    className="cancel-btn-tech"
                                    onClick={() => {
                                      setFamtech((oldValues) => {
                                        return oldValues.filter(
                                          (famtech) => famtech !== key
                                        );
                                      });
                                    }}
                                  >
                                    <img
                                      className="cancel-img-tech"
                                      src={cancel}
                                      alt=""
                                    />
                                  </button>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {Object.keys(inttech).length === 0 ? null : (
                    <>
                      <h4>Interested Technologies</h4>
                      <div className="tech-box-outer">
                        <div className="tech-box">
                          {inttech.map((key) => (
                            <>
                              <div className="tech-outer"></div>
                              <div className="tech">
                                <div className="cancel-text-tech">
                                  {key}
                                  <button
                                    className="cancel-btn-tech"
                                    onClick={() => {
                                      setInttech((oldValues) => {
                                        return oldValues.filter(
                                          (inttech) => inttech !== key
                                        );
                                      });
                                    }}
                                  >
                                    <img
                                      className="cancel-img-tech"
                                      src={cancel}
                                      alt=""
                                    />
                                  </button>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* demo */}

                  <button
                    className="btn-form"
                    onClick={() => {
                      setPage0(true);
                      setPage2(false);
                    }}
                  >
                    PREVIOUS
                  </button>
                  <button className="btn-form" onClick={postData}>
                    SUBMIT
                  </button>
                </>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
