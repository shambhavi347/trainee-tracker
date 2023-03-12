import React from "react";
import { acceptTrainee, rejectTrainee } from "../../service/api";
import { expand } from "../../Images/Images";

const PendingStudent = ({ stud, btnClicked }) => {
  const date = new Date(stud.dob);
  const acceptStud = async () => {
    try {
      const res = await acceptTrainee({ email: stud.email });
      window.alert(res);
      btnClicked("accept");
    } catch (error) {
      console.log(error);
    }
  };
  const rejectStud = async () => {
    try {
      const res = await rejectTrainee({ email: stud.email });
      window.alert(res);
      btnClicked("accept");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    //add button on condition of accepte and rejected students
    <>
      {/* className="inst-bdy" */}
      <div>
        <div>
          <button className="btn-expnd">
            <img src={expand} alt="" className="img-expnd" />
          </button>
        </div>
        <div>
          {stud.prefix} {stud.first_name} {stud.last_name}
        </div>
        <div>
          <div>{stud.email}</div>
          <div>{stud.phone_no}</div>
        </div>
        <div>
          <div>DOB:{date.toLocaleDateString("en-US")}</div>
          <div>{stud.gender}</div>
        </div>
        <div>
          <div>{stud.course}</div>
          <div>{stud.stream}</div>
          <div>{stud.semester}</div>
          <div>{stud.cgpa}</div>
          <div>{stud.passout_year}</div>
        </div>

        <div>
          Familiar Technology
          {stud.famtech.map((val) => (
            <div>{val}</div>
          ))}
        </div>

        <div>
          Interested Technology
          {stud.inttech.map((val) => (
            <div>{val}</div>
          ))}
        </div>
        <div>
          <button onClick={acceptStud}>Accept</button>
          <button onClick={rejectStud}>Reject</button>
        </div>
      </div>
    </>
  );
};

export default PendingStudent;
