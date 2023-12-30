// Libraries
const db = require('./utils/db');
const express = require('express')
const app = express();
require('dotenv').config(); // To fetch env variables in anywhere you want
const { loggerInfo } = require('./utils/logger');
// Connect to database invoke function
db();

// App Allow Things

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Parse application/json
app.use(express.json());


// Routes
const UserRoutes = require('./routes/users');
app.use('/api/v1', UserRoutes);


// Create a server
const port = 4000;
app.listen(port, () => {
    loggerInfo(`Example app listening on port ${port}`,'SERVER');
})