import React, { useEffect, useState } from "react";
import "../../CSS/Trainee/Announcment.css";
import { getEventTrainee } from "../../service/api";
const TraineeEvent = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    let date, dob;
    const fetchEvent = async () => {
      try {
        const data = await getEventTrainee();
        const sortedAsc = data.sort(function (a, b) {
          return new Date(a.timestamp) - new Date(b.timestamp);
        });
        setEvent(sortedAsc);
        event.map((val) => {
          date = new Date(val.timestamp);
          dob = date.toLocaleDateString("en-US");
          val.timestamp = dob;
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [event]);
  return <div className="trainee-event-body"> TraineeEvent</div>;
};

export default TraineeEvent;
