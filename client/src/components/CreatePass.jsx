import React, { useState } from "react";
import NavBar1 from "./NavBar1";

const CreatePass = () => {
  const [changePass, setChangePass] = useState(false);
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setPassword(e.target.value);
  };
  const postData = async (e) => {
    e.preventDefault();
    const res = await fetch("/create-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });
    const reason = await res.json();
    console.log("Reason" + reason);
    if (res.status === 422) {
      window.alert(reason.error);
    } else {
      console.log(reason.message);
      setChangePass(true);
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
              <p>Login now and contiue </p>
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
