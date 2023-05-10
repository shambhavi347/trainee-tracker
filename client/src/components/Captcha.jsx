import React, { useState, useEffect } from "react";
import "../CSS/Captcha.css";

const Captcha = ({ retValid }) => {

  const [captcha, setCaptcha] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [valid, setValid] = useState(false);

  // Define the captcha generation function
  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captcha);
    setValid(false);
    retValid(false);
  };

  // Call the captcha generation function on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  //   Define the input change handler function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValid(value === captcha);
    retValid(value === captcha);
  };

  return (
    <div className="captcha-container">
      <div className="captcha">{captcha}</div>
      <img src={"refresh"} onClick={generateCaptcha} />
      <div className="input-container">
        <input
          type="text"
          placeholder="Type the code above"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {valid ? (
        <div className="valid">Valid code</div>
      ) : (
        <div className="not-valid">Not Valid</div>
      )}
      {/* <button className="refresh" onClick={generateCaptcha}>
        Refresh code
      </button> */}
    </div>
  );
};

export default Captcha;
