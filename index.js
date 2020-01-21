const express = require('express');
const bodyParser = require('body-parser');
require('./server/model/db');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});