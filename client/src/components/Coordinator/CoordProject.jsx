import React, { useState } from "react";
import "../../CSS/Coordinator/CoordProject.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CoordProject = () => {
  const [coordPro, setCoordPro] = useState({
    title: "",
    description: "",
    coordinator_id: "",
    group_id: "",
  });

  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [expnd, setExpnd] = useState("none");
  const [des, setDes] = useState("");
  const [pro, setPro] = useState([]);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedDate3, setSelectedDate3] = useState(null);
  const [selectedDate4, setSelectedDate4] = useState(null);

  const addItem = () => {
    if (!item && !des) {
      window.alert(
        "Please specify a valid project title and description to add"
      );
    } else if (!item)
      window.alert("Please specify a valid project title to add");
    else {
      setData([...data, item]); //spread operator(...)
      setItem("");
    }
  };

  const addDes = () => {
    if (item && !des) {
      window.alert("Please specify a valid project description to add");
    } else {
      setPro([...pro, des]);
      setDes("");
    }
  };

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

  const PostData = async () => {
    const res = await fetch("/api/coordinator/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item,
        description: "",
        coordinator_id: "",
        group_id: "",
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
        <div className="events">
          {/* <div>
            <button
              className="event-item1 date"
              onClick={selectedDate.toString()}
            >
             
              SRS
            </button>
          </div> */}
          <div>
            <h4 className="event-item1 date">
              SRS<br></br>
            </h4>
            <div className="deadline">
              <DatePicker
                placeholderText="Set Deadline"
                selected={selectedDate1}
                onChange={(date1) => setSelectedDate1(date1)}
              />
            </div>
          </div>
          <div>
            <h4 className="event-item1 date">
              SDS<br></br>
            </h4>
            <div className="deadline">
              <DatePicker
                placeholderText="Set Deadline"
                selected={selectedDate2}
                onChange={(date2) => setSelectedDate2(date2)}
              />
            </div>
          </div>
          <div>
            <h4 className="event-item1 date">
              Document<br></br>
            </h4>
            <div className="deadline">
              <DatePicker
                placeholderText="Set Deadline"
                selected={selectedDate3}
                onChange={(date3) => setSelectedDate3(date3)}
              />
            </div>
          </div>
          <div>
            <h4 className="event-item1 date">
              Report<br></br>
            </h4>
            <div className="deadline">
              <DatePicker
                placeholderText="Set Deadline"
                selected={selectedDate4}
                onChange={(date4) => setSelectedDate4(date4)}
              />
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
            <line className="line">
              ______________________________________________________________________________________________________________________________________
            </line>
          </div>

          <div className="showItem">
            <div className="lists">
              {data.map((element, index) => {
                return (
                  <>
                    <div className="eachItem" key={index}>
                      <h3>{element}</h3>
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
        </div>
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
