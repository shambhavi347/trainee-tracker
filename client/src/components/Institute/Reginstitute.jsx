import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/Reginstitute.css";
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

  const [naac, setnaac] = useState([
    "Select",
    "A++",
    "A+",
    "A",
    "B++",
    "B+",
    "B",
    "C",
    "D",
  ]);
  const Add3 = naac.map((Add3) => Add3);
  const handleNaac = (e) => console.log(naac[e.target.value]);

  const [intprog, setintprog] = useState([
    "Select",
    "3 Months",
    "6 Months",
  ]);
  const Add4 = intprog.map((Add4) => Add4);
  const handleIntprog = (e) => console.log(intprog[e.target.value]);


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
          <select onChange={(e) => handleIntprog(e)} className="drop-down">
            {Add4.map((duration, key) => (
              <option value={key}>{duration}</option>
            ))}
          </select>

          <select onChange={(e) => handleStartMon(e)} className="drop-down">
            {Add2.map((month, key) => (
              <option value={key}>{month}</option>
            ))}
          </select>

          <select onChange={(e) => handleNaac(e)} className="drop-down">
            {Add3.map((rating, key) => (
              <option value={key}>{rating}</option>
            ))}
          </select>

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
export default Reginstitute;
