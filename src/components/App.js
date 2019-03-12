import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "Hello World"
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.geolocate = this.geolocate.bind(this)
    this.geolocateSuccess = this.geolocateSuccess.bind(this)
  }

  geolocate () {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.geolocateSuccess,
        onGeolocateError
      );
    }
  };

  geolocateSuccess (coordinates) {
    const { latitude, longitude } = coordinates.coords;
    console.log("Found coordinates: ", latitude, longitude);
    this.setState({
      lat = latitude,
      lng = longitude
    })
  };

  onGeolocateError (error) {
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
  };

  handleLocation() {
    geolocate();
    console.log("yup");
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={this.handleLocation}>Find Venues Near Me</button>
      </div>
    );
  }
}
