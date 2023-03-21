import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/RegInstitute.css";
import { useEffect } from "react";
import cities from "../../service/cities.json";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const getInstitutes = async () => {
  try {
    let respone = await axios.get("/get-pending-institute");
    // console.log("Ins " + respone.data);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptInsitute = async (data) => {
  try {
    await axios.post("/accept-inst", data);
  } catch (error) {
    console.log(error);
  }
};

export const rejectInsitute = async (data) => {
  try {
    await axios.post("/reject-inst", data);
  } catch (error) {
    console.log(error);
  }
};

//function RegInstitute() {
const RegInstitute = () => {
  const [req, setReq] = useState(false);
  const [display, setDisplay] = useState(false); //will not show tpo to us until we make display true
  const [inst, setInst] = useState(true); //will show us institute foem and on clicking next it will become false
  //for navigation to login page
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const [value, setValue] = useState();
  const [isError, setIsError] = useState("");
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    smonth: "",
    emonth: "",
    duration: "",
    rating: "",
    rvalue: "",
    type: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    landline: "",
    extension: "",
    phoneno: "",
    status: "pending",
    salutation: "",
    coordfirstName: "",
    coordmiddleName: "",
    coordlastName: "",
    coordEmail: "",
    coordPhone: "",
    password: "",
    password2: "",
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
    console.log(userRegistration);
    const {
      name,
      email,
      smonth,
      emonth,
      duration,
      rating,
      rvalue,
      type,
      addressline1,
      addressline2,
      city,
      state,
      country,
      zipcode,
      landline,
      extension,
      phoneno,
      status,
      salutation,
      coordfirstName,
      coordmiddleName,
      coordlastName,
      coordEmail,
      coordPhone,
      password,
      password2,
    } = userRegistration;

    const res = await fetch("/institute-reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        smonth,
        emonth,
        duration,
        rating,
        rvalue,
        type,
        addressline1,
        addressline2,
        city,
        state,
        country,
        zipcode,
        phoneno,
        landline,
        extension,
        status,
        salutation,
        coordfirstName,
        coordmiddleName,
        coordlastName,
        coordEmail,
        coordPhone,
        password,
        password2,
      }),
    });

    const data = await res.json();
    console.log(data);

    //email and password validation
    // if (!validEmail.test(email)) {
    //   window.alert("Invalid Institute Email ID☹");
    //   console.log("Invalid Email ID");

    // } else if (!validEmail.test(coordEmail)) {
    //   window.alert("Invalid Coordinator Email ID☹");
    //   console.log("Invalid Email ID");
    // } else if (!validPassword.test(password)) {
    //   window.alert(
    //     "Password should be of minimum 8 characters and should contain a digit, an uppercase alphabet,a lowercase alphabet and a special symbol!!"
    //   );
    //console.log("Make the Password Strong !!");
    // } else
    if (data.status === 422 || data.error) {
      window.alert("Invalid Registration!❌" + data.error);
      console.log("Invalid Registration!❌");
    } else {
      window.alert("Registration Successful!✔");
      routeChange();
      //console.log("Registration Successful!✔");
    }
  };

  const checkValidation = (e) => {
    e.preventDefault();
    userRegistration.password2 = e.target.value;
    if (userRegistration.password != userRegistration.password2) {
      setIsError("Confirm Password should be same as Password!");
    }
  };

  return (
    <>
      <NavBar2 />
      <div className="body-reg-inst">
        <h1 className="regHead-inst">Register Your Institute</h1>
        <div className="form-body-inst-up">
          <form action="" method="POST" className="form-body-inst">
            {inst ? (
              <>
                <h4 className="head-inst-home-2">Institute Details</h4>
                <input
                  className="form-text-inst field1 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.name}
                  onChange={handlechange}
                  name="name"
                  id="name"
                  placeholder="Institute Name *"
                />

                <select
                  name="rating"
                  className="drop-down-inst field3 required"
                  value={userRegistration.rating}
                  onChange={handlechange}
                >
                  <option value="Select">NAAC Rating</option>
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
                  className="drop-down-inst field3 required"
                  value={userRegistration.type}
                  onChange={handlechange}
                >
                  <option value="Select">Institute Type</option>
                  <option value="Central University">Central University</option>
                  <option value="State University">State University</option>
                  <option value="Deemed University">Deemed University</option>
                  <option value="Private Institute">Private Institute</option>
                  <option value="Affiliated College">Affiliated College</option>
                  <option value="Autonomous College">Autonomous College</option>
                </select>

                <h4 className="head-inst-home">Institute Address</h4>

                <input
                  className="form-text-inst field2 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.addressline1}
                  onChange={handlechange}
                  name="addressline1"
                  id="addressline1"
                  placeholder="Address Line 1*"
                />
                <input
                  className="form-text-inst field2"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.addressline2}
                  onChange={handlechange}
                  name="addressline2"
                  id="addressline2"
                  placeholder="Address Line 2"
                />

                <select
                  name="country"
                  className="drop-down-inst field3 required"
                  value={userRegistration.country}
                  onChange={handlechange}
                >
                  <option value="select">Country</option>

                  {cities.map((Con) => {
                    return (
                      <option key={Con.country_id}>{Con.country_name}</option>
                    );
                  })}
                </select>

                <select
                  name="state"
                  className="drop-down-inst field3 required"
                  value={userRegistration.state}
                  onChange={handlechange}
                >
                  <option value="select">State</option>

                  {cities.map((Con) => {
                    return <option key={Con.state_id}>{Con.state_name}</option>;
                  })}
                </select>

                <select
                  name="city"
                  className="drop-down-inst field3 required"
                  value={userRegistration.city}
                  onChange={handlechange}
                >
                  <option value="select">City</option>

                  {cities.map((Con) => {
                    return <option key={Con.id}>{Con.name}</option>;
                  })}
                </select>

                <input
                  className="form-text-inst field3 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.zipcode}
                  onChange={handlechange}
                  name="zipcode"
                  id="zipcode"
                  placeholder="Zipcode*"
                />

                <h4 className="head-inst-home-2">Contact Details</h4>

                <input
                  className="form-text-inst field2 required"
                  type="email"
                  autoComplete="off"
                  value={userRegistration.email}
                  onChange={handlechange}
                  name="email"
                  id="email"
                  placeholder="Email*"
                />
                <input
                  className="form-text-inst field2 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.phoneno}
                  onChange={handlechange}
                  name="phoneno"
                  id="phoneno"
                  placeholder="Institute Phone No."
                />
                <div className="contact">
                  <div className="phone">
                    <PhoneInput
                      className="field 7"
                      placeholder="Landline number *"
                      value={userRegistration.landline}
                      onChange={setValue}
                    />
                  </div>

                  <input
                    className="form-text-inst field8 required"
                    type="text"
                    autoComplete="off"
                    value={userRegistration.extension}
                    onChange={handlechange}
                    name="extension"
                    id="extension"
                    placeholder="ext "
                  />
                </div>

                <h4 className="head-inst-home">Internship Details</h4>

                <select
                  name="duration"
                  className="drop-down-inst field3 required"
                  value={userRegistration.duration}
                  onChange={handlechange}
                >
                  <option value="Select">Internship Duration</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="4 Months">4 Months</option>
                  <option value="5 Months">5 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>

                <select
                  name="smonth"
                  className="drop-down-inst field3 required"
                  value={userRegistration.smonth}
                  onChange={handlechange}
                >
                  <option value="Select">Start Month</option>
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
                  name="emonth"
                  className="drop-down-inst field3 required"
                  value={userRegistration.emonth}
                  onChange={handlechange}
                >
                  <option value="Select">End Month</option>
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

                <div className="footer-inst">
                  <button
                    type="submit"
                    className="btn-inst0"
                    onClick={() => {
                      setInst(false);
                      setDisplay(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : display ? (
              <>
                <h4 className="head-inst-home">Coordinator Details</h4>
                <select
                  name="salutation"
                  className="drop-down-inst field4 required"
                  value={userRegistration.salutation}
                  onChange={handlechange}
                >
                  <option value="Select">Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>

                <input
                  className="form-text-inst2 field5 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.coordfirstName}
                  onChange={handlechange}
                  name="coordfirstName"
                  id="coordname"
                  placeholder="First Name*"
                />

                <input
                  className="form-text-inst2 field5"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.coordmiddleName}
                  onChange={handlechange}
                  name="coordmiddleName"
                  id="coordname"
                  placeholder="Middle Name"
                />

                <input
                  className="form-text-inst2 field5 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.coordlastName}
                  onChange={handlechange}
                  name="coordlastName"
                  id="coordname"
                  placeholder="Last Name*"
                />

                <h4 className="head-inst-home-2">Contact Details</h4>
                <input
                  className="form-text-inst2 field6 required"
                  type="email"
                  autoComplete="off"
                  value={userRegistration.coordEmail}
                  onChange={handlechange}
                  name="coordEmail"
                  id="coordemail"
                  placeholder="Coordinator's Email*"
                />

                <input
                  className="form-text-inst2 field6 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.coordPhone}
                  onChange={handlechange}
                  name="coordPhone"
                  id="coordphone"
                  placeholder="Coordinator's Phone No.*"
                />

                <h4 className="head-inst-home-2">Credentials</h4>
                <div className="box">
                  <input
                    className="form-text-inst2 field6 required"
                    type="text"
                    autoComplete="off"
                    value={userRegistration.password}
                    onChange={handlechange}
                    name="password"
                    id="password"
                    placeholder="Set Password *"
                  />

                  <input
                    className="form-text-inst2 field6 required"
                    type="text"
                    autoComplete="off"
                    value={userRegistration.password2}
                    onChange={checkValidation}
                    name="Confirm password"
                    id="Confirm password"
                    placeholder="Confirm Password *"
                  />
                </div>

                <div className="guidelines">
                  (Password must be of minimum 8 characters and must contain a
                  digit, an uppercase alphabet,a lowercase alphabet and a
                  special symbol)
                </div>

                <div className="footer-inst">
                  <button
                    type="submit"
                    className="btn-inst1"
                    onClick={() => {
                      setDisplay(false);
                      setInst(true);
                    }}
                  >
                    Previous
                  </button>
                  <button type="submit" className="btn-inst" onClick={PostData}>
                    Register
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};
export default RegInstitute;
