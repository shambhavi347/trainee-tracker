import React, { useEffect, useState } from "react";
import "../../CSS/Coordinator/CoordPeople.css";
import {
  getCoordName,
  getTraineeDeets,
  postGroup,
  getGroups,
  removeGroup,
} from "../../service/api";
import { expand, cancel } from "../../Images/Images";

var trainee_tile_div = {
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
  const [groupName, setGroupName] = useState(false);
  const [count, setCount] = useState("");
  const [groups, setGroups] = useState([]);
  // const [value, setValue] = useState({});
  const [groupDelete, setGroupDelete] = useState(0);
  // const [misCnt, setMisCnt] = useState("");
  // const groupNo = [];

  //get group details
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        if (data) {
          setGroups(data);
          // groups.map((val) => groupNo.push(val.name));
          // console.log(groupNo);
          // const cnt = groupNo[groupNo.length - 1];
          // console.log(cnt);
          // if (cnt === 2) {
          //   setMisCnt(cnt);
          // } else {
          //   var nums = parseInt(groupNo);
          //   console.log(nums);
          //   var missing = new Array();
          //   for (let i = 1; i <= cnt; i++) {
          //     if (!nums.includes(i)) {
          //       // Checking whether i(current value) present in num(argument)
          //       missing.push(i); // Adding numbers which are not in num(argument) array
          //     }
          //   }

          //   if (missing.length !== groupNo.length) console.log(missing);
          // }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroups();
    // setCount(groups.length + 1);
  }, [groups]);

  //get coordinator details
  useEffect(() => {
    const fetchCoordName = async () => {
      try {
        const data = await getCoordName();
        if (data) setMentor(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoordName();
  }, [mentor]);

  //get trainee details + list
  useEffect(() => {
    const fetchTraineeList = async () => {
      try {
        const data = await getTraineeDeets();
        if (data) {
          setTraineeList(data);
          if (trainee.length === 0 && groupList.length === 0) {
            setTrainee(traineeList);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTraineeList();
  }, [traineeList]);

  //expand button function
  const handleExpandTrainee = (val) => {
    setTraineeEx(true);
    setTraineeVal(val);
  };
  if (traineeVal) {
    date = new Date(traineeVal.dob);
    dob1 = date.toLocaleDateString("en-US");
  }

  //add trainee to group list on click of button
  const addGroup = (val, index) => {
    let newArr = [...trainee];
    newArr[index].group = "created";
    setTraineeTileDiv(trainee_tile_div1);
    setTraineeTile(trainee_tile1);
    setTrainee(newArr);
    setGroupList([...groupList, val]);
  };

  //remove trainee from group list and add it back to trainee
  const removeGroups = (val, index) => {
    let newArr = [...trainee];
    console.log(newArr);
    newArr[index].group = "null";
    setTrainee(newArr);
    setGroupList(groupList.filter((item) => item._id !== val._id));

    // setTrainee([...trainee, val]);
  };

  //change css back when file groupList is empty
  useEffect(() => {
    if (groupList.length === 0) {
      setTraineeTileDiv(trainee_tile_div);
      setTraineeTile(trainee_tile);
    }
  }, [groupList]);

  // let groupss = [{}];
  // const createGroup = () => {
  //   let name1 = "group " + count;
  //   const groupee = {
  //     name: "",
  //     members: "",
  //   };
  //   setCount((prev) => prev + 1);

  //   groupee["name"] = name1;
  //   groupee["members"] = groupList;
  //   groupss.push(groupee);

  //   setGroups([...groups, groupee]);

  //   setGroupList([]);
  // };
  // console.log(groups);
  // const removeGroupMem = (value, index, memkey) => {
  //   const id = value._id;
  //   console.log("ID: " + id);

  //   let newArr = [...trainee];

  //   newArr.map((val) => {
  //     if (val._id === id) val.group = "null";
  //   });
  //   console.log("Index: " + index + " " + memkey);
  //   setTrainee(newArr);

  //   let groupArr = [...groups];
  //   console.log(groupArr[index].members[memkey].first_name);
  //   groupArr[index].members.splice(memkey, 1);
  //   setGroups(groupArr);
  //   console.log(groupArr);
  // };

  //used to remove single individual from group but now depricated
  // useEffect(() => {

  //   // groups.map((val) => {
  //   //   if (val.members.length === 0) {
  //   //     const indx = groups.indexOf(val);
  //   //     groups.splice(indx, 1);
  //   //   }
  //   // });
  // }, [groups]);

  //create an group

  const postData = async (e) => {
    e.preventDefault();

    let memId = [];
    let name1 = count;

    groupList.map((val) => memId.push(val._id));

    const data = await postGroup({
      members: memId,
      name: name1,
    });

    if (data.error) {
      window.alert("Groups Creation Failed " + data.error);
    }
    if (data.message === "saved") {
      setGroupList([]);
      // console.log("HI");
      // setCount((prev) => prev + 1);
    }
  };

  //delete group

  const removeData = async (val, mem) => {
    try {
      const studId = [];
      // console.log(val);
      mem.map((val) => studId.push(val._id));
      // console.log(studId);
      const data = await removeGroup({ groupId: val, studID: studId });
      // console.log(data);
      if (data.message) setGroupDelete(1);
    } catch (error) {
      console.log(error);
    }
  };

  //set green tick back on an trainee whenver a group is deleted
  useEffect(() => {
    if (groupDelete === 1) {
      setGroupDelete(2);
      // setGroupDelete(false);
    }
    if (groupDelete === 2) {
      setTrainee(traineeList);
      setGroupDelete(3);
    }
    // setGroupDelete(false);
  }, [groups]);
  const handleSubmit = () => {};
  // console.log(count);
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
              <button className="create-grp" onClick={() => setGroupName(true)}>
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
            {trainee.map((val, index) => (
              <>
                <div style={traineeTile}>
                  {val.prefix} {val.first_name} {val.middle_name}{" "}
                  {val.last_name}
                  {/* Group: {val.group} */}
                  {val.group === "null" ? (
                    <>
                      <div
                        className="check-div-coord"
                        onClick={() => addGroup(val, index)}
                      >
                        <img
                          src="./Images/check.png"
                          alt=""
                          className="check-img"
                        />
                      </div>
                    </>
                  ) : null}
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
                {groupList.map((val, index) => (
                  <>
                    {/* <div >{Val.first_name}</div> */}
                    <div style={group_tile1}>
                      {val.prefix} {val.first_name} {val.middle_name}{" "}
                      {val.last_name}
                      <div
                        className="check-div-coord"
                        onClick={() => removeGroups(val, index)}
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
              {/* <button className="create-grp" onClick={postData}>
                Submit
              </button> */}
              {/* // ) : null} */}
              <div className="traineeStrength">{groups.length}</div>
            </h2>
            <hr style={{ backgroundColor: "#393e46", opacity: "0.4" }} />{" "}
            {groups.map((val, index) => (
              <div>
                Group {val.name}
                <div
                  className="check-div-coord"
                  onClick={() => removeData(val._id, val.members)}
                  // onClick={() => removeGroupMem(value, index, memkey)}
                  // onClick={() => addGroup(val)}
                >
                  <img src="./Images/remove.png" alt="" className="check-img" />
                </div>
                {val.members.map((value, memkey) => (
                  <div>
                    {/* {console.log(value)} */}
                    {value.salutation} {value.first_name} {value.middle_name}{" "}
                    {value.last_name}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        {groupName ? (
          <>
            <div className="expanded-div">
              <div className="groupNo">
                <button
                  className="close-btn-group"
                  onClick={() => setGroupName(false)}
                >
                  <img
                    className="img-close"
                    src={cancel}
                    alt="close model box"
                  />
                </button>
                <div className="form-group">
                  <div className="titlegroupName">Add Group No</div>
                  <input
                    className="grpN-input"
                    type="number"
                    step="1"
                    placeholder="Group No..."
                    value={count}
                    onChange={handleSubmit}
                  />
                  <button className="grpN-submit">Submit</button>
                </div>
              </div>
            </div>
          </>
        ) : null}
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
