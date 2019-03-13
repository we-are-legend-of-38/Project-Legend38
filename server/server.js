require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { FS_VENUES, FS_CLIENT, FS_SECRET, FS_FILTER } = process.env;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/venues/:location", (req, res) => {
  console.log("here!***********", req.params.location);
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
      `${FS_VENUES}?ll=${loc}&categoryId=${FS_FILTER}&client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&limit=15&v=20190313`
    )
    .then(response => {
      const { venues } = response.data.response;
      cb(null, venues);
    })
    .catch(err => console.error(err));
};

const getVenue = () => {};

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
