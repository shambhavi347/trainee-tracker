import React, { useEffect, useState } from "react";

import "../../CSS/Admin/TraineeAdmin.css";
import { getStudent } from "../../service/api";
import PendingStudent from "./PendingStudent";

const TraineeAdmin = () => {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudent();
      setStudent(data);
    };
    fetchData();
  }, [student]);

  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">Filters</div>
        <div className="institute-panel">
          {student ? (
            student.map((val, key) => <PendingStudent stud={val} />)
          ) : (
            <>No application as of yet</>
          )}
        </div>
      </div>
    </>
  );
};

export default TraineeAdmin;
