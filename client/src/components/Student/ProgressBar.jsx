import React, { useState } from "react";

const ProgressBar = () => {
  const [timeline, setTimeline] = useState([
    { name: "SRS", deadline: "01/02/2023" },
    {
      name: "SDS",
      deadline: "20/02/2023",
    },
    { name: "Coding", deadline: "31/04/2023" },
    { name: "Report", deadline: "10/05/2023" },
  ]);
  return (
    <div className="progress-divUp">
      {/* <div className="bar"> */}
      {timeline.map((val) => (
        <div className="progres-name">
          <div className="circle">{val.name}</div>
          <h3 className="deadline-div">{val.deadline}</h3>
        </div>
      ))}
    </div>
    // </div>
  );
};

export default ProgressBar;
