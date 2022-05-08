const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter your name']
    },
    username : {
        type : String,
        required : [true, 'Please enter your username']
    },
    email : {
        type : String,
        required : [true, 'Please enter your email address'],
        unique : true,
        validate : [validator.isEmail, 'Please enter valid email address']
    },
    password : {
        type : String,
        required : [true, 'Please enter password for your account'],
        minlength : [8, 'Your password must be at least 8 characters long'],
        select : true
    },
    balance : {
        type : Number,
    },
    bitcoin : {
        type : Number,
    },
    dash : {
        type : Number,
    },
    monero : {
        type : Number,
    },
    ethereum : {
        type : Number,
    },
    xrp : {
        type : Number,
    },
    tether : {
        type : Number,
    },
    bitcoinCash : {
        type : Number,
    },
    bitcoinSV : {
        type : Number,
    },
    litecoin : {
        type : Number,
    },
    eos : {
        type : Number,
    },
    binancecoin : {
        type : Number,
    },
    tezos : {
        type : Number,
    },
    dogecoin : {
        type : Number,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    
});


module.exports = mongoose.model('User', userSchema);
