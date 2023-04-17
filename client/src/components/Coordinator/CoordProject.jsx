import React, { useState, useEffect } from "react";
import "../../CSS/Coordinator/CoordProject.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Coordinator/ProjectDetails";
import { add, arrowLeft, arrowRight, cancel, bin } from "../../Images/Images";
import {
  createEvent,
  getEvents,
  postProject,
  getProjects,
  postDeleteEvent,
} from "../../service/api";
import ProjectDetails from "../Coordinator/ProjectDetails";

const CoordProject = () => {
  const [coordPro, setCoordPro] = useState({
    title: "",
    description: "",
  });
  const [proEx, setProEx] = useState(false);
  const [errorPro, setErrorPro] = useState("");
  const [event, setEvent] = useState([]);
  const [eventExp, setEventExp] = useState(false);
  const [newEvent, setNewEvent] = useState({ event_name: "", deadline: "" });
  const [projects, setProjects] = useState([]);
  const [proTitleEx, setProTitleEx] = useState(true);
  const [displayDesc, setDisplayDesc] = useState(false);
  const [proValue, setProValue] = useState([]);
  const [deleteEventEx, setDeleteEventEx] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState([]);
  var date, dob;

  //get projects
  useEffect(() => {
    const getProjectList = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectList();
  }, [projects]);

  //get events
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvents();
        const sortedAsc = data.sort(function (a, b) {
          return new Date(a.timestamp) - new Date(b.timestamp);
        });
        setEvent(sortedAsc);
        event.map((val) => {
          date = new Date(val.timestamp);
          dob = date.toLocaleDateString("en-US");
          val.timestamp = dob;
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [event]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + " " + value);
    setCoordPro({ ...coordPro, [name]: value });
  };

  const handleAddProject = async (e) => {
    try {
      e.preventDefault();
      console.log(coordPro.title + coordPro.description);
      const data = await postProject({
        title: coordPro.title,
        description: coordPro.description,
      });
      console.log(data);
      if (data.message === "Saved") {
        setCoordPro({});
        setProEx(false);
      } else {
        setErrorPro(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelEvent = async () => {
    // console.log(event);

    try {
      console.log(deleteEvent._id);
      const data = await postDeleteEvent({ eventID: deleteEvent._id });
      // console.log(data);
      if (data.message === "Deleted") setDeleteEventEx(false);
      else setErrorPro(data.error);
    } catch (error) {
      console.log(error);
    }
  };

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
              <div>
                {event.map((val, index) => (
                  <div className="event-item" key={val.id}>
                    <div className="event-title">{val.title}</div>
                    <button
                      className="bin-btn"
                      onClick={() => {
                        setDeleteEventEx(true);
                        setDeleteEvent(val);
                      }}
                    >
                      {/* delete */}
                      <img src={bin} alt="" className="bin-img" />
                    </button>
                    <div className="event-deadline">
                      {new Date(val.timestamp).toLocaleDateString("en-US")}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="no-event">No Events Added Yet </div>
            </>
          )}
        </div>
        <div className="project-body">
          {proTitleEx ? (
            <>
              <div className="add-pro-div">
                <button className="add-pro-btn" onClick={() => setProEx(true)}>
                  Add Projects
                </button>
              </div>
              <div className="pro-lists">
                Project List
                {projects ? (
                  <>
                    {projects.map((val) => (
                      <>
                        <div
                          className="pro-tile"
                          onClick={() => {
                            setProTitleEx(false);
                            setDisplayDesc(true);
                            setProValue(val);
                          }}
                        >
                          {val.title}
                          <button className="arrowDown-btn">
                            <img
                              src={arrowRight}
                              alt=""
                              className="arrowDown-img-pro"
                            />
                          </button>
                        </div>
                      </>
                    ))}
                  </>
                ) : null}
              </div>
            </>
          ) : null}

          {displayDesc ? (
            <>
              <div>
                <div
                  className="img-arrow-left"
                  onClick={() => {
                    setProTitleEx(true);
                    setDisplayDesc(false);
                  }}
                >
                  <img src={arrowLeft} alt="" className="img-arr" />
                </div>
                {/* value - {proValue.title} */}
                <ProjectDetails project={proValue} />
              </div>
            </>
          ) : null}
        </div>

        {proEx ? (
          <>
            <div className="expanded-div-pro">
              <div className="pro-detail">
                <button
                  className="close-btn-pro"
                  onClick={() => setProEx(false)}
                >
                  <img className="img-pro" src={cancel} alt="close model box" />
                </button>
                <div className="pro-form-body">
                  <p className="pro-error">{errorPro}</p>
                  <form method="POST">
                    <input
                      className="pro-input-title"
                      type="text"
                      name="title"
                      id=""
                      placeholder="Project Title..."
                      value={coordPro.title}
                      onChange={handleChange}
                    />
                    <textarea
                      className="pro-input-desc"
                      placeholder="Project Description..."
                      name="description"
                      id=""
                      cols="80"
                      rows="10"
                      value={coordPro.description}
                      onChange={handleChange}
                    />

                    <button
                      className="pro-input-btn"
                      onClick={handleAddProject}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}

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

        {deleteEventEx ? (
          <>
            <div className="expanded-div">
              <div className="event-detail">
                <button
                  className="close-btn-event"
                  onClick={() => setDeleteEventEx(false)}
                >
                  <img
                    className="img-event"
                    src={cancel}
                    alt="close model box"
                  />
                </button>
                <div className="cnfrm-group">
                  <p className="pro-error">{errorPro}</p>
                  Do you want to delete event {deleteEvent.title} ?
                  <button onClick={handleDelEvent}>Yes</button>
                  <button onClick={() => setDeleteEventEx(false)}>No</button>
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
