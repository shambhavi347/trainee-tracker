import React, { useState } from "react";
import { expand, cancel } from "../../Images/Images";
import { acceptInsitute, rejectInsitute } from "../../service/api";

const PendingInst = ({ inst, btnClicked }) => {
  const handleAccept = async () => {
    try {
      // console.log(email);
      const res = await acceptInsitute({ email: inst.email });
      // window.alert(res);
      console.log("accept btn");
      btnClicked("accept");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      // console.log(email);
      await rejectInsitute({ email: inst.email });
      console.log("reject btn");
      btnClicked("accept");
    } catch (error) {
      console.log(error);
    }
  };
  const [expnd, setExpnd] = useState("none");
  return (
    <>
      <div className="inst-bdy">
        <div className="inst-expnd">
          <button
            className="btn-expnd"
            onClick={() => {
              setExpnd("block");
              //   setInst(inst);
            }}
          >
            <img src={expand} alt="" className="img-expnd" />
          </button>
        </div>
        <div className="inst-first">{inst.name}</div>
        <div className="inst-second">
          <div className="inst-month">{inst.month}</div>
          <div className="inst-rating">{inst.rating}</div>
          <div className="inst-duration">{inst.duration}</div>
        </div>
        <div className="inst-third">
          {inst.status === "pending" ? (
            <>
              <div className="inst-accpt">
                <button className="btn-accpt" onClick={handleAccept}>
                  Accept
                </button>
              </div>
              <div className="inst-reject">
                <button className="btn-reject" onClick={handleReject}>
                  Reject
                </button>
              </div>
            </>
          ) : inst.status === "accept" ? null : (
            <>
              <div className="inst-accpt">
                <button className="btn-accpt" onClick={handleAccept}>
                  Accept
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="expanded-div" style={{ display: expnd }}>
        <button onClick={() => setExpnd("none")} className="expnd-cancel">
          <img className="expnd-img" src={cancel} alt="" />
        </button>
        <div className="info-outer">
          <div className="info">
            <div className="info-first">{inst.name}</div>
            <div className="info-second">
              <div className="info-type">Institute Type : {inst.type}</div>
              <div className="info-rating"> NAAC Rating: {inst.rating}</div>
            </div>
            <div className="info-third">
              {inst.street ? <div>Street: {inst.street} </div> : null}
              <div>City: {inst.city}</div>
              <div>State:{inst.state}</div>
              <div>Country: {inst.country}</div>
              <div>Zip code :{inst.zipcode}</div>
            </div>
            <div className="info-fourth">
              <div className="info-email">Email : {inst.email}</div>
              <div className="info-phone">Phone No : {inst.phoneno}</div>
            </div>
            <div className="info-fifth">
              <div className="info-month">
                Internship Start Month: {inst.month}
              </div>
              <div className="info-duration">
                Insternship Duration : {inst.duration}
              </div>
            </div>
            <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />
            <div className="info-coord-title">
              Institute Coordinator's Details
            </div>
            <div className="info-sixth">Name : {inst.coordName}</div>
            <div className="info-seventh">
              <div className="info-coor-email">Email: {inst.coordEmail}</div>
              <div className="info-coor-phone">Phone: {inst.coordPhone}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingInst;
