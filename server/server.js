require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/venues/:loc", (req, res) => {
  const loc = req.param.loc;
  if (loc === "udefined") {
    res.status = 404;
    res.send("error: location needed to search for venues.");
  }
});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
