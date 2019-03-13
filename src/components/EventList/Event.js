import React from "react";

const Event = props => {
  const { name, url } = props.info;
  return (
    <div>
      <li>
        <strong>{name} </strong>
        <a href={url} target="_blank">
          Event Info
        </a>
      </li>
    </div>
  );
};

export default Event;
