import React, { useState, useEffect } from "react";
import NavBar5 from "../NavBar5";
import "../../CSS/Trainee/RegStudent.css";
import { StudentData } from "../../service/api";

const TraineeProfile = () => {
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await StudentData();
      setuserData(response);
    };
    fetchPeople();
  }, []);

  return (
    <>
      <NavBar5 />
    </>
  );
};

export default TraineeProfile;
