import React, { useState, useEffect } from "react";
import { validEmail } from "../../components/Regex";
import {
  getInvitation,
  getCoordinators,
  revokeInvitation,
} from "../../service/api";
import { arrowRight, arrowLeft } from "../../Images/Images.js";
import CoordAssign from "./CoordAssign";
import "../../CSS/Admin/CoordinatorAdmin.css";

const CoordinatorAdmin = () => {
  const [addDisplay, setAddDisplay] = useState(true);
  const [assgnDis, setAssgnDis] = useState(false);
  const [coord, setCoord] = useState({
    salutation: "",
    first_name: "",
    last_name: "",
    email: "",
    date: "",
  });
  const [invit, setInvit] = useState([]);
  const [coordinators, setCoordinators] = useState([]);

  const [assign, setAssign] = useState([]);
  const revokeInvite = async (e) => {
    e.preventDefault();
    let email = e.target.value;
    try {
      // console.log(email);
      await revokeInvitation({ email: email });
    } catch (error) {
      console.log(error);
    }
    // console.log(email);
  };

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    setCoord({ ...coord, [name]: value });
  };

  // console.log(invit);
  const PostData = async (e) => {
    e.preventDefault();
    setCoord({ ...coord, date: new Date() });
    const { salutation, first_name, last_name, email, date } = coord;

    const res = await fetch("/reg-coord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salutation,
        first_name,
        last_name,
        email,
        date,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!validEmail.test(email)) {
      window.alert("Fill the correct Email Id ");
      console.log("Invalid Email id");
    } else if (data.error) {
      window.alert("Invalid Registration, " + data.error);
      console.log("Invalid Regestration");
    } else {
      window.alert("Registration Successfully");
      console.log("Successfull Regestration");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInvitation();
      setInvit(data);
    };

    fetchData();
  }, [invit]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoordinators();
      setCoordinators(data);
    };

    fetchData();
  }, [coordinators]);

  // console.log(coordinators);
  // console.log(assign);
  let day, month, year;
  function timeSince(time) {
    let d = new Date(time);
    let timeStamp = d.getTime();
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + "s";
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + "m";
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + "h";
    }
    if (secondsPast > 86400) {
      day = timeStamp.getDate();
      month = timeStamp
        .toDateString()
        .match(/ [a-zA-Z]*/)[0]
        .replace(" ", "");
      year =
        timeStamp.getFullYear() === now.getFullYear()
          ? ""
          : " " + timeStamp.getFullYear();
      return day + " " + month + year;
    }
  }
  return (
    <>
      <div className="divBdyCoord">
        {addDisplay ? (
          <>
            <div className="coord-panel">
              <h3>Coordinator Addition Panel</h3>
              <form className="coord-form-body">
                <select
                  name="salutation"
                  value={coord.salutation}
                  className="coord-drop"
                  onChange={handleChange}
                >
                  <option value="null">Enter Salutation</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Miss</option>
                  <option value="Dr">Dr</option>
                </select>
                <input
                  type="text"
                  name="first_name"
                  className="coord-form-name"
                  placeholder="First Name"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="last_name"
                  className="coord-form-name"
                  placeholder="Last Name"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="email"
                  className="coord-form"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <button className="coord-btn" onClick={PostData}>
                  Add
                </button>
              </form>
            </div>
            <div className="additon">
              {invit ? (
                <>
                  <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />
                  <h3 className="title-invites">Invitations sent</h3>
                  <div className="invitated-panel">
                    {invit.map((val) => (
                      <div className="invites">
                        <div className="name-invites">
                          {val.salutation} {val.first_name} {val.last_name}
                        </div>
                        <div className="right-invites">
                          <button
                            className="btn-invites"
                            onClick={revokeInvite}
                            value={val.email}
                          >
                            Revoke
                          </button>
                          {val.date ? (
                            <div className="timestamp">
                              {timeSince(val.date)} ago
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />
              <h3 className="title-invites">Final Coordinators</h3>
              <div className="accepted-panel">
                {coordinators?.map((val) => (
                  <div
                    className="coordName"
                    onClick={() => {
                      setAddDisplay(false);
                      setAssgnDis(true);
                      setAssign(val);
                    }}
                  >
                    {val.salutation} {val.name}
                    <div className="img-arrow">
                      <img src={arrowRight} alt="" className="img-arr" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : assgnDis ? (
          <>
            <div
              className="img-arrow-left"
              onClick={() => {
                setAddDisplay(true);
                setAssgnDis(false);
              }}
            >
              <img src={arrowLeft} alt="" className="img-arr" />
            </div>
            <CoordAssign coord={assign} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default CoordinatorAdmin;
