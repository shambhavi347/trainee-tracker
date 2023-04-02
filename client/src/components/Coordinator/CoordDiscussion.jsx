import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";
// import "../../CSS/Coordinator/DiscussCoord.css";
import { icon } from "../../Images/Images";
import { GetDetails } from "../../service/api";

// const Component = styled(TextField)`
//    background-color: #eeeeee;
//    border:1px solid blue;
// `;
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

  const [details, setDetails] = useState([]);
  useEffect(() => {
    const D_data = async () => {
      const response = await GetDetails();
      console.log(response);
      setDetails(response);
    };
    D_data();
  }, []);

  const newArray = details.slice().reverse();

  return (
    <>
      <div className="forScroll ">
        <div className="main " style={{ background: "#00adb5" }}>
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
                {newArray.map((item, index) => (
                  <div className="amt">
                    <div className="amt__Cnt">
                      <p className="amt__txt">
                        {/* <Avatar /> */}
                        <img className="icon_img1" src={icon} alt="" />
                        <h1
                          /*style={{ backgroundColor:"pink" }}*/ className="tr_sender"
                        >
                          {item.sender_name}
                        </h1>
                        <h1
                          /*style={{ backgroundColor: "skyblue" }}*/ className="tr_date"
                        >
                          {new Date(item.createdAt).toLocaleString("default", {
                            month: "long",
                          }) +
                            " " +
                            new Date(item.createdAt).getDate() +
                            ", " +
                            new Date(item.createdAt).getFullYear()}
                        </h1>
                        <h1
                          /*style={{ backgroundColor: "yellowgreen" }}*/
                          className="tr_message"
                        >
                          {item.message}
                        </h1>
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
