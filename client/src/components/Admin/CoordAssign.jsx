import React, { useEffect, useState } from "react";
import "../../CSS/Admin/CoordinatorAdmin.css";
import { arrowDown, check } from "../../Images/Images";
import {
  getTrainees,
  getCoordClass,
  removeTrainee,
  postClass,
} from "../../service/api";

const CoordAssign = ({ coord }) => {
  //   console.log(coord);
  const [studentList, setStudentList] = useState([]);
  const [studList, setStudList] = useState([]);
  const [group, setGroup] = useState([]);
  const [classGroup, setClassGroup] = useState([]);
  const [removeBtn, setRemoveBtn] = useState(false);
  let trainee_id = [];
  // const [editBtn, setEditBtn] = useState(false);

  useEffect(() => {
    try {
      const getTainee = async () => {
        const res = await getTrainees();
        setStudList(res);
        if (studentList.length === 0 && group.length === 0) {
          setStudentList(studList);
        }
        if (removeBtn) setStudentList(studList);
      };
      getTainee();
    } catch (error) {
      console.log(error);
    }
  }, [studList]);
  useEffect(() => {
    try {
      const getClassDeets = async () => {
        const data = await getCoordClass({ coordId: coord._id });
        setClassGroup(data);
      };
      getClassDeets();
    } catch (error) {
      console.log(error);
    }
  }, [classGroup]);

  useEffect(() => {
    group.map(
      (val) => {
        console.log(val);
      }
      // setStudentList(studentList.filter((item) => item._id !== val._id))
    );
  }, [group]);
  console.log("students: " + studentList);
  useEffect(() => {
    // console.log("WTF");
    classGroup.map((val) =>
      setGroup(group.filter((item) => item._id !== val._id))
    );
  }, [classGroup]);
  // console.log("Student : " + studentList);
  // console.log("group: " + group);
  // console.log("Class: " + classGroup);
  const handleTrainee = (val) => {
    console.log("hellllo   WTF");
    setStudentList(studentList.filter((item) => item._id !== val._id));
    setGroup([...group, val]);
    // trainee_id.push(val._id);
  };
  const handleRemove = (val) => {
    setGroup(group.filter((item) => item._id !== val._id));
    setStudentList([...studentList, val]);
  };
  const traineeRemove = async (val) => {
    try {
      const data = await removeTrainee({ trainee_id: val._id });
      console.log(data);
      setRemoveBtn(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      group.map((val) => {
        trainee_id.push(val._id);
      });
      const data = await postClass({
        trainees: trainee_id,
        coord_id: coord._id,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="coordAssign-div">
        <div className="coordDeets">
          <div className="title-coord">
            {coord.salutation} {coord.name}
          </div>
          <div className="coordPhone">
            Phone:
            {coord.phone}
          </div>
          <div className="coordEmail">Email: {coord.email}</div>
        </div>
        <hr
          style={{
            backgroundColor: "#393e46",
            opacity: "0.2",
            marginTop: "2%",
            marginBottom: "1%",
          }}
        />
        <div className="assignPannel">
          <div className="filters-outer">
            <div className="filters">Filters</div>
          </div>
          <div className="studentList-outer">
            <div className="studentList">
              List of Student
              {studentList.map((val) => (
                <div className="name-title">
                  <div className="check-div" onClick={() => handleTrainee(val)}>
                    <img
                      src="./Images/check.png"
                      alt=""
                      className="check-img"
                    />
                  </div>
                  <div className="down-btn" id="arrowDown-btn">
                    <img src={arrowDown} alt="" className="downarrow-img" />
                  </div>
                  {val.prefix} {val.first_name} {val.middle_name}{" "}
                  {val.last_name}
                </div>
              ))}
            </div>
          </div>
          <div className="classPannel-outer">
            <div className="classPannel">
              Class Pannel
              {classGroup ? (
                <>
                  {classGroup.map((val) => (
                    <div className="name-title">
                      <div className="check-div">
                        <img
                          src="./Images/remove.png"
                          alt=""
                          className="check-img"
                          onClick={() => traineeRemove(val)}
                        />
                      </div>
                      <div className="down-btn" id="arrowDown-btn">
                        <img src={arrowDown} alt="" className="downarrow-img" />
                      </div>
                      {val.prefix} {val.first_name} {val.middle_name}{" "}
                      {val.last_name}
                    </div>
                  ))}
                </>
              ) : null}
              {group ? (
                <>
                  <button className="submit-btn" onClick={handleSubmit}>
                    Submit
                  </button>
                  {group.map((val) => (
                    <div className="name-title">
                      <div>Group</div>
                      <div className="check-div">
                        <img
                          src="./Images/remove.png"
                          alt=""
                          className="check-img"
                          onClick={() => handleRemove(val)}
                        />
                      </div>
                      <div className="down-btn" id="arrowDown-btn">
                        <img src={arrowDown} alt="" className="downarrow-img" />
                      </div>
                      {val.prefix} {val.first_name} {val.middle_name}{" "}
                      {val.last_name}
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoordAssign;
