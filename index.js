const express = require('express');
const bodyParser = require('body-parser');
const path = require("path")
require('./server/model/db');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const platformController = require('./server/controller/platform.controller.server');
platformController(app);

const tagController = require('./server/controller/tag.controller.server');
tagController(app);

const problemController = require('./server/controller/problem.controller.server');
problemController(app);

const categoryController = require('./server/controller/category.controller.server');
categoryController(app);

const appController = require('./server/controller/app.controller.server');
appController(app);

const featureController = require('./server/controller/feature.controller.server');
featureController(app);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, "client", "build")))
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//     });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});