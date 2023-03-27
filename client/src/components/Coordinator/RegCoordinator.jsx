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
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [user, setUser] = useState({
    salutation: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [record, setRecord] = useState([]);
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + value);
    setUser({ ...user, [name]: value });
    // setUserRegistration({ ...userRegistration, [name]: value });
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const PostData = async (e) => {
    e.preventDefault();
    console.log(userRegistration);
    const {
      salutation,
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password,
    } = user;

    const res = await fetch("/coordinator-reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salutation,
        first_name,
        middle_name,
        last_name,
        email,
        phone,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 422 || data.error) {
      window.alert("Invalid Registration!❌" + data.error);
      console.log("Invalid Registration!❌");
    } else {
      window.alert("Registration Successful!✔");
      routeChange();
    }
  };

  return (
    <>
      <NavBar2 />
      <div className="body-reg-coord">
        <h1 className="regHead-coord">Register Yourself</h1>
        <div className="form-body-coord-up">
          <form action="" method="POST" className="form-body-coord">
            <select
              name="salutation"
              className="drop-down-coord"
              value={userRegistration.salutation}
              onChange={handlechange}
            >
              <option value="Select">Select Salutation</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
            </select>

            <input
              className="form-text-coord"
              type="text"
              autoComplete="off"
              value={user.first_name}
              onChange={handlechange}
              name="name"
              id="name"
              placeholder="Coordinator's First Name"
            />

            <input
              className="form-text-coord"
              type="text"
              autoComplete="off"
              value={user.middle_name}
              onChange={handlechange}
              name="name"
              id="name"
              placeholder="Coordinator's Middle Name"
            />
            <input
              className="form-text-coord"
              type="text"
              autoComplete="off"
              value={user.last_name}
              onChange={handlechange}
              name="name"
              id="name"
              placeholder="Coordinator's Last Name"
            />
            <input
              className="form-text-coord"
              type="email"
              autoComplete="off"
              value={user.email}
              onChange={handlechange}
              name="email"
              id="email"
              placeholder="Coordinator's Email"
            />

            <input
              className="form-text-coord"
              type="text"
              autoComplete="off"
              value={user.phone}
              onChange={handlechange}
              name="phone"
              id="phone"
              placeholder="Coordinator's Phone No."
            />

            <input
              className="form-text-coord"
              type="text"
              autoComplete="off"
              value={user.password}
              onChange={handlechange}
              name="password"
              id="password"
              placeholder="Set Password"
            />

            <div className="footer-coord">
              <button type="submit" className="btn-coord" onClick={PostData}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RegCoordinator;
