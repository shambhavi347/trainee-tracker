import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar1 from "./NavBar1";
import { useParams, useSearchParams } from "react-router-dom";

const CreatePass = () => {
  const { userId } = useParams();
  const [changePass, setChangePass] = useState(false);
  const [queryParameters] = useSearchParams();
  const [password, setPassword] = useState("");
  // const [id, setId] = useState("");
  // useEffect(() => {
  //   setId(queryParameters.get("id"));
  // }, []);
  console.log(userId);
  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setPassword(e.target.value);
  };
  const postData = async (e) => {
    e.preventDefault();

    // const { email, password } = admin;

    e.preventDefault();
    const res = await fetch("/create-pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });
    const reason = await res.json();
    console.log(reason);

    if (res.status === 400) {
      window.alert(reason.error);
    } else {
      // if (reason.message === "Admin") {
      //   console.log("Admin login");
      //   routeChangeAdmin();
      // } else if (reason.message === "Institute") {
      //   console.log("Trainee Login");
      //   routeChangeInst();
      // } else if (reason.message === "Trainee") {
      //   console.log("Trainee Login");
      //   routeChangeTrainee();
      // } else
      console.log("Password Changed");
    }
    // try {
    //   const res = await axios.post("/create-pass", userId);
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <NavBar1 />
      <div className="forgot-bdy">
        <div className="pass-block">
          {changePass ? (
            <>
              <h2>Password changed Successfully!!</h2>{" "}
              <p>Login now and continue </p>
            </>
          ) : (
            <>
              <h2 className="pass-title">
                Let's find your Trainee Tacker Account
              </h2>
              <p className="forgot-p">What's your email address ?</p>
              <form method="POST">
                <input
                  type="text"
                  placeholder="New Password"
                  className="pass-input"
                  onChange={handleChange}
                />

                <br />
                <button className="pass-btn" onClick={postData}>
                  Change Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default CreatePass;
