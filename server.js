var bodyParser = require('body-parser');
const express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/app/public')));

require('./App/Routing/api-routes.js')(app);
require('./App/Routing/html-routes.js')(app);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
});

