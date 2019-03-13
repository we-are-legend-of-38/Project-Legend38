import React from "react";
import Event from "./Event";

const EventList = props => {
  const eventsArr = props.info;
  const events = eventsArr.map((event, index) => {
    return <Event info={event} key={index} />;
  });
  return (
    <div>
      <p>
        <strong>{props.venue}</strong>
      </p>
      <ol>{events}</ol>
    </div>
  );
};

export default EventList;
