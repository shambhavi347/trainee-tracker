import React, { useState, useEffect } from "react";
import "../../CSS/Coordinator/CoordProject.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { display } from "@mui/system";
// import "react-router-dom";
import { Link } from "react-router-dom";
import "../Coordinator/ProjectDetails";
import { add, cancel } from "../../Images/Images";
import { createEvent, getEvents, postProject } from "../../service/api";
var events = {
  backgroundColor: "#222831",
  /* height: 30vh;*/
  width: "8%",
  height: "auto",
  /* width: auto; */
  // marginTop: "1%",
  /* margin-left: 15%; */
  /* display: flex; */
  /* justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; */
  padding: "1%",
  border: "1px #00adb5 solid",
  borderRadius: "50%",
};

const CoordProject = () => {
  const [coordPro, setCoordPro] = useState({
    title: "",
    description: "",
    coordinator_id: "",
  });

  const [display, setDisplay] = useState(false); //will not show students details to us until we make display true
  const [detail, setDetail] = useState(true);
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [expnd, setExpnd] = useState("none");
  const [des, setDes] = useState("");
  const [pro, setPro] = useState([]);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedDate3, setSelectedDate3] = useState(null);
  const [selectedDate4, setSelectedDate4] = useState(null);
  const [event, setEvent] = useState([]);
  const [eventExp, setEventExp] = useState(false);
  const [newEvent, setNewEvent] = useState({ event_name: "", deadline: "" });

  var dateList = new Array();
  let strDescending = [];
  var date, dob;
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvents();
        setEvent(data);
        event.map((val) => {
          date = new Date(val.timestamp);
          dob = date.toLocaleDateString("en-US");
          // console.log(dob);
          // dateList.push(dob);
          val.timestamp = dob;
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [event]);
 

  // dateList.map((val) => {
  //   console.log("deadline " + val);
  // });
  // console.log("Dates " + dateList.length);
  // console.log(event);

  const addEvent = async (e) => {
    try {
      e.preventDefault();
      console.log(newEvent);
      const data = await createEvent({
        event_name: newEvent.event_name,
        deadline: newEvent.deadline,
      });
      if (data.message) {
        window.alert(data.message);
        //after adding it'll reresh and the fields will be empty
        setEventExp(false);
        setNewEvent({ event_name: "", deadline: "" });
      } else {
        window.alert(data.error);
      }
      // console.log(data);
      // const res = await data.json();
      // console.log(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const addPro = async (e) => {
    try {
      e.preventDefault();
      console.log(coordPro);
      const data = await postProject({
        title: coordPro.title,
        description: coordPro.description,
      });
      if (data.message) {
        window.alert(data.message);
        setData([...data, item]);
        setPro([...pro, des]);
        setItem("");
        setDes("");
      } else {
        window.alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const addItem = () => {
  //   if (!item && !des) {
  //     window.alert(
  //       "Please specify a valid project title and description to add"
  //     );
  //   } else if (!item)
  //     window.alert("Please specify a valid project title to add");
  //   else {
  //     setData([...data, item]); //spread operator(...)
  //     // setItem("");
  //   }
  // };

  // const addDes = () => {
  //   if (item && !des) {
  //     window.alert("Please specify a valid project description to add");
  //   } else {
  //     // setPro([...pro, des]);
  //     // setDes("");
  //   }
  // };

  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setNewEvent({ ...newEvent, [name]: value });
  };
  // const deleteItem = (id) => {
  //   const newData = data.filter((item) => {
  //     return item.id !== id;
  //   });
  //   setData(newData);
  // };

  const deleteItem = (id) => {
    const newData = data.filter((item) => {
      return item.id !== id;
    });
    setData(newData);
  };

  //setting date

  function handleDateChange(date1) {
    setSelectedDate1(date1);
  }

  function handleDateChange(date2) {
    setSelectedDate1(date2);
  }

  function handleDateChange(date3) {
    setSelectedDate1(date3);
  }

  function handleDateChange(date4) {
    setSelectedDate1(date4);
  }

  const PostEvent = async () => {
    const event = await fetch("/api/coordinator/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
        timestamp: "",
        coordinator_id: "",
      }),
    });
    if (event.status === 200) {
      window.alert("Event added successfully");
      setPro([...pro, event.json()]);
    } else {
      window.alert("Error adding Event");
    }
  };

  const PostData = async () => {
    const res = await fetch("/api/coordinator/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
        description: "",
        coordinator_id: "",
      }),
    });
    if (res.status === 200) {
      window.alert("Successfully added project");
      setItem("");
    } else {
      window.alert("Error adding project");
    }
  };

  // const removeAll = () => {
  //   setData([]);
  // };

  return (
    <>
      <div className="body-coord-pro">
        <div className="event">
          <button className="add-event-btn" onClick={() => setEventExp(true)}>
            <div className="btn-msg">Add Events and their Deadlines</div>
            <img className="add-event-img" src={add} alt="Add Event"></img>
          </button>

          {event.length ? (
            <>
              {" "}
              <div>
                {event.map((val, index) => (
                  <div className="event-item" key={val.id}>
                    <div className="event-title">{val.title}</div>
                    <div className="event-deadline">
                      {new Date(val.timestamp).toLocaleDateString("en-US")}
                    </div>
                    {/* {console.log("Date " + index)} */}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="event-title">Add Events and their Deadlines</div>
            </>
          )}
        </div>

        <div className="projectdiv">
          <div className="main-coord-pro">
            <div className="addItem">
              <input
                className="title"
                type="text"
                placeholder="✍🏽Add Project Title.."
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>

            <div className="confirm">
              <button
                className="btn-effect"
                onClick={() => {
                  // addItem();
                  // addDes();
                  addPro();
                }}
              >
                ADD PROJECT
              </button>
            </div>

            <div className="description-bar">
              <textarea
                rows={6}
                cols={52}
                className="description"
                placeholder="Add Project Description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        {/* <div style={{ padding: "2%" }}>
          {event.length ? (
            <>
              {" "}
              <div

              >
                {event.map((val) => (
                  <div
                    key={val.id}
                
                  >
                    {val.title}
                    <t></t>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="event-title">Add Events and their Deadlines</div>
            </>
          )}

          <div className="event" style={events}>
            <div className="add-event">
              <button
                className="add-event-btn"
                onClick={() => setEventExp(true)}
              >
                <img className="add-event-img" src={add} alt="Add Event"></img>
              </button>
            </div>
          </div>
        </div>
        <div className="main-coord-pro">
          <div className="addItem">
            <input
              className="title"
              type="text"
              placeholder="✍🏽Add Project Title.."
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          <div className="confirm">
            <button
              className="btn-effect"
              onClick={() => {
                addItem();
                addDes();
              }}
            >
              ADD PROJECT
            </button>
          </div>

          <div className="description-bar">
            <textarea
              rows={6}
              cols={52}
              className="description"
              placeholder="Add Project Description"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="divlower">
          <div className="Head-coord-pro">
            <h3>List Of Projects</h3>
          </div>
          <div className="Line">
            <p className="line">
              ______________________________________________________________________________________________________________________________________
            </p>
          </div>

          <div className="showItem">
            <div className="lists">
              {data.map((element, index) => {
                return (
                  <>
                    <div className="eachItem" key={index}>
                      <h3>{element}</h3>
                    </div>

                    <div className="view">
                      <Link to="/pro-details">
                        <button
                          className="btn-view"
                          placeholder="View"
                          title="View Details"
                          // onClick={() => {
                          //   setDetail(false);
                          //   setDisplay(true);
                          // }}
                        ></button>
                      </Link>
                    </div>

                    <div className="trash">
                      <button
                        className="btn-trash"
                        placeholder="Bin"
                        title="Remove Item"
                        onClick={() => deleteItem(index)}
                      ></button>
                    </div>
                  </>
                );
              })}
              ;
            </div>
          </div>
        </div>*/}
        {eventExp ? (
          <>
            <div className="expanded-div">
              <div className="event-detail">
                <button
                  className="close-btn-event"
                  onClick={() => setEventExp(false)}
                >
                  <img
                    className="img-event"
                    src={cancel}
                    alt="close model box"
                  />
                </button>
                <div className="form-event">
                  <input
                    className="event-input"
                    type="text"
                    placeholder="Add Event"
                    value={newEvent.event_name}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, event_name: e.target.value })
                    }
                  />
                  <DatePicker
                    className="event-input"
                    placeholderText="Set Deadline"
                    selected={newEvent.deadline}
                    onChange={(date) =>
                      setNewEvent({ ...newEvent, deadline: date })
                    } // spread operator is used to keep previous unchanged
                  />
                  <button className="event-submit" onClick={addEvent}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default CoordProject;

{
  /* <div className="list-btn">
          <button
            className="btn-effect"
            data-sm-link-text="Remove All"
            onClick={removeAll}
          >
            <span>Remove All</span>
          </button>
        </div>
      </div> */
}

{
  /* <div className="plus">
              <i
                className="fa-regular fa-square-plus add-btn"
                title="Add Item"
                // onClick={addItem}
                onClick={() => setExpnd("none")}
              ></i>
            </div> */
}
