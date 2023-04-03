import React, { useState } from "react";
import { acceptTrainee, rejectTrainee } from "../../service/api";
import { expand, cancel, resume } from "../../Images/Images";
import { useNavigate } from "react-router-dom";
const PendingStudent = ({ stud, btnClicked }) => {
  // console.log(stud);
  // let navigate = useNavigate();
  const [expnd, setExpnd] = useState(false);
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
  // const downloadPdf = async () => {
  //   try {
  //     const response = await fetch(`/api/files/${stud.fileID}`);
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "download.pdf";
  //     a.click();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      <div className="stud-bdy">
        <div className="inst-expnd">
          <button
            className="btn-expnd"
            onClick={() => {
              setExpnd(true);
            }}
          >
            <img src={expand} alt="" className="img-expnd" />
          </button>
          {stud.fileID ? (
            <>
              {/* <div onClick={downloadPdf}>Download</div> */}
              <button className="btn-resume" onClick={ViewPdf}>
                Resume
                {/* style={{ backgroundColor: "#eeeeee" }} */}
                {/* <img src={resume} alt="" className="img-expnd" /> */}
              </button>
            </>
          ) : null}
        </div>
        <div className="stud-first">
          {stud.prefix} {stud.first_name} {stud.middle_name} {stud.last_name}
        </div>
        <div className="stud-second">{stud.instname}</div>
        <div className="stud-third">{stud.stream}</div>
        <div className="stud-fourth">
          <div className="stud-sem">Sem:{stud.semester}</div>
          <div className="stud-course">{stud.course}</div>
          <div className="stud-year">{stud.passout_year}</div>
        </div>
        <div className="stud-fifth">
          {stud.status === "selection pending" ? (
            <>
              <div className="inst-accpt">
                <button className="btn-accpt" onClick={acceptStud}>
                  Accept
                </button>
              </div>
              <div className="inst-reject">
                <button className="btn-reject" onClick={rejectStud}>
                  Reject
                </button>
              </div>
            </>
          ) : stud.status === "selection accept" ? null : (
            <>
              <div className="inst-accpt">
                <button className="btn-accpt" onClick={acceptStud}>
                  Accept
                </button>
              </div>
            </>
          )}
        </div>
        {expnd ? (
          <div className="expanded-div">
            <button onClick={() => setExpnd(false)} className="expnd-cancel">
              <img className="expnd-img" src={cancel} alt="" />
            </button>
            <div className="info-outer">
              <div className="info">
                <div className="info-first">
                  {stud.prefix} {stud.first_name} {stud.last_name}
                </div>
                <div className="info-second">
                  <div className="info-type">Gender: {stud.gender}</div>
                  <div className="info-rating">
                    {" "}
                    DOB: {date.toLocaleDateString("en-US")}
                  </div>
                </div>
                <div className="info-third">
                  <div className="info-instname">
                    Institue Name: {stud.instname}{" "}
                  </div>
                  <div className="info-email">Course: {stud.course}</div>
                  <div className="info-email">Stream: {stud.stream}</div>
                  <div className="info-email">Semester: {stud.semester}</div>
                  <div className="info-email">CGPA: {stud.cgpa}</div>
                </div>
                <div className="info-fourth">
                  <div className="info-email">Email: {stud.email}</div>
                  <div className="info-phone">Phone No : {stud.phone_no}</div>
                </div>
                <div className="info-fifth">
                  <div className="info-month">
                    Familiar Technologies <br />
                    <br />
                    {stud.famtech.map((val) => (
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
                    {stud.inttech.map((val) => (
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
      {/* className="inst-bdy" */}
      {/* <div>
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
      </div> */}
    </>
  );
};

export default PendingStudent;
