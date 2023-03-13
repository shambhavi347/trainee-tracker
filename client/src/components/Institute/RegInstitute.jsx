import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/RegInstitute.css";
import { useEffect } from "react";
import { validEmail } from "../../components/Regex";
import { validPassword } from "../../components/Regex";
import axios from "axios";

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
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    month: "",
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
    phoneno: "",
    status: "pending",
    salutation: "",
    coordfirstName: "",
    coordmiddleName: "",
    coordlastName: "",
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

  //method2
  // const [data, setData] = useState([]);
  // const [getCountry, setCountry] = useState();
  // useEffect(() => {
  //   axios.get(
  //     "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
  //       .then((res) => setData(res.data))
  //       .catch((err) => console.log(err))
  //   );
  // }, []);

  // const country = [...new Set(data.map((item) => item.country))];
  // country.sort();
  // console.log(country);
  // const handleCountry = () => {
  //   let states = data.filter((state) => state.country === e.target.value);
  //   const state = [...new Set(states.map((item) => item.subcountry))];
  // };

  //method1
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const getCountry = async () => {
      const rescountry = await fetch(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      );
      const rescon = await rescountry.json();
      setCountry(await rescon);
    };
    getCountry();
  }, []);

  const PostData = async (e) => {
    e.preventDefault();
    console.log(userRegistration);
    const {
      name,
      email,
      month,
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
      status,
      salutation,
      coordfirstName,
      coordmiddleName,
      coordlastName,
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
        addressline1,
        addressline2,
        city,
        state,
        country,
        zipcode,
        phoneno,
        status,
        salutation,
        coordfirstName,
        coordmiddleName,
        coordlastName,
        coordEmail,
        coordPhone,
        password,
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

  return (
    <>
      <NavBar2 />
      <div className="body-reg-inst">
        <h1 className="regHead-inst">Register Your Institute</h1>
        <div className="form-body-inst-up">
          <form action="" method="POST" className="form-body-inst">
            {inst ? (
              <>
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

                {/* <select
                  name="country"
                  className="drop-down-inst field3 required"
                  value={userRegistration.country}
                  onChange={handlechange}
                >
                  <option value="select">Country</option>
                  {country.map((getcon, index) => (
                    <option key={index} value={getcon.country_id}>
                      {getcon.country_name}
                    </option>
                  ))}
                </select> */}

                {/*method2
                 <select
                  name="country"
                  className="drop-down-inst field3 required"
                  value={userRegistration.country}
                  onChange={(e) => handleCountry(e)}
                >
                  <option value="select">Country</option>
                  {country.map((items) => (
                    <option key={items} value={getCountry}>
                      {items}
                    </option>
                  ))}
                </select> */}

                <input
                  className="form-text-inst field3 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.country}
                  onChange={handlechange}
                  name="country"
                  id="country"
                  placeholder="Country*"
                />

                <input
                  className="form-text-inst field3 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.state}
                  onChange={handlechange}
                  name="state"
                  id="state"
                  placeholder="State*"
                />

                <input
                  className="form-text-inst field3 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.city}
                  onChange={handlechange}
                  name="city"
                  id="city"
                  placeholder="City*"
                />
                {/* 
                <input
                  className="form-text-inst"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.street}
                  onChange={handlechange}
                  name="street"
                  id="street"
                  placeholder="Street"
                /> */}

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
                  placeholder="Institute Phone No.*"
                />

                <select
                  name="month"
                  className="drop-down-inst field3 required"
                  value={userRegistration.month}
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
                  name="duration"
                  className="drop-down-inst field3 required"
                  value={userRegistration.duration}
                  onChange={handlechange}
                >
                  <option value="Select">Internship Duration</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>

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

                {/* <select
                  name="country"
                  className="drop-down-inst"
                  value={userRegistration.country}
                  onChange={handlechange}
                >
                  <option value="Select">Select Country</option>
                  {Country.map((getCountry) => (
                    <option key={getCountry.id}>
                      {getCountry.country_name}
                    </option>
                  ))}
                </select> */}

                <div className="footer-inst">
                  <button
                    type="submit"
                    className="btn-inst"
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

                <input
                  className="form-text-inst2 field7 required"
                  type="text"
                  autoComplete="off"
                  value={userRegistration.password}
                  onChange={handlechange}
                  name="password"
                  id="password"
                  placeholder="Set Password*"
                />

                <div className="footer-inst">
                  <button
                    type="submit"
                    className="btn-inst"
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
