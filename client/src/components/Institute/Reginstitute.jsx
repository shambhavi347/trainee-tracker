import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/RegInstitute.css";
import { useEffect } from "react";

//function RegInstitute() {
const RegInstitute = () => {
  const [req, setReq] = useState(false);

  const [userRegistration, setUserRegistration] = useState({
    instname: "",
    insttype: "",
    email: "",
    intprog: "",
    startmon: "",
    naac: "",
    street: "",
    state: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  let navigate = useNavigate();
  useEffect(() => {
    if (req) {
      const routeChange = () => {
        let path = "/reg-tpo";
        navigate(path);
      };
      routeChange();
    }
  }, [req, navigate]);

  const [record, setRecord] = useState([]);
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    setRecord([...record, newRecord]);
  };

  const [insttype, setinsttype] = useState([
    "Select",
    "Central University",
    "State University",
    "Deemed University",
    "Private Institute",
    "Affiliated College",
    "Autonomous College",
  ]);
  const Add1 = insttype.map((Add1) => Add1);
  const handleInstType = (e) => console.log(insttype[e.target.value]);

  const [startmon, setstartmon] = useState([
    "Select",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const Add2 = startmon.map((Add2) => Add2);
  const handleStartMon = (e) => console.log(startmon[e.target.value]);

  return (
    <>
      <NavBar2 />
      <div className="body">
        <h1 className="regHead">Register Your Institute</h1>
        <form action="" className="form-body" onSubmit={handleSubmit}>
          <div className="instname">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.instname}
              onChange={handlechange}
              name="instname"
              id="instname"
              placeholder="Institute Name"
            />
          </div>
          <select onChange={(e) => handleInstType(e)} className="drop-down">
            {Add1.map((institute, key) => (
              <option value={key}>{institute}</option>
            ))}
          </select>

          <div className="email">
            <input
              className="form-email form__input"
              type="email"
              autoComplete="off"
              value={userRegistration.email}
              onChange={handlechange}
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="intprog">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.intprog}
              onChange={handlechange}
              name="intprog"
              id="intprog"
              placeholder="Internship Program"
            />
          </div>
          <select onChange={(e) => handleStartMon(e)} className="drop-down">
            {Add2.map((month, key) => (
              <option value={key}>{month}</option>
            ))}
          </select>

          <div className="naac">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.naac}
              onChange={handlechange}
              name="naac"
              id="naac"
              placeholder="NAAC Rating"
            />
          </div>
          <div className="street">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.street}
              onChange={handlechange}
              name="street"
              id="street"
              placeholder="Street"
            />
          </div>

          <div className="city">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.city}
              onChange={handlechange}
              name="city"
              id="city"
              placeholder="City"
            />
          </div>

          <div className="state">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.state}
              onChange={handlechange}
              name="state"
              id="state"
              placeholder="State"
            />
          </div>

          <div className="country">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.country}
              onChange={handlechange}
              name="country"
              id="country"
              placeholder="Country"
            />
          </div>

          <div className="zipcode">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.zipcode}
              onChange={handlechange}
              name="zipcode"
              id="zipcode"
              placeholder="Zipcode"
            />
          </div>
          <div className="footer">
            <button type="submit" className="btn" onClick={() => setReq(true)}>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default RegInstitute;
