import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Trainee/RegStudent.css";
import React, { useEffect } from "react";

const RegStudent1 = ({ page, setPage }) => {
  //js
  const [coursertype, setcoursetype] = useState([
    "BCA",
    "MCA",
    "BTech",
    "MTech",
  ]);
  const Add = coursertype.map((Add) => Add);
  const handleCourseChange = (e) => console.log(coursertype[e.target.value]);

  const [streamtype, setstreamtype] = useState([
    "Aeronautical Engineering",
    "Automobile Engineering",
    "Biotechnology",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Electronics & Communication",
    "Computer Application",
  ]);
  const Add1 = streamtype.map((Add1) => Add1);
  const handleCourseChange1 = (e) => console.log(streamtype[e.target.value]);

  const [user, setUser] = useState({
    cgpa: "CGPA",
  });

  const [err, setErr] = useState("");
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  let navigate = useNavigate();

  return (
    //html
    <>
      <NavBar2 />
      <div class="divUpper">
        <div className="body">
          <div className="main">
            <h1 className="regHead">Register Yourself</h1>
            <div className="regBox">
              <form>
                <select
                  onChange={(e) => handleCourseChange(e)}
                  className="drop-down"
                >
                  {Add.map((course, key) => (
                    <option value={key}>{course}</option>
                  ))}
                </select>
                <br />
                <select
                  onChange={(e) => handleCourseChange1(e)}
                  className="drop-down1"
                >
                  {Add1.map((stream, key) => (
                    <option value={key}>{stream}</option>
                  ))}
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
                <input
                  className="form-element"
                  type="text"
                  name="phone_no"
                  value={user.phone_no}
                  placeholder="Contact Number"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <button
                  className="btn"
                  onClick={() => navigate("/reg-student")}
                >
                  Previous
                </button>
                <button
                  className="btn"
                  onClick={() => navigate("/reg-student2")}
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegStudent1;
