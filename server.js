const express = require("express");
const methodOverride = require("method-override");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/controller");

app.use("/", routes);

app.listen(port);

app.listen(PORT, function () {
  console.log("Server listening on http://localhost:" + PORT);
});
