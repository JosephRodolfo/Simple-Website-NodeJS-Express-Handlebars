const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

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



app.listen(3000, () => {
  console.log("server is up on port 3000");
});
