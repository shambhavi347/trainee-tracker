import React, { useState } from "react";
import NavBar1 from "./NavBar1";
import Captcha from "./Captcha";

const ForgotPass = () => {
  const [mailSent, setMailSent] = useState(false);
  const [email, setEmail] = useState("");
  let value;
  const handleChange = (e) => {
    e.preventDefault();
    // name = e.target.name;
    value = e.target.value;
    setEmail(value);
  };

  const [valid, setValid] = useState(false);

  const retValid = (btn) => {
    setValid(btn);
  };

  const postData = async (e) => {
    if (valid === true) {
      e.preventDefault();
      const res = await fetch("/forgot-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const reason = await res.json();
      console.log("Reason" + reason);
      if (res.status === 422) {
        window.alert(reason.error);
      } else {
        console.log(reason.message);
        setMailSent(true);
      }
    } else {
      window.alert("Captcha does not match");
      // console.log("Successfull Regestration");
    }
  };
  return (
    <>
      <NavBar1 />
      <div className="forgot-bdy">
        <div className="pass-block">
          {mailSent ? (
            <h1 style={{ color: "#222831", marginTop: "17%" }}>
              Mail Sent to your inbox
            </h1>
          ) : (
            <>
              <h2 className="pass-title">
                Let's find your Trainee Tacker Account
              </h2>
              <p className="forgot-p">What's your email address ?</p>
              <form method="POST">
                <input
                  type="text"
                  placeholder="Search"
                  className="pass-input"
                  onChange={handleChange}
                />
                <br />
                <Captcha retValid={retValid} />
                <button className="pass-btn" onClick={postData}>
                  Send a password reset mail
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
