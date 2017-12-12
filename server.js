const express = require('express');
const app = express();

// run the app by serving static files

app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port

app.listen(process.env.PORT || 8080);
