import React, { Component } from "react";
import axios from "axios";
import VenueList from "./VenueList/VenueList";
import VenueInfo from "./VenueInfo/VenueInfo";
import EventList from "./EventList/EventList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      location: `30.3,-97.7`,
      venueList: [],
      eventsList: [],
      venueInfoList: [],
      venueIDList: [],
      message: "What's going on?"
    };

    this.handleLocation = this.handleLocation.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.geolocateSuccess = this.geolocateSuccess.bind(this);
    this.onGeolocateError = this.onGeolocateError.bind(this);
    this.getVenueList = this.getVenueList.bind(this);
    this.getEventsList = this.getEventsList.bind(this);
    this.handleEventLookup = this.handleEventLookup.bind(this);
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
      // ToDo: redirect to search by city name
    } else if (error.code === 2) {
      // position unavailable
      // ToDo: redirect to search by city name
    } else if (error.code === 3) {
      // timeout
      // ToDo: log an error
    }
  }

  populateVenueInfoList() {
    const venueIDArray = this.state.venueList.map(venue => venue.id);
    this.setState({
      venueIDList: venueIDArray
    });
    console.log(venueIDArray);
  }

  getVenueList(loc) {
    axios
      .get(`http://localhost:3000/venues/${loc}`)
      .then(response => {
        this.setState({ venueList: response.data });
        this.populateVenueInfoList();
        console.log(this.state.venueList);
      })
      .catch(err => console.log(err));
  }

  getEventsList(venueArray) {
    axios
      .post(`http://localhost:3000/events`, { arrOfVenues: venueArray })
      .then(events => this.setState({ eventsList: events.data }))
      .catch(err => console.log(err));
  }

  getBandEvents() {
    //ToDo: handle clicking a band name
    axios.get("http://localhost:3000/bandInfo/?");
  }

  handleEventLookup() {
    this.getEventsList(this.state.venueList);
  }

  handleLocation() {
    this.geolocate();
    this.getVenueList(this.state.location);
  }

  componentDidMount() {
    this.getVenueList(this.state.location);
  }

  render() {
    const VenueInfo = this.state.venueList.map((venue, index) => {
      if (venue.events) {
        return <VenueList info={venue} key={index} />;
      }
    });

    const EventInfo = this.state.eventsList.map((venueEvents, index) => {
      console.log(venueEvents);
      const venueName = this.state.venueList[index].name;
      return <EventList info={venueEvents} key={index} venue={venueName} />;
    });

    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={this.handleLocation}>Find Venues Near Me</button>
        <button onClick={this.handleEventLookup}>Find Events Near Me</button>
        <p>{this.state.location}</p>
        <div>
          <ol>{VenueInfo}</ol>
          <ol>{EventInfo}</ol>
        </div>
      </div>
    );
  }
}
