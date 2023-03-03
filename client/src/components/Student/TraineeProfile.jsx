import React, { useState, useEffect } from "react";
import NavBar5 from "../NavBar5";
import "../../CSS/Trainee/RegStudent.css";
import { StudentData } from "../../service/api";
import { fontStyle, padding } from "@mui/system";

const TraineeProfile = () => {
  const [userData, setuserData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState({
    phone_no:""
  });

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
    const {
      phone_no
    } = update;

    const res = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_no
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
      <NavBar5 />
      <div className="DivUpper">
        <div className="main">
          <h1 className="regHead">Profile Page</h1>
          <div className="form-body-inst-up" style={{ marginTop:"-1.7%", overflow:"auto" }}>
            {edit ? (
              <>
                <form action="POST" onSubmit={updateUser}>
                  <p>
                    <h3 style={{ marginLeft:"38.5%" }}>Edit Your Phone no.</h3>
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
                  <button style={{ marginLeft:"15%" }} className="btn-form">Save</button>
                  <button className="btn-form" style={{ float:"right", marginRight:"15%" }} onClick={() => setEdit(false)}>
                    Cancel
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%"}}>
                  Name : 
                  <span> {userData.prefix} {userData.first_name} {userData.last_name}</span> <br />
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  Email ID :
                  <span> {userData.email}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  Gender :
                  <span> {userData.gender}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  Phone Number :
                  <span> {userData.phone_no}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  Institute Name :
                  <span> {userData.instname}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  Course :
                  <span> {userData.course}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  Stream :
                  <span> {userData.stream}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  Semester :
                  <span> {userData.semester}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", marginBottom:"0%", width:"40%" }}>
                  CGPA :
                  <span> {userData.cgpa}</span>
                </p>
                <p className="tech" style={{ marginLeft:"31%", width:"40%" }}>
                  Passout Year : 
                  <span> {userData.passout_year}</span>
                </p>
                <button onClick={() => setEdit(true)} className="btn-form" style={{ marginLeft:"33%" }}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TraineeProfile;
