import React from "react";

const VenueList = props => {
  const name = props.info.name;
  const venueType = props.info.categories[0].name;
  return (
    <div>
      <li>
        <strong>"{name}"</strong> is a {venueType}
      </li>
    </div>
  );
};

export default VenueList;
