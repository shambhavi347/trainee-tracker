import React, { useEffect, useState } from "react";

import "../../CSS/Admin/TraineeAdmin.css";
import { getStudent } from "../../service/api";
import PendingStudent from "./PendingStudent";

const TraineeAdmin = () => {
  const [text, setText] = useState("");
  const [disPend, setDisPend] = useState(true);
  const [student, setStudent] = useState([]);
  const [studs, setStuds] = useState([]);
  const [sortdrop, setSortdrop] = useState(false);
  const [sortvalue, setSortvalue] = useState("Sort By CGPA");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudent();
      setStudent(data);
      if (studs.length == 0) getStudent(student);
    };
    fetchData();
  }, [student]);

  //Search Song
  useEffect(() => {
    // callInst();
    let filteredData1 = "";
    // if (countSrch == 1) org = institute;
    // countSrch += 1;
    // console.log("prev" + org);
    if (text.length == 0) {
      // setInstitute(insti);
      setStuds(student);
    } else {
      filteredData1 = studs.filter((user) =>
        user.first_name.toLowerCase().includes(text.toLowerCase())
      );
      // setInstitute(filteredData1);
      setStuds(filteredData1);
    }
  }, [text]);

  //sort filter
  useEffect(() => {
    let strDescending = [];
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...studs].sort((a, b) => b.rvalue - a.rvalue);
      // setstuds(strDescending);
      setStuds(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...studs].sort((a, b) => a.rvalue - b.rvalue);
      // setInstitute(strDescending);
      setStuds(strDescending);
    } else {
      // setInstitute(insti);
      setStuds(student);
    }
  }, [sortdrop]);

  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">
          <div className="btns-inst">
            <button
              className="accepted-btn"
              onClick={() => {
                // setDisAccept(true);
                setDisPend(false);
                // setDisReject(false);
                // handleAcceptList();
              }}
            >
              Accepted List
            </button>
            <button
              className="rejected-btn"
              onClick={() => {
                // setDisAccept(false);
                setDisPend(false);
                // setDisReject(true);
                // handleAcceptList();
              }}
            >
              Rejected List
            </button>
          </div>

          <div className="search-bar">
            <input
              className="search-text"
              type="text"
              name=""
              id=""
              placeholder="Search by name..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />
        </div>
        <div className="institute-panel">
          {disPend ? (
            studs.map((val, key) => <PendingStudent stud={val} />)
          ) : (
            <>No application as of yet</>
          )}
        </div>
      </div>
    </>
  );
};

export default TraineeAdmin;
