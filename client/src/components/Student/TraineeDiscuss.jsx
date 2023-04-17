import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { GetDetails1, StudentData } from "../../service/api";

const TraineeDiscuss = () => {
  const [initProfile, setInitProfile] = useState("");
  const [userData, setuserData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [details, setDetails] = useState([]);
  const [user, setUser] = useState({
    message: "",
  });

  //call user Profile
  let initTrainee = [];
  useEffect(() => {
    const fetchPeople = async () => {
      const response = await StudentData();
      if (response) {
        setuserData(response);
        initTrainee.push(userData.first_name);
        if (userData.middle_name) initTrainee.push(userData.middle_name);
        if (userData.last_name) initTrainee.push(userData.last_name);
        setInitProfile(initTrainee.map((init) => init[0]).join(""));
      }
    };
    fetchPeople();
  }, [userData]);

  let initial = [];
  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

    console.log(name, value);
  };

  //send messages
  const postData = async (e) => {
    e.preventDefault();
    const { message } = user;

    const res = await fetch("/send_message1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.error) {
      window.alert(data.error);
      console.log("Error");
    } else {
      console.log("Message Sent !!");
      setUser("");
      setShowInput(false);
    }
  };

  //get all the messages
  useEffect(() => {
    const D_data = async () => {
      const response = await GetDetails1();
      // console.log(response);
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
  return (
    <>
      <div className="discUp" style={{ width: "75%", float: "right" }}>
        <div
          className="announceBox"
          style={{ marginLeft: "15%", marginRight: "18%" }}
        >
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
              <div className="avatar">{initProfile}</div>
              <div className="annMsg">Announce Something to class</div>
            </div>
          )}
        </div>

        <div
          className="msgsDiv"
          style={{ marginLeft: "15%", marginRight: "18%" }}
        >
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

export default TraineeDiscuss;
