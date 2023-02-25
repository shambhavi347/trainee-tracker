import React, { useState } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/Coordinator/RegCoordinator.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { validEmail } from "../../components/Regex";
import { validPassword } from "../../components/Regex";

const RegCoordinator = () => {
  const [req, setReq] = useState(false);

  const [userRegistration, setUserRegistration] = useState({
    salutation: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [record, setRecord] = useState([]);
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);

    setUserRegistration({ ...userRegistration, [name]: value });
  };

  {
    /*const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    setRecord([...record, newRecord]);
  };*/
  }

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/coordinator-home";
    navigate(path);
  };

  // const PostData = async (e) => {
  //   e.preventDefault();
  //   const { salutation, name, email, phone, password } = userRegistration;
  //   console.log(userRegistration);
  //   const res = await fetch("/coordinator-reg", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       salutation,
  //       name,
  //       email,
  //       phone,
  //       password,
  //     }),
  //   });

  //   const data = await res.json();
  //   console.log(data);

  //   //email and password validation
  //   if (!validEmail.test(email)) {
  //     window.alert("Invalid Institute Email ID☹");
  //     console.log("Invalid Email ID");
  //   } else if (!validPassword.test(password)) {
  //     window.alert(
  //       "Password should be of minimum 8 characters and should contain a digit, an uppercase alphabet,a lowercase alphabet and a special symbol!!"
  //     );
  //     console.log("Make the Password Strong !!");
  //   } else if (data.status === 422 || !data) {
  //     window.alert("Invalid Registration!❌");
  //     console.log("Invalid Registration!❌");
  //   } else {
  //     window.alert("Registration Successful!✔");
  //     console.log("Registration Successful!✔");
  //   }
  // };

  const PostData = async (e) => {
    e.preventDefault();
    console.log(userRegistration);
    const { salutation, name, email, phone, password } = userRegistration;

    const res = await fetch("/coordinator-reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salutation,
        name,
        email,
        phone,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    //email and password validation
    if (!validEmail.test(email)) {
      window.alert("Invalid Institute Email ID☹");
      console.log("Invalid Email ID");
    } else if (!validEmail.test(email)) {
      window.alert("Invalid Coordinator Email ID☹");
      console.log("Invalid Email ID");
    } else if (!validPassword.test(password)) {
      window.alert(
        "Password should be of minimum 8 characters and should contain a digit, an uppercase alphabet,a lowercase alphabet and a special symbol!!"
      );
      //console.log("Make the Password Strong !!");
    } else if (data.status === 422 || !data) {
      window.alert("Invalid Registration!❌");
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
      <div class="divUpper">
        <div className="body">
          <div className="main">
            <h1 className="regHead">Register Yourself</h1>
            <div className="regbox">
              <form action="" method="POST" className="form-body">
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
                <div className="name">
                  <input
                    className="form-text form__input"
                    type="text"
                    autoComplete="off"
                    value={userRegistration.name}
                    onChange={handlechange}
                    name="name"
                    id="name"
                    placeholder="Coordinator's Name"
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
                    placeholder="Coordinator's Email"
                  />
                </div>

                <div className="phone">
                  <input
                    className="form-text form__input"
                    type="text"
                    autoComplete="off"
                    value={userRegistration.phone}
                    onChange={handlechange}
                    name="phone"
                    id="phone"
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
          </div>
        </div>
      </div>
    </>
  );
};
export default RegCoordinator;
