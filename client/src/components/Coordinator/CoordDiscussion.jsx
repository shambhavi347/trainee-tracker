import React, { useState } from "react";
// import "../../CSS/Trainee/CoordDiscussion.css";

const CoordDiscussion = () => {
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
    const {
      message
    } = user;

    const res = await fetch("/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message
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
    }
  };

  return (
    <>
      <h1>Announcement - </h1>
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
      </div>
    </>
  );
};

export default CoordDiscussion;
