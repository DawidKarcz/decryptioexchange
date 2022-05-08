const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    time : {
        type : String,
    },
    action : {
        type : String,
    },
    status : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    
});


module.exports = mongoose.model('Logs', logsSchema);

