import React from "react";

const VenueList = props => {
  const name = props.info.name;
  const dumb = props.info.categories[0].name;
  return (
    <div>
      <li>
        {name}--------------------{dumb}
      </li>
    </div>
  );
};

export default VenueList;
