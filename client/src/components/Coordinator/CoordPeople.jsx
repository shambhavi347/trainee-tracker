import React, { useEffect, useState } from "react";
import "../../CSS/Coordinator/CoordPeople.css";
import { getCoordName, getTraineeDeets } from "../../service/api";
import { expand, cancel } from "../../Images/Images";

var trainee_tile_div = {
  /* background-color: #eeeeee; */
  padding: "2% 15%",
};

var trainee_tile = {
  width: "100%",
  border: "1px #00adb5 solid",
  margin: "1%",
  padding: "2% 2%",
  borderRadius: "10px",
  backgroundColor: "#393e46",
  color: "#eeeeee",
};
var trainee_tile_div1 = {
  padding: "2%",
  width: "49%",
  backgroundColor: "#222831",
  float: "left",
  borderRadius: "10px",
  border: "1px #00adb5 solid",
};
var trainee_tile1 = {
  width: "100%",
  border: "1px #00adb5 solid",
  margin: "2% 1%",
  padding: "4%",
  borderRadius: "10px",
  backgroundColor: "#393e46",
  color: "#eeeeee",
  // float: "right",
};

var group_tile_div1 = {
  padding: "2%",
  width: "49%",

  backgroundColor: "#222831",
  float: "right",
  borderRadius: "10px",
  border: "1px #00adb5 solid",
};
var group_tile1 = {
  width: "100%",
  border: "1px #00adb5 solid",
  margin: "2% 1%",
  padding: "4%",
  borderRadius: "10px",
  backgroundColor: "#393e46",
  color: "#eeeeee",
  // float: "right",
};
const CoordPeople = () => {
  var date, dob1;
  const [mentor, setMentor] = useState([]);
  const [traineeList, setTraineeList] = useState([]);
  const [trainee, setTrainee] = useState([]);
  const [traineeEx, setTraineeEx] = useState(false);
  const [traineeVal, setTraineeVal] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [traineeTileDiv, setTraineeTileDiv] = useState(trainee_tile_div);
  const [traineeTile, setTraineeTile] = useState(trainee_tile);
  const [count, setCount] = useState(1);
  const [groups, setGroups] = useState([]);
  const [value, setValue] = useState({});
  // const [groupss, setGroupss] = useState([]);
  // const [groupTileDiv, setGroupTileDiv] = useState(group_tile_div1);

  //get coordinator details
  useEffect(() => {
    const fetchCoordName = async () => {
      try {
        const data = await getCoordName();
        if (data) setMentor(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoordName();
  }, [mentor]);
  //get trainee details + list
  useEffect(() => {
    const fetchCoordName = async () => {
      try {
        const data = await getTraineeDeets();
        if (data) {
          // console.log(data);
          setTraineeList(data);
          if (trainee.length === 0 && groupList.length === 0)
            setTrainee(traineeList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoordName();
  }, [traineeList]);

  //expand button function

  const handleExpandTrainee = (val) => {
    setTraineeEx(true);
    setTraineeVal(val);

    // console.log(val);
  };
  if (traineeVal) {
    date = new Date(traineeVal.dob);
    dob1 = date.toLocaleDateString("en-US");
  }

  // useEffect(() => {}, [groupList]);

  //add trainee to group list on click of button
  const addGroup = (val) => {
    // setGroupTileDiv(group_tile_div1);

    setTraineeTileDiv(trainee_tile_div1);
    setTraineeTile(trainee_tile1);
    setValue({ val });
    setValue({ ...val, group: "created" });
    setTrainee(trainee.filter((item) => item._id !== val._id));
    setGroupList([...groupList, val]);
    // setGroupList([])
  };
  console.log(value);
  console.log(groupList);
  //remove trainee from group list and add it back to trainee
  const removeGroup = (val) => {
    setGroupList(groupList.filter((item) => item._id !== val._id));
    setTrainee([...trainee, val]);
  };

  //change css back when file groupList is empty
  useEffect(() => {
    if (groupList.length === 0) {
      setTraineeTileDiv(trainee_tile_div);
      setTraineeTile(trainee_tile);
    }
  }, [groupList]);

  let groupss = [{}];
  const createGroup = () => {
    // groupList.map((val) =>

    //   // setGroupList([...groups, val.group:"created"])
    //   // setGroupList(prevState => {
    //   //   // Object.assign would also work
    //   //   return {...prevState, val.group: "created"};
    //   // });
    // );
    let name1 = "group " + count;
    const groupee = {
      name: "",
      members: "",
    };
    setCount((prev) => prev + 1);

    groupee["name"] = name1;
    groupee["members"] = groupList;
    groupss.push(groupee);

    // setSearches((searches) => [...searches, query]);
    setGroups([...groups, groupee]);

    setGroupList([]);
  };
  // groups.map((val) => console.log(val));
  // console.log(groups);

  return (
    <>
      <div className="coord-people-divUp">
        <div className="coord-div">
          <h2 className="coordTitle">Coordinator Name</h2>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.4" }} />
          <div className="coord-name">
            {mentor.salutation} {mentor.first_name} {mentor.middle_name}{" "}
            {mentor.last_name}
          </div>
        </div>
        <div className="trainees-div">
          <h2 className="traineeTitle">
            <div className="titleTrainee">Trainee </div>
            {groupList.length ? (
              <button className="create-grp" onClick={createGroup}>
                Create Group
              </button>
            ) : null}
            <div className="traineeStrength">{trainee.length}</div>
          </h2>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.4" }} />
          <div style={traineeTileDiv}>
            {trainee.length === 0 ? (
              <>
                <div>No Students Assigned</div>
              </>
            ) : null}
            {trainee.map((val) => (
              <>
                <div style={traineeTile}>
                  {val.prefix} {val.first_name} {val.middle_name}{" "}
                  {val.last_name}
                  {val.group ? null : (
                    <>
                      <div
                        className="check-div-coord"
                        onClick={() => addGroup(val)}
                      >
                        <img
                          src="./Images/check.png"
                          alt=""
                          className="check-img"
                        />
                      </div>
                    </>
                  )}
                  <div className="expnd-img-coord">
                    <img
                      src={expand}
                      alt=""
                      className="downarrow-img "
                      onClick={() => handleExpandTrainee(val)}
                    />
                  </div>
                </div>
                {/* <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} /> */}
              </>
            ))}
          </div>
          {groupList.length ? (
            <>
              {/* style={group_tile1} */}
              <div style={group_tile_div1}>
                {groupList.map((val) => (
                  <>
                    {/* <div >{Val.first_name}</div> */}
                    <div style={group_tile1}>
                      {val.prefix} {val.first_name} {val.middle_name}{" "}
                      {val.last_name}
                      <div
                        className="check-div-coord"
                        onClick={() => removeGroup(val)}
                      >
                        <img
                          src="./Images/remove.png"
                          alt=""
                          className="check-img"
                        />
                      </div>
                      <div className="expnd-img-coord">
                        <img
                          src={expand}
                          alt=""
                          className="downarrow-img "
                          onClick={() => handleExpandTrainee(val)}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : null}
        </div>
        {groups.length === 0 ? null : (
          <>
            {" "}
            <h2 className="traineeTitle">
              <div className="titleTrainee">Groups </div>
              {/* {groupList.length ? ( */}
              <button className="create-grp" onClick={createGroup}>
                Submit
              </button>
              {/* // ) : null} */}
              <div className="traineeStrength">{groups.length}</div>
            </h2>
            <hr style={{ backgroundColor: "#393e46", opacity: "0.4" }} />{" "}
            {groups.map((val) => (
              <div>
                {/* {console.log(val)} */}
                {val.name}
                {/* {(val.group = "added")} */}
                {/* {val.members.map((value) => console.log(value))} */}
                {val.members.map((value) => (
                  <div>
                    {/* {console.log(value)} */}
                    {value.salutation} {value.first_name} {value.middle_name}{" "}
                    {value.last_name}
                    <div
                      className="check-div-coord"
                      // onClick={() => addGroup(val)}
                    >
                      <img
                        src="./Images/check.png"
                        alt=""
                        className="check-img"
                      />
                    </div>
                    {/* <div className="expnd-img-coord">
                      <img
                        src={expand}
                        alt=""
                        className="downarrow-img "
                        // onClick={() => handleExpandTrainee(val)}
                      />
                    </div> */}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        {/* <div className="groups-div">Groups</div> */}
        {traineeEx ? (
          <div className="expanded-div">
            <button
              onClick={() => setTraineeEx(false)}
              className="expnd-cancel"
            >
              <img className="expnd-img" src={cancel} alt="" />
            </button>
            <div className="info-outer">
              <div className="info">
                <div className="info-first">
                  {traineeVal.prefix} {traineeVal.first_name}{" "}
                  {traineeVal.middle_name} {traineeVal.last_name}
                </div>
                <div className="info-second">
                  <div className="info-type">Gender: {traineeVal.gender}</div>
                  <div className="info-rating"> DOB: {dob1}</div>
                </div>
                <div className="info-third">
                  <div className="info-instname">
                    Institue Name: {traineeVal.instname}{" "}
                  </div>
                  <div className="info-email">Course: {traineeVal.course}</div>
                  <div className="info-email">Stream: {traineeVal.stream}</div>
                  <div className="info-email">
                    Semester: {traineeVal.semester}
                  </div>
                  <div className="info-email">CGPA: {traineeVal.cgpa}</div>
                </div>
                <div className="info-fourth">
                  <div className="info-email">Email: {traineeVal.email}</div>
                  <div className="info-phone">
                    Phone No : {traineeVal.phone_no}
                  </div>
                </div>
                <div className="info-fifth">
                  <div className="info-month">
                    Familiar Technologies <br />
                    <br />
                    {traineeVal.famtech.map((val) => (
                      <>
                        {val}
                        <hr
                          style={{ backgroundColor: "#393e46", opacity: "0.2" }}
                        />
                      </>
                    ))}
                  </div>
                  <div className="info-duration">
                    Interseted Technologies
                    <br />
                    <br />
                    {traineeVal.inttech.map((val) => (
                      <>
                        {val}
                        <hr
                          style={{ backgroundColor: "#393e46", opacity: "0.2" }}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CoordPeople;
