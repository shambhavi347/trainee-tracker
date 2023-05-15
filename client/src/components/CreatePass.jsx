import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar1 from "./NavBar1";
import { useParams } from "react-router-dom";
import Captcha from "./Captcha";
import { closeeye, seen } from "../Images/Images";

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
  const [valid, setValid] = useState(false);
  const [showPass, setShowPass] = useState("password");
  const [eye, setEye] = useState(closeeye);

  const retValid = (btn) => {
    setValid(btn);
  };
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
    if (valid) {
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

      if (res.status === 422) {
        window.alert(reason.error);
      } else {
        setChangePass(true);
      }
    } else {
      window.alert("Captcha does not match");
    }
  };
  const handlePass = () => {
    if (showPass === "password") {
      setShowPass("text");
      setEye(seen);
    } else {
      setShowPass("password");
      setEye(closeeye);
    }
  };
  return (
    <>
      <NavBar1 />
      <div className="forgot-bdy">
        <div className="pass-block">
          {changePass ? (
            <>
              <div style={{ marginTop: "15%" }}>
                <h2 style={{ color: "#222831" }}>
                  Password changed Successfully!!
                </h2>{" "}
                <p style={{ color: "#393e46" }}>Login now and continue </p>
              </div>
            </>
          ) : (
            <>
              <div className="trainee-reg-box">
                <div className="formRegTrainee">
                  <h2 className="pass-title">
                    Let's find your Trainee Tacker Account
                  </h2>
                  <p className="forgot-p">What's your email address ?</p>
                  {/* className="form-element-trainee" */}
                  <div className="form-element-trainee-pass">
                    {/* {showPass ? ( */}
                    <input
                      type={showPass}
                      name="password"
                      placeholder="Set Password"
                      autoComplete="off"
                      onChange={handleChange}
                      className="input-pass"
                    />

                    <button className="show-pass" onClick={handlePass}>
                      <img className="pass-img" src={eye} alt="" />
                    </button>
                  </div>

                  <br />
                  <Captcha
                    retValid={retValid}
                    captchaRefreshContainer="captcha-refresh-container captcha-refresh-container-reg-coord"
                    inputContainerClass="input-container input-container-reg-coord"
                    captchaClass="captcha captcha-login"
                  />
                  {btnDisable ? (
                    <button
                      className="btn-trainee-disable"
                      disabled={btnDisable}
                    >
                      SUBMIT
                    </button>
                  ) : (
                    <button className="btn-form-trainee" onClick={postData}>
                      SUBMIT
                    </button>
                  )}
                </div>
                <div className="rules">
                  {/* <p style={{ fontSize: "small" }}> */}
                  <ul>
                    <p style={{ color: passUpper }}>
                      Must Conatin Uppercase Letter
                    </p>
                    <p style={{ color: passLower }}>
                      Must Contain Lowercase Letter
                    </p>
                    <p style={{ color: passNum }}>
                      Must Contain a Numeric Value
                    </p>
                    <p style={{ color: passSpe }}>
                      Must Contain a Special Symbol
                    </p>
                    <p style={{ color: passMin }}>
                      Must Contain Minimum 8 Characters
                    </p>
                  </ul>
                  {/* </p> */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default CreatePass;
