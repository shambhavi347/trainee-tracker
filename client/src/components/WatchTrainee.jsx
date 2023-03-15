import React, { useState, useEffect } from "react";
import { getTraineeEmail } from "../service/api";

const WatchTrainee = () => {
  //javascript
  const [name, setName] = useState(["Shankar", "Aakriti", "Ritu"]);
  const [email, setEmail] = useState([]);
  const handleClick = () => {
    if (name === "Shambhavi") setName("Divya");
    else setName("Shambhavi");
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTraineeEmail();
      console.log(data);
      setEmail(data);
      console.log(email);
    };
    fetchData();
  }, [email]);

  return (
    <>
      {/* html */}
      <h1>
        hello Trainee
        {name}
        <button onClick={handleClick}> Click </button>
        {name === "Shambhavi" ? <h3>Hello Shambhavi</h3> : <h3>Hello Divya</h3>}
        {/* cond ? (if application) : (else application) */}
      </h1>
    </>
  );
};

export default WatchTrainee;
