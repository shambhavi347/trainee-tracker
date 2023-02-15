import React, { useState } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/Institute/Regtpo.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Regtpo = () => {
  const [req, setReq] = useState(false);

  //function Regt() {
  /*const [userRegistration, setUserRegistration] = useState({
   name:"",
   email:"",
   phone:"",
   password:"",
   confirm_password:"",
  });*/
  //}
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

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

  return (
    <>
      <NavBar2 />
      <div class="divUpper">
        <div className="body">
          <div className="main">
            <h1 className="regHead">Register Yourself</h1>
            <div className="regbox">
              <form action="" className="form-body" onSubmit={handleSubmit}>
                <div className="name">
                  <input
                    className="form-text form__input"
                    type="text"
                    autoComplete="off"
                    value={userRegistration.instname}
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

                <div className="confirm_password">
                  <input
                    className="form-text form__input"
                    type="text"
                    autoComplete="off"
                    value={userRegistration.confirm_password}
                    onChange={handlechange}
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Regtpo;
