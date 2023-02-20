import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/RegInstitute.css";
import { useEffect } from "react";

const RegInstitute = () => {
  const [req, setReq] = useState(false);

  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    month: "",
    duration: "",
    rating: "",
    type: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    coordname: "",
    coordemail: "",
    coordphone: "",
    password: "",
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

  
  const [type, settype] = useState([
    "Select",
    "Central University",
    "State University",
    "Deemed University",
    "Private Institute",
    "Affiliated College",
    "Autonomous College",
  ]);
  const Add1 = type.map((Add1) => Add1);
  const handleType = (e) => console.log(type[e.target.value]);

  const [month, setmonth] = useState([
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
  const Add2 = month.map((Add2) => Add2);
  const handleMonth = (e) => console.log(month[e.target.value]);

  const [duration, setduration] = useState([
    "Select",
    "3 Months",
    "6 Months",
  ]);
  const Add3 = duration.map((Add3) => Add3);
  const handleDuration = (e) => console.log(duration[e.target.value]);

   const [rating, setrating] = useState([
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
  const Add4 = rating.map((Add4) => Add4);
  const handleRating = (e) => console.log(rating[e.target.value]);

  const [salutation, setsalutation] = useState([
    "Select",
    "Mr",
    "Ms",
    "Mrs",
    "Dr",
  ]);
  const Add5 = salutation.map((Add5) => Add5);
  const handleSalutation = (e) => console.log(salutation[e.target.value]);

  const PostData = async (e) =>{
    e.preventDefault();
    const { 
    name,
    email,
    month,
    duration,
    rating,
    type,
    street,
    city,
    state,
    country,
    zipcode} = user;

      const res = await fetch('/institute-reg',{
        methos: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          name,email,month,duration,rating,type,street,city,state,country,zipcode
        })
      });

      const data = await res.json();
      if(data.status === 422 || !data){
        window.alert("Invalid Registration!❌");
        console.log("Invalid Registration!❌");
      }else{
        window.alert("Registration Successful!✔");
        console.log("Registration Successful!✔");
      }

  }

  return (
    <>
      <NavBar2 />
      <div className="body">
        <h1 className="regHead">Register Your Institute</h1>
        <form action="" method="POST" className="form-body" onSubmit={handleSubmit}>
          <div className="name">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.instname}
              onChange={handlechange}
              name="name"
              id="name"
              placeholder="Institute Name"
            />
          </div>

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

          <select onChange={(e) => handleMonth(e)} className="drop-down">
            {Add2.map((month, key) => (
              <option value={key}>{month}</option>
            ))}
          </select>

          <select onChange={(e) => handleDuration(e)} className="drop-down">
            {Add3.map((duration, key) => (
              <option value={key}>{duration}</option>
            ))}
          </select>

           <select onChange={(e) => handleRating(e)} className="drop-down">
            {Add4.map((rating, key) => (
              <option value={key}>{rating}</option>
            ))}
          </select>

          <select onChange={(e) => handleType(e)} className="drop-down">
            {Add1.map((institute, key) => (
              <option value={key}>{institute}</option>
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
            <button type="submit" className="btn" onClick={PostData} onSubmit={() => setReq(true)}>
              Register
            </button>
          </div>

          <select onChange={(e) => handleSalutation(e)} className="drop-down">
                  {Add5.map((salutation, key) => (
                  <option value={key}>{salutation}</option>
                  ))}
           </select>

           <div className="coordname">
              <input
                  className="form-text form__input"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.instname}
                  onChange={handlechange}
                  name="coordname"
                  id="coordname"
                  placeholder="Coordinator's Name"
                />
            </div>

            <div className="coordemail">
              <input
                className="form-email form__input"
                type="email"
                autoComplete="off"
                value={userRegistration.email}
                onChange={handlechange}
                name="coordemail"
                id="coordemail"
                placeholder="Coordinator's Email"
              />
            </div>

            <div className="coordphone">
              <input
                className="form-text form__input"
                type="text"
                autoComplete="off"
                value={userRegistration.phone}
                onChange={handlechange}
                name="coordphone"
                id="coordphone"
                placeholder="Coordinator's Phone No."
              />
            </div>

            <div className="password">
              <input
                className="form-text form__input"
                type="text"
                autoComplete="off"
                value={userRegistration.password}
                onChange={handlechange}
                name="password"
                id="password"
                placeholder="Set Password"
              />
           </div>
                 
          <div className="footer">
              <button
                type="submit"
                className="btn"
                onClick={() => setReq(true)}
              >
                Register
              </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default RegInstitute;
