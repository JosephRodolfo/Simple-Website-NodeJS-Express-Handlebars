const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//define paths for expresss config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//set up handlebars engine and views location
app.set("views", viewsPath);

app.set("view engine", "hbs");

//set up directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "J.R. Enderle",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term!",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return console.log(error);
          }

          res.send({ location: location, forecastData: forecastData });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a searh term!",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "J.R. Enderle",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "J.R. Enderle",
    message: "How can we help?",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "J.R. Enderle",
    message: "The help article you're looking for doesn't seem to exist!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "J.R. Enderle",
    message: "Sorry, partner, this page doesn't exist.",
  });
});

app.listen(port, () => {
  console.log(`server is up on${port}`);
});
