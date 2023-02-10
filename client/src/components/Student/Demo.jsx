import React, { useState } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/Trainee/RegStudent.css";
import { arrowDown } from "../../Images/Images";

const Demo = () => {
  const [page0, setPage0] = useState(true);
  const [page1, setPage1] = useState(false);
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
    first_name: "",
    last_name: "",
    Father_name: "",
    email: "",
    dob: "",
    phone_no: "",
    gender: "male",

    course: "",
    stream: "",
    semester: "",
    cgpa: "",
    passout_year: "",
    //resume: "",

    familiar_tech: "",
    intrested_tech: "",
  });

  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  console.log(user);
  return (
    <>
      <NavBar2 />

      {page0 ? (
        <>
          {/* write your page 1 code here*/}
          <div className="DivUpper">
            <div className="main">
              <h1 className="regHead">Register Yourself</h1>
              <div className="regBox">
                <form>
                  <input
                    className="form-element"
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={user.first_name}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element"
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={user.last_name}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={user.email}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element"
                    type="text"
                    name="phone_no"
                    value={user.phone_no}
                    placeholder="Contact Number"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="form-element"
                    type="date"
                    name="dob"
                    value={user.dob}
                    placeholder="DOB (dd/mm/yy)"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <div className="radioGroup">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={user.gender === "male"}
                      onChange={handleChange}
                    />
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={user.gender === "female"}
                      onChange={handleChange}
                    />
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="transgender"
                      checked={user.gender === "transgender"}
                      onChange={handleChange}
                    />
                    Transgender
                  </div>
                  <button
                    className="btn-form"
                    onClick={() => {
                      setPage1(true);
                      setPage0(false);
                      setPage2(false);
                    }}
                  >
                    {" "}
                    NEXT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : page1 ? (
        <>
          {/* write your page 2 code here */}
          <div class="DivUpper">
            <div className="body">
              <div className="main">
                <h1 className="regHead">Register Yourself</h1>
                <div className="regBox">
                  <form>
                    <select
                      name="course"
                      className="drop-down"
                      value={user.course}
                      onChange={handleChange}
                    >
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
                      <option value="Aeronautical Engineering">
                        Aeronautical Engineering
                      </option>
                      <option value="Automobile Engineering">
                        Automobile Engineering
                      </option>
                      <option value="Biotechnology">Biotechnology</option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
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
                      <option value="I">1</option>
                      <option value="II">2</option>
                      <option value="III">3</option>
                      <option value="IV">4</option>
                      <option value="v">5</option>
                      <option value="VI">6</option>
                      <option value="VII">7</option>
                      <option value="VIII">8</option>
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
                    <br />
                    <button
                      className="btn-form"
                      onClick={() => {
                        setPage2(false);
                        setPage0(true);
                        setPage1(false);
                      }}
                    >
                      {" "}
                      PREVIOUS{" "}
                    </button>
                    <button
                      className="btn-form"
                      onClick={() => {
                        setPage2(true);
                        setPage0(false);
                        setPage1(false);
                      }}
                    >
                      {" "}
                      NEXT{" "}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : page2 ? (
        <>
          {/* write your page 2 code here */}
          <div class="DivUpper">
            <div className="body">
              <div className="main">
                <h1 className="regHead">Register Yourself</h1>
                <div className="regBox">
                  <form onSubmit={(e) => e.preventDefault()}>
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
                                    type="checkbox-form"
                                    name={val}
                                    id=""
                                    value={val}
                                    onClick={(e) => e.preventDefault()}
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
                      {intdrop ? (
                        <>
                          <div className="option">
                            {tech.map((val, key) => (
                              <>
                                <label className="container-form">
                                  {val}
                                  <input
                                    type="checkbox-form"
                                    name={val}
                                    id=""
                                    value={val}
                                    onClick={(e) => e.preventDefault()}
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
                    <button
                      className="btn-form"
                      onClick={() => {
                        setPage1(true);
                        setPage0(false);
                        setPage2(false);
                      }}
                    >
                      PREVIOUS
                    </button>
                    <button
                      className="btn-form"
                      onClick={(e) => e.preventDefault()}
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Demo;
