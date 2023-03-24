import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar1 from "./NavBar1";
import { useParams } from "react-router-dom";

const CreatePass = () => {
  const { userId } = useParams();
  const [changePass, setChangePass] = useState(false);
  const [password, setPassword] = useState("");
  const [passUpper, setPassUpper] = useState("red");
  const [passLower, setPassLower] = useState("red");
  const [passNum, setPassNum] = useState("red");
  const [passSpe, setPassSpe] = useState("red");
  const [passMin, setPassMin] = useState("red");
  const [btnDisable, setBtnDisable] = useState(true);
  useEffect(() => {
    var hasNumber = /\d/;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password.length === 0) {
      setPassUpper("red");
      setPassLower("red");
      setPassMin("red");
      setPassNum("red");
      setPassSpe("red");
      setBtnDisable(true);
    } else {
      if (password !== password.toLowerCase()) setPassUpper("green");
      else setPassUpper("red");
      if (password !== password.toUpperCase()) setPassLower("green");
      else setPassLower("red");
      if (hasNumber.test(password)) setPassNum("green");
      else setPassNum("red");
      if (format.test(password)) setPassSpe("green");
      else setPassSpe("red");
      if (password.length > 7) setPassMin("green");
      else setPassMin("red");
    }
  }, [password]);
  useEffect(() => {
    if (
      passLower === "green" &&
      passUpper === "green" &&
      passNum === "green" &&
      passSpe === "green" &&
      passMin === "green"
    )
      setBtnDisable(false);
    else setBtnDisable(true);
  }, [passUpper, passLower, passMin, passNum, passSpe]);

  const handleChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const postData = async (e) => {
    e.preventDefault();

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
      console.log("Password Changed");
    }
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
                  className="pass-input-change"
                  onChange={handleChange}
                />

                {btnDisable ? (
                  <button
                    className="pass-btn-change-disable"
                    disabled={btnDisable}
                  >
                    Change Password
                  </button>
                ) : (
                  <button className="pass-btn-change" onClick={postData}>
                    Change Password
                  </button>
                )}

                <ul className="password-rules">
                  <li style={{ color: passUpper }}>Uppercase letter</li>
                  <li style={{ color: passLower }}>Lowercase letter</li>
                  <li style={{ color: passSpe }}>Special symbol</li>
                  <li style={{ color: passNum }}>Numeric value</li>
                  <li style={{ color: passMin }}>Minimum of 8 letters</li>
                </ul>
                {/* <br /> */}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default CreatePass;
