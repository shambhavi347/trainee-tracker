import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import "../../CSS/Coordinator/DiscussCoord.css";
import { GetMessages1, GetNames1 } from "../../service/api";
const TraineeDiscuss = () => {
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
      window.alert("Message Sent !!");
      console.log("Message Sent !!");
      setUser("");
      setShowInput(false);
    }
  };

  const [msg, setMsg] = useState([]);
  useEffect(() => {
    const M_data = async () => {
      const response = await GetMessages1();
      console.log(response);
      setMsg(response);
    };
    M_data();
  }, []);

  const [names, setNames] = useState([]);
  useEffect(() => {
    const N_data = async () => {
      const response = await GetNames1();
      console.log(response);
      setNames(response);
    };
    N_data();
  }, []);

  const alternateArray = [];
  msg.map((element, index) => {
    alternateArray.push(element);
    alternateArray.push(names[index]);
  });
  const rev = [...alternateArray].reverse();
  console.log(rev);

  return (
    <>
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
                      className="main__wrapper100"
                      onClick={() => setShowInput(true)}
                    >
                      <Avatar />
                      <div>Announce Something to class</div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div
                className="TryScroll"
                style={{ backgroundColor: "blueviolet", height: "10%" }}
              > */}
                {rev.map((item, index) =>
                  index % 2 == 0 ? (
                    <div className="amt">
                      <div className="amt__Cnt">
                        <p className="amt__txt">
                          <h1 style={{ backgroundColor:"springgreen" }}>{item}</h1>
                          <h1 style={{ backgroundColor:"springgreen" }}>{rev[index + 1]}</h1>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <h1></h1>
                    // <h1 style={{ backgroundColor: "black" }}>{item}</h1>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default TraineeDiscuss;
