import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField} from "@mui/material";
import "../../CSS/Trainee/DiscussTrainee.css";
import { GetDetails1 } from "../../service/api";
import { icon} from "../../Images/Images";
// const Component = styled(Button)`
// background-color: #00abd5;
// border:1px solid  #00abd5;

// `;
 

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

  const [details, setDetails] = useState([]);
  useEffect(() => {
    const D_data = async () => {
      const response = await GetDetails1();
      console.log(response);
      setDetails(response);
    };
    D_data();
  }, []);

  const newArray = details.slice().reverse();

  return (
    <>
      <div className="forScroll1">
        <div className="main">
          <div className="main__wrapper">
            <div className="main__announce1">
              <div className="main__announcements1">
                <div className="main__announcementsWrapper1">
                  <div className="main__ancContent1">
                  
                    {showInput ? (
                      <div className="main__form1">
                        <TextField
                          id="filled-multiline-flexible1"
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
                        <div className="main__buttons1">
                          <div>
                            <Button  id ="cbtnT"
                              onClick={() => {
                                setUser("");
                                setShowInput(false);
                              }}
                            >
                              Cancel
                            </Button>
                            
                            <Button id="btnTrainee"
                              onClick={postData}
                              // color="primary"
                              variant="contained"
                            >
                              Post
                            </Button>
                         
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="main__wrapper1001"
                        onClick={() => setShowInput(true)}
                      >
                        <Avatar />
                       
                        <div>Announce Something to class</div>
                      </div>
                    )}
                  </div>
                </div>
                {newArray.map((item, index) => (
                  <div className="amt1">
                    <div className="amt__Cnt1">
                      <p className="amt__txt1">
                        {/* <Avatar/> */}
                        <img className="icon_img" src={icon} alt="" />
                        <h1
                          /*style={{ backgroundColor:"pink" }}*/ className="tr_sender2"
                        >
                          {item.sender_name}
                        </h1>
                        <h1
                          /*style={{ backgroundColor: "skyblue" }}*/ className="tr_date2"
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
                          className="tr_message2"
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

export default TraineeDiscuss;
