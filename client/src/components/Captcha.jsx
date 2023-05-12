import React, { useState, useEffect } from "react";
import "../CSS/Captcha.css";
import { reloadd } from "../Images/Images";

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
      <div className="captcha-refresh-container">
        <div className="captcha">
          {captcha}
        </div>
      <img className="reload-icon" src={reloadd} alt="" onClick={generateCaptcha} />
      </div>
      <div className="input-container" id="text-box">
        <input
          type="text"
          placeholder="Enter Captcha"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {valid ? (
        <div className="valid">Valid code</div>
      ) : (
        <div className="not-valid">Not Valid</div>
      )}
    </div>
  );
};

export default Captcha;
