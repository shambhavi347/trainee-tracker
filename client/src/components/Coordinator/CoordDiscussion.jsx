import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
// import "../../CSS/Coordinator/CoordDiscussion.css";
import "../../CSS/Coordinator/DiscCoord.css";
import { GetDetails, getCoordName } from "../../service/api";

const CoordDiscussion = () => {
  const [mentor, setMentor] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [details, setDetails] = useState([]);
  const [nameMentor, setNameMentor] = useState("");
  const [user, setUser] = useState({
    message: "",
  });
  let initial = [];
  //get all the messages
  useEffect(() => {
    const D_data = async () => {
      const response = await GetDetails();
      const newArray = response.slice().reverse();
      setDetails(newArray);
    };
    D_data();
  }, [details]);

  //create array of initials
  details.map((val) => {
    const init = val.sender_name.split(" ");
    const initialMsg = init.map((initials) => initials[0]).join("");
    initial.push(initialMsg);
  });

  //get coordinator details for initial
  let initMentor = [];
  useEffect(() => {
    const fetchCoordName = async () => {
      try {
        const data = await getCoordName();
        if (data) {
          setMentor(data);
          initMentor.push(mentor.first_name);
          if (mentor.middle_name) initMentor.push(mentor.middle_name);
          if (mentor.last_name) initMentor.push(mentor.last_name);
          setNameMentor(initMentor.map((init) => init[0]).join(""));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoordName();
  }, [mentor]);

  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

    console.log(name, value);
  };

  const postData = async (e) => {
    e.preventDefault();
    const { message } = user;

    const res = await fetch("/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });
    const data = await res.json();
    // console.log(data);

    if (data.error) {
      window.alert(data.error);
      console.log("Error");
    } else {
      console.log("Message Sent !!");
      setUser("");
      setShowInput(false);
    }
  };

  return (
    <>
      <div className="discUp">
        <div className="announceBox">
          {showInput ? (
            <div className="">
              <TextField
                id="filled-multiline-flexible1"
                multiline
                label="Announce Something to class"
                variant="filled"
                className="announceMsg"
                type="text"
                placeholder="write something"
                name="message"
                value={user.message}
                autoComplete="off"
                onChange={handleChange}
              />
              <div className="annBtnDiv">
                <div>
                  <Button
                    id="cancelBtnDisc"
                    onClick={() => {
                      setUser("");
                      setShowInput(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    id="postBtnDisc"
                    onClick={postData}
                    color="primary"
                    variant="contained"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div onClick={() => setShowInput(true)}>
              <div className="avatar">{nameMentor}</div>
              <div className="annMsg">Announce Something to class</div>
            </div>
          )}
        </div>

        <div className="msgsDiv">
          {details.map((item, index) => (
            <div className="msgDivUp">
              <div className="msgDeet">
                {}
                <div className="avatarMsg">{initial[index]}</div>
                <div className="senderDeets">
                  <div className="senderName">{item.sender_name}</div>
                  <div className="senderTime">
                    {new Date(item.createdAt).toLocaleString("default", {
                      month: "long",
                    }) +
                      " " +
                      new Date(item.createdAt).getDate() +
                      ", " +
                      new Date(item.createdAt).getFullYear()}
                  </div>
                </div>
              </div>
              <div className="msgs"> {item.message}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoordDiscussion;
