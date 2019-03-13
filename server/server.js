require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { FS_VENUES, FS_CLIENT, FS_SECRET, FS_EVENTS, FS_FILTER } = process.env;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const { filter } = require("./filter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/venues/:location", (req, res) => {
  const loc = req.params.location;
  if (loc === "udefined") {
    res.status = 412;
    res.send(new error("error: location needed to search for venues."));
  } else {
    getVenueList(loc, (err, data) => {
      err ? res.status(400).send(err) : res.status(200).send(data);
    });
  }
});

const getVenueList = (loc, cb) => {
  axios
    .get(
      `${FS_VENUES}?ll=${loc}&categoryId=${FS_FILTER}&client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=20190313`
    )
    .then(response => {
      const filteredVenues = filter(response.data.response.venues);
      cb(null, filteredVenues);
    })
    .catch(err => console.error(err));
};

app.get("/events/:arrOfVenues", (req, res) => {
  if (req.params.arrOfVenues) {
    const arrOfVenues = req.params.arrOfVenues;
    const eventsList = {};
    arrOfVenues.forEach(venue => {
      if (venue.events) {
        const venueID = venue.id;
        // console.log(venueID);
        axios
          .get(
            `${FS_EVENTS}${venueID}/events/?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=20190313`
          )
          .then(response => {
            const events = response.data.response.events.items;
            eventsList[venueID] = events;
            // console.log("******", response.data.response.events.items)
          })
          .then(data => res.status(200).send(data))
          .catch(err => console.error(err));
      }
    });
  } else {
    res
      .status(400)
      .send(new error("error: location needed to search for venues."));
  }
});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

//arrOfEvents.push(response)
