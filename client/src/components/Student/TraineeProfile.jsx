import React, { useState, useEffect } from "react";
import NavBar5 from "../NavBar5";
import "../../CSS/Trainee/RegStudent.css";
import "../../CSS/Trainee/TraineeProfile.css";
import { StudentData } from "../../service/api";
// import { fontStyle, padding } from "@mui/system";
import { createContext } from "react";
// import Announcment from "./Announcment";

export const ThemeContext = createContext(null);
const TraineeProfile = () => {
  const [userData, setuserData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState({
    phone_no: "",
  });
  const [theme, setTheme] = useState("light");

  const retTheme = (btn) => {
    setTheme(btn);
    console.log(theme);
  };
  //call user Profile
  useEffect(() => {
    const fetchPeople = async () => {
      const response = await StudentData();
      setuserData(response);
    };
    fetchPeople();
  }, []);

  //edit user Profile
  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const { phone_no } = update;

    const res = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_no,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.error) {
      window.alert(data.error);
      console.log("Invalid Updation");
    } else {
      window.alert("Update Successfully");
      console.log("Successfull Update");
      setEdit(false);
    }
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, retTheme }}>
        <div id={theme}>
          <NavBar5 retTheme={retTheme} />
          <div className="profileUpper">
            {/* <div className="main"> */}

            {edit ? (
              <>
                <h1 className="profileHead-edit">Profile Page</h1>
                <div className="form-edit-profile">
                  <form action="POST" onSubmit={updateUser}>
                    <p>
                      <h3 className="editPhone">Edit Your Phone no.</h3>
                      <input
                        className="form-element form-text"
                        name="phone_no"
                        placeholder={userData.phone_no}
                        value={update.name}
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                      />
                    </p>
                    <button className="btn-save">Save</button>
                    <button className="btn-cncl" onClick={() => setEdit(false)}>
                      Cancel
                    </button>
                  </form>
                </div>{" "}
              </>
            ) : (
              <>
                <h1 className="profileHead">Profile Page</h1>
                <div className="profile-box">
                  <p className="p-name">
                    {/* Name : */}
                    <span>
                      {" "}
                      {userData.prefix} {userData.first_name}{" "}
                      {userData.last_name}
                    </span>{" "}
                    <br />
                  </p>

                  <div className="line-one">
                    <p>
                      <span> {userData.gender}</span>
                    </p>
                    <p>
                      Email ID :<span> {userData.email}</span>
                    </p>

                    <p>
                      Phone Number :<span> {userData.phone_no}</span>
                    </p>
                  </div>

                  <div className="line-two">
                    <p className="two-inst">
                      Institute Name :<span> {userData.instname}</span>
                    </p>
                    <p className="two-course">
                      Course :<span> {userData.course}</span>
                    </p>
                  </div>
                  <div className="line-three">
                    <p className="three-stream">
                      Stream :<span> {userData.stream}</span>
                    </p>
                    <p className="three-sem">
                      Semester :<span> {userData.semester}</span>
                    </p>
                    <p className="three-cgpa">
                      CGPA :<span> {userData.cgpa}</span>
                    </p>
                    <p className="three-year">
                      Passout Year :<span> {userData.passout_year}</span>
                    </p>
                  </div>
                  <button onClick={() => setEdit(true)} className="btn-edit">
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default TraineeProfile;
