const mongoose = require('mongoose');
const { loggerInfo } = require('./logger');
const db = () => {
    mongoose.connect('mongodb://localhost:27017', {
        dbName: 'oneplacerecord'
    }).then(() => {
        loggerInfo('Connected to database', 'Database')
    })
}

module.exports = db;