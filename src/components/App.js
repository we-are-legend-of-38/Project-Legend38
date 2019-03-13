import React, { Component } from "react";
import VenueList from "./VenueList/VenueList";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      location: `30.3,-97.7`,
      venueList: [],
      eventsList: {},
      message: "What's going on?"
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.geolocateSuccess = this.geolocateSuccess.bind(this);
    this.onGeolocateError = this.onGeolocateError.bind(this);
    this.getVenueList = this.getVenueList.bind(this);
    this.getEventsList = this.getEventsList.bind(this);
  }

  geolocate() {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.geolocateSuccess,
        this.onGeolocateError
      );
    }
  }

  geolocateSuccess(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    console.log(
      "Found coordinates: ",
      latitude.toFixed(1),
      longitude.toFixed(1)
    );
    this.setState({
      location: `${latitude.toFixed(1)},${longitude.toFixed(1)}`
    });
  }

  onGeolocateError(error) {
    console.warn(error.code, error.message);
    if (error.code === 1) {
      // they said no
      // redirect to search by city name
    } else if (error.code === 2) {
      // position unavailable
      // redirect to search by city name
    } else if (error.code === 3) {
      // timeout
      // log an error
    }
  }

  getVenueList(loc) {
    axios
      .get(`http://localhost:3000/venues/${loc}`)
      .then(response => {
        this.setState({ venueList: response.data });
        console.log(this.state.venueList);
      })
      .catch(err => console.log(err));
  }

  getEventsList(venueArray) {
    axios
      .get(`http://localhost:3000/events/${venueArray}`)
      .then(events => console.log("events!!!", events))
      .catch(err => console.log(err));
  }

  handleLocation() {
    this.geolocate();
    this.getVenueList(this.state.location);
  }

  componentDidMount() {
    this.getVenueList(this.state.location);
    setTimeout(() => this.getEventsList.bind(this, this.state.venueList), 700);
  }

  render() {
    const VenueInfo = this.state.venueList.map((venue, index) => {
      return <VenueList info={venue} key={index} />;
    });

    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={this.handleLocation}>Find Venues Near Me</button>
        <p>{this.state.location}</p>
        <ol>{VenueInfo}</ol>
      </div>
    );
  }
}
