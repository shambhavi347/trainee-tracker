import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import "../../CSS/Coordinator/CoordDiscussion.css";
import { GetMessages } from "../../service/api";
const CoordDiscussion = () => {
  const [showInput, setShowInput] = useState(false);
  const [user, setUser] = useState({
    message: "",
  });

  let name, value;
  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

    console.log(name, value);
  };

  const [msg, setMsg] = useState([]);
  useEffect(() => {
    const M_data = async () => {
      const response = await GetMessages();
      console.log(response);
      setMsg(response);
    };
    M_data();
  }, []);

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
    console.log(data);

    if (data.error) {
      window.alert(data.error);
      console.log("Error");
    } else {
      window.alert("Message Sent !!");
      console.log("Message Sent !!");
      setUser("");
      setShowInput(false);
    }
  };

  return (
    <>
      {/* <h1>Announcement - </h1>
      <br />
      <div>
        <input
          className="message"
          type="text"
          placeholder="write something"
          name="message"
          value={user.message}
          autoComplete="off"
          onChange={handleChange}
        />
        <button className="button" onClick={postData}>
          POST
        </button>
      </div> */}
      <div className="main">
        <div className="main__wrapper">
          <div className="main__announce">
            <div className="main__announcements">
              <div className="main__announcementsWrapper">
                <div className="main__ancContent">
                  {showInput ? (
                    <div className="main__form">
                      <TextField
                        id="filled-multiline-flexible"
                        multiline
                        label="Announce Something to class"
                        variant="filled"
                        className="message"
                        type="text"
                        placeholder="write something"
                        name="message"
                        value={user.message}
                        autoComplete="off"
                        onChange={handleChange}
                      />
                      <div className="main__buttons">
                        <div>
                          <Button
                            onClick={() => {
                              setUser("");
                              setShowInput(false);
                            }}
                          >
                            Cancel
                          </Button>

                          <Button
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
                    <div
                      // className="main__wrapper100"
                      onClick={() => setShowInput(true)}
                    >
                      <Avatar />
                      <div>Announce Something to class</div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{backgroundColor:"blueviolet", overflow:"auto"}}>
              {msg.map((item) => (
                // <h1 style={{backgroundColor:"black"}}>msgs - {item}</h1>
                <div className="amt">
                  <div className="amt__Cnt">
                    <p className="amt__txt">
                    <h1 style={{backgroundColor:"black"}}>msgs - {item}</h1>
                    </p>
                   </div>
                 </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoordDiscussion;
