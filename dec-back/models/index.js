const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("../models/users");
db.logs = require("../models/logs")

module.exports = db;