import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/RegInstitute.css";
import { useEffect } from "react";
import { validEmail } from "../../components/Regex";
import { validPassword } from "../../components/Regex";

//function RegInstitute() {
const RegInstitute = () => {
  const [req, setReq] = useState(false);

  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    month: "",
    duration: "",
    rating: "",
    rvalue: "",
    type: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phoneno: "",
    status: "pending",
    salutation: "",
    coordName: "",
    coordEmail: "",
    coordPhone: "",
    password: "",
  });

  useEffect(() => {
    if (userRegistration.rating === "A++") userRegistration.rvalue = 8;
    else if (userRegistration.rating === "A+") userRegistration.rvalue = 7;
    else if (userRegistration.rating === "A") userRegistration.rvalue = 6;
    else if (userRegistration.rating === "B++") userRegistration.rvalue = 5;
    else if (userRegistration.rating === "B+") userRegistration.rvalue = 4;
    else if (userRegistration.rating === "B") userRegistration.rvalue = 3;
    else if (userRegistration.rating === "C") userRegistration.rvalue = 2;
    else if (userRegistration.rating === "D") userRegistration.rvalue = 1;
  }, [userRegistration.rating]);

  let navigate = useNavigate();
  useEffect(() => {
    if (req) {
      const routeChange = () => {
        let path = "/institute-home";
        navigate(path);
      };
      routeChange();
    }
  }, [req, navigate]);

  const [record, setRecord] = useState([]);
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);

    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      month,
      duration,
      rating,
      rvalue,
      type,
      street,
      city,
      state,
      country,
      zipcode,
      phoneno,
      status,
      salutation,
      coordName,
      coordEmail,
      coordPhone,
      password,
    } = userRegistration;

    const res = await fetch("/institute-reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        month,
        duration,
        rating,
        rvalue,
        type,
        street,
        city,
        state,
        country,
        zipcode,
        phoneno,
        status,
        salutation,
        coordName,
        coordEmail,
        coordPhone,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    //email and password validation
    if (!validEmail.test(email)) {
      window.alert("Invalid Institute Email ID☹");
      console.log("Invalid Email ID");
    } else if (!validEmail.test(coordEmail)) {
      window.alert("Invalid Coordinator Email ID☹");
      console.log("Invalid Email ID");
    } else if (!validPassword.test(password)) {
      window.alert(
        "Password should be of minimum 8 characters and should contain a digit, an uppercase alphabet,a lowercase alphabet and a special symbol!!"
      );
      console.log("Make the Password Strong !!");
    } else if (data.status === 422 || !data) {
      window.alert("Invalid Registration!❌");
      console.log("Invalid Registration!❌");
    } else {
      window.alert("Registration Successful!✔");
      console.log("Registration Successful!✔");
    }
  };

  return (
    <>
      <NavBar2 />
      <div className="body">
        <h1 className="regHead">Register Your Institute</h1>
        <form action="" method="POST" className="form-body">
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

          <select
            name="month"
            className="drop-down"
            value={userRegistration.month}
            onChange={handlechange}
          >
            <option value="Select">Select</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>

          <select
            name="duration"
            className="drop-down"
            value={userRegistration.duration}
            onChange={handlechange}
          >
            <option value="Select">Select</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
          </select>

          <select
            name="rating"
            className="drop-down"
            value={userRegistration.rating}
            onChange={handlechange}
          >
            <option value="Select">Select</option>
            <option value="A++">A++</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B++">B++</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          <select
            name="type"
            className="drop-down"
            value={userRegistration.type}
            onChange={handlechange}
          >
            <option value="Select">Select</option>
            <option value="Central University">Central University</option>
            <option value="State University">State University</option>
            <option value="Deemed University">Deemed University</option>
            <option value="Private Institute">Private Institute</option>
            <option value="Affiliated College">Affiliated College</option>
            <option value="Autonomous College">Autonomous College</option>
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

          <div className="phoneno">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.phoneno}
              onChange={handlechange}
              name="phoneno"
              id="phoneno"
              placeholder="Institute Phone No."
            />
          </div>

          {/*<div className="footer">
            <button type="submit" className="btn">
              Register
            </button>
          </div>*/}

          <select
            name="salutation"
            className="drop-down"
            value={userRegistration.salutation}
            onChange={handlechange}
          >
            <option value="Select">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>

          <div className="coordname">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.coordName}
              onChange={handlechange}
              name="coordName"
              id="coordname"
              placeholder="Coordinator's Name"
            />
          </div>
          <div className="coordemail">
            <input
              className="form-email form__input"
              type="email"
              autoComplete="off"
              value={userRegistration.coordEmail}
              onChange={handlechange}
              name="coordEmail"
              id="coordemail"
              placeholder="Coordinator's Email"
            />
          </div>
          <div className="coordphone">
            <input
              className="form-text form__input"
              type="text"
              autoComplete="off"
              value={userRegistration.coordPhone}
              onChange={handlechange}
              name="coordPhone"
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
            <button type="submit" className="btn" onClick={PostData}>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default RegInstitute;
