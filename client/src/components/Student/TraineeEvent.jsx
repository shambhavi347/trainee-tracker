import React, { useEffect, useState } from "react";
import "../../CSS/Trainee/Announcment.css";
import { getEventTrainee } from "../../service/api";
const TraineeEvent = () => {
  const [event, setEvent] = useState([]);
  var deadline = [];
  const [deadlineEve, setDeadlineEve] = useState({});
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
          // val.timestamp = dob;
          // console.log(dob);
          deadline.push(dob);
          // setDeadline({ ...deadline, dob });
        });
        setDeadlineEve(deadline);
        // console.log(event);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [event]);
  // console.log(deadlineEve);
  // event.map((val) => console.log(val.timestamp));
  return (
    <div className="trainee-event-body">
      <h3 className="eve-heading-trainee">Upcoming Events</h3>
      <div className="eve-main-trainee">
        {event?.map((val, index) => (
          <div className="eve-trainee">
            <div className="eve-title">{val.title}</div>
            <div className="eve-timestamp">{deadlineEve[index]}</div>
          </div>
        ))}
        {event.length === 0 ? (
          <>
            <div className="no-work">Woohoo, no work due soon!</div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TraineeEvent;
