import React from "react";
import { acceptTrainee, rejectTrainee } from "../../service/api";

const PendingStudent = ({ stud }) => {
  const date = new Date(stud.dob);
  const acceptStud = async () => {
    try {
      const res = await acceptTrainee({ email: stud.email });
      window.alert(res);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectStud = async () => {
    try {
      const res = await rejectTrainee({ email: stud.email });
      window.alert(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
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
          <div>{stud.passout_year}</div>
        </div>
        <div>
          {stud.famtech.map((val) => (
            <div>{val}</div>
          ))}
          {stud.inttech.map((val) => (
            <div>{val}</div>
          ))}
        </div>
        <div>
          <button onClick={acceptStud}>Accept</button>
          <button onClick={rejectStud}>Reject</button>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default PendingStudent;
