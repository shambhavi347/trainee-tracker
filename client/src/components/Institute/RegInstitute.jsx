import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/RegInstitute.css";
import { useEffect } from "react";
import axios from "axios";
import Captcha from "../Captcha";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Country, State, City } from "country-state-city";
import { createContext } from "react";

export const ThemeContext = createContext(null);

const RegInstitute = () => {
  const [country, setCountry] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [states, setStates] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [cities, setCities] = useState([]);
  const [req, setReq] = useState(false);
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState("");
  const [display, setDisplay] = useState(false); //will not show tpo to us until we make display true
  const [inst, setInst] = useState(true); //will show us institute foem and on clicking next it will become false

  //theme dark mode and light mode
  const [theme, setTheme] = useState("light");

  const retTheme = (btn) => {
    setTheme(btn);
    console.log(theme);
  };
  //for navigation to login page
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const [value, setValue] = useState();

  const [valid, setValid] = useState(false);

  const retValid = (btn) => {
    setValid(btn);
  };

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
    confirmPassword: "",
  });

  // console.log(Country.getAllCountries());
  // console.log(State.getAllStates());

  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, []);

  useEffect(() => {
    setStates(State.getStatesOfCountry(countryCode));
    country.map((val) => {
      if (val.isoCode === countryCode) setCountryName(val.name);
    });
    console.log("States" + countryName);
  }, [countryCode]);

  useEffect(() => {
    setCities(City.getCitiesOfState(countryCode, stateCode));
    // console.log("Cities" + cities);
  }, [stateCode]);

  // states?.map((val) => console.log(val));
  // console.log("Count: " + countryCode);

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

  useEffect(() => {
    setUserRegistration({ ...userRegistration, landline: value });
  }, [value]);

  // console.log(userRegistration);
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    if (name === "country") {
      setCountryCode(value);
    }
    setUserRegistration({ ...userRegistration, [name]: value });

    if (name === "state") setStateCode(value);
    console.log(userRegistration);
  };

  const ValidateData = async (e) => {
    e.preventDefault();
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
    } = userRegistration;

    const res = await fetch("/institute-reg0", {
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
      }),
    });

    const data = await res.json();
    // console.log(data);

    if (data.error) {
      window.alert(data.error);
      console.log("Invalid Regestration");
    } else {
      setInst(false);
      setDisplay(true);
      //console.log("Registration Successful!✔");
    }
  };

  const PostData = async (e) => {
    if (valid === true) {
      e.preventDefault();
      console.log(userRegistration);
      if (userRegistration.password === userRegistration.confirmPassword) {
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
      } else {
        window.alert("Confirm Password does not match");
        console.log("Confirm Password does not match");
      }
    } else {
      window.alert("Captcha not Matched");
      // console.log("Successfull Regestration");
    }
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, retTheme }}>
        <div id={theme}>
          <NavBar2 retTheme={retTheme} />
          <div className="body-reg-inst">
            <h1 className="regHead-inst">Register Your Institute</h1>
            <div className="form-body-inst-up">
              <form action="" method="POST" className="form-body-inst">
                {inst ? (
                  <>
                    <h4 className="head-inst-home-2">Institute Details</h4>
                    <input
                      className="form-text-inst fieldd1 required"
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
                      className="drop-down-inst fieldd3 required"
                      value={userRegistration.rating}
                      onChange={handlechange}
                    >
                      <option value="Select">NAAC Rating *</option>
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
                      className="drop-down-inst fieldd3 required"
                      value={userRegistration.type}
                      onChange={handlechange}
                    >
                      <option value="Select">Institute Type *</option>
                      <option value="Central University">
                        Central University
                      </option>
                      <option value="State University">State University</option>
                      <option value="Deemed University">
                        Deemed University
                      </option>
                      <option value="Private Institute">
                        Private Institute
                      </option>
                      <option value="Affiliated College">
                        Affiliated College
                      </option>
                      <option value="Autonomous College">
                        Autonomous College
                      </option>
                    </select>

                    <h4 className="head-inst-home-2">Institute Address</h4>

                    <input
                      className="form-text-inst fieldd2 required"
                      type="text"
                      autoComplete="off"
                      value={userRegistration.addressline1}
                      onChange={handlechange}
                      name="addressline1"
                      id="addressline1"
                      placeholder="Address Line 1 *"
                    />
                    <input
                      className="form-text-inst fieldd2"
                      type="text"
                      autoComplete="off"
                      value={userRegistration.addressline2}
                      onChange={handlechange}
                      name="addressline2"
                      id="addressline2"
                      placeholder="Address Line 2"
                    />

                    <div className="region">
                      <select
                        name="country"
                        className="drop-down-inst fieldd3 required"
                        value={userRegistration.country}
                        onChange={handlechange}
                        // onChange={(e) => {
                        //   console.log(e.target.value);
                        // }}
                      >
                        <option value="select">Country *</option>
                        {country.map((key) => {
                          return (
                            <option value={key.isoCode}> {key.name}</option>
                          );
                        })}
                      </select>

                      <select
                        name="state"
                        className="drop-down-inst fieldd3 required"
                        value={userRegistration.state}
                        onChange={handlechange}
                      >
                        <option value="select">State *</option>
                        {/* <option value="select">State 1</option> */}
                        {states.map((Con) => {
                          return (
                            <option value={Con.isoCode}>{Con.name}</option>
                          );
                        })}
                      </select>

                      <select
                        name="city"
                        className="drop-down-inst fieldd3 required"
                        value={userRegistration.city}
                        onChange={handlechange}
                      >
                        <option value="select">City *</option>
                        {/* <option value="select">City 1</option> */}
                        {cities.map((Con) => {
                          return (
                            <option value={Con.isoCode}>{Con.name}</option>
                          );
                        })}
                        {/* {cities.map((Con) => {
                    return <option key={Con.id}>{Con.name}</option>;
                  })} */}
                      </select>

                      <input
                        className="form-text-inst fieldd3 required"
                        type="text"
                        autoComplete="off"
                        value={userRegistration.zipcode}
                        onChange={handlechange}
                        name="zipcode"
                        id="zipcode"
                        placeholder="Zipcode *"
                      />
                    </div>

                    <h4 className="head-inst-home-2">Contact Details</h4>

                    <input
                      className="form-text-inst fieldd2 required"
                      type="email"
                      autoComplete="off"
                      value={userRegistration.email}
                      onChange={handlechange}
                      name="email"
                      id="email"
                      placeholder="Email *"
                    />
                    <input
                      className="form-text-inst fieldd2 required"
                      type="text"
                      autoComplete="off"
                      value={userRegistration.phoneno}
                      onChange={handlechange}
                      name="phoneno"
                      id="phoneno"
                      placeholder="Institute Phone No."
                    />
                    <div className="contact0">
                      <div className="phone0">
                        {/* <PhoneInput
                      className="field 7"
                      placeholder="Landline number *"
                      value={userRegistration.landline}
                      onChange={setValue}
                    /> */}

                        <PhoneInput
                          className="fieldd7"
                          placeholder="Landline number(xxxx-xxx-xxx) *"
                          value={userRegistration.landline}
                          onChange={setValue}
                          name="landline"
                        />
                      </div>

                      <input
                        className="form-text-inst fieldd8 required"
                        type="text"
                        autoComplete="off"
                        value={userRegistration.extension}
                        onChange={handlechange}
                        name="extension"
                        id="extension"
                        placeholder="ext"
                      />
                    </div>

                    <h4 className="head-inst-home-2">Internship Details</h4>

                    <select
                      name="duration"
                      className="drop-down-inst fieldd3 required"
                      value={userRegistration.duration}
                      onChange={handlechange}
                    >
                      <option value="Select">Internship Duration *</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="4 Months">4 Months</option>
                      <option value="5 Months">5 Months</option>
                      <option value="6 Months">6 Months</option>
                    </select>

                    <select
                      name="smonth"
                      className="drop-down-inst fieldd3 required"
                      value={userRegistration.smonth}
                      onChange={handlechange}
                    >
                      <option value="Select">Start Month *</option>
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
                      className="drop-down-inst fieldd3 required"
                      value={userRegistration.emonth}
                      onChange={handlechange}
                    >
                      <option value="Select">End Month *</option>
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
                        // onClick={ValidateData}
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
                    <h4 className="head-inst-home-2">Coordinator Details</h4>
                    <select
                      name="salutation"
                      className="drop-down-inst fieldd4 required"
                      value={userRegistration.salutation}
                      onChange={handlechange}
                    >
                      <option value="Select">Title *</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>

                    <input
                      className="form-text-inst2 fieldd5 required"
                      type="text"
                      autoComplete="off"
                      value={userRegistration.coordfirstName}
                      onChange={handlechange}
                      name="coordfirstName"
                      id="coordname"
                      placeholder="First Name *"
                    />

                    <input
                      className="form-text-inst2 fieldd5"
                      type="text"
                      autoComplete="off"
                      value={userRegistration.coordmiddleName}
                      onChange={handlechange}
                      name="coordmiddleName"
                      id="coordname"
                      placeholder="Middle Name"
                    />

                    <input
                      className="form-text-inst2 fieldd5 required"
                      type="text"
                      autoComplete="off"
                      value={userRegistration.coordlastName}
                      onChange={handlechange}
                      name="coordlastName"
                      id="coordname"
                      placeholder="Last Name"
                    />

                    <h4 className="head-inst-home-2">Contact Details</h4>
                    <input
                      className="form-text-inst2 fieldd6 required"
                      type="email"
                      autoComplete="off"
                      value={userRegistration.coordEmail}
                      onChange={handlechange}
                      name="coordEmail"
                      id="coordemail"
                      placeholder="Coordinator's Email *"
                    />

                    <input
                      className="form-text-inst2 fieldd6 required"
                      type="text"
                      autoComplete="off"
                      value={userRegistration.coordPhone}
                      onChange={handlechange}
                      name="coordPhone"
                      id="coordphone"
                      placeholder="Coordinator's Phone No. *"
                    />

                    <h4 className="head-inst-home-2">Credentials</h4>
                    <div className="box">
                      <input
                        className="form-text-inst2 fieldd6 required"
                        type="password"
                        autoComplete="off"
                        value={userRegistration.password}
                        onChange={handlechange}
                        name="password"
                        id="password"
                        placeholder="Set Password *"
                      />

                      <input
                        className="form-text-inst2 fieldd6 required"
                        type="password"
                        autoComplete="off"
                        value={userRegistration.confirmPassword}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password *"
                        // onChange={() => {
                        //   handlechange();
                        //   checkValidation();
                        // }}
                        onChange={handlechange}
                        // name="confirmPassword"
                        // id="Confirm password"
                        // placeholder="Confirm Password  *"
                      />
                    </div>

                    <div className="guidelines">
                      (Password must be of minimum 8 characters and must contain
                      a digit, an uppercase alphabet,a lowercase alphabet and a
                      special symbol)
                    </div>
                    {/* <br />
                    <br /> */}

                    <Captcha
                      retValid={retValid}
                      captchaRefreshContainer="captcha-refresh-container captcha-refresh-container-reg-inst"
                      inputContainerClass="input-container input-container-reg-inst"
                      captchaClass="captcha captcha-login"
                    />

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
                      <button
                        type="submit"
                        className="btn-inst"
                        onClick={PostData}
                      >
                        Register
                      </button>
                    </div>
                  </>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
};
export default RegInstitute;
