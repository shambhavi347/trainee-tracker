import React from "react";
import { acceptTrainee, rejectTrainee } from "../../service/api";
import { expand } from "../../Images/Images";
import { useNavigate } from "react-router-dom";
const PendingStudent = ({ stud, btnClicked }) => {
  console.log(stud);
  let navigate = useNavigate();
  const date = new Date(stud.dob);
  const acceptStud = async () => {
    try {
      const res = await acceptTrainee({ email: stud.email });
      // window.alert(res);
      console.log("accept btn");
      btnClicked("accept");
    } catch (error) {
      console.log(error);
    }
  };
  const rejectStud = async () => {
    try {
      const res = await rejectTrainee({ email: stud.email });
      // window.alert(res);
      console.log("reject btn");
      btnClicked("accept");
    } catch (error) {
      console.log(error);
    }
  };
  const downloadPdf = async () => {
    try {
      const response = await fetch(`/api/files/${stud.fileID}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "download.pdf";
      a.click();
    } catch (error) {
      console.log(error);
    }
  };

  const ViewPdf = async () => {
    //   try {
    try {
      await fetch(`/api/files/view/${stud.fileID}`)
        .then((res) => {
          // convert the response to a blob
          return res.blob();
        })
        .then((blob) => {
          // create a URL for the blob
          const url = URL.createObjectURL(blob);

          // create a new window to display the PDF
          const newWindow = window.open();
          newWindow.document.write(
            `<iframe src="${url}" width="100%" height="100%"></iframe>`
          );
        });
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
          {stud.fileID ? (
            <>
              <div onClick={downloadPdf}>Download</div>
              <div onClick={ViewPdf}>View</div>
            </>
          ) : null}
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
