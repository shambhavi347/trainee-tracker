import React from "react";
import "../../CSS/Admin/CoordinatorAdmin.css";

const CoordAssign = ({ coord }) => {
  //   console.log(coord);
  return (
    <>
      <div className="">
        <h3 className="title-coord">Trainee-Coordinator Assignment</h3>
        <div className="coordAssign">
          {coord.salutation} {coord.name} Email: {coord.email} Phone:
          {coord.phone}
        </div>
      </div>
    </>
  );
};

export default CoordAssign;
