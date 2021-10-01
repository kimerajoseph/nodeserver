const mongoose = require('mongoose');
const Schema = mongoose.Schema
const CustomerSchema = new mongoose.Schema({
    surname: String,
    lastName: String,
    otherNames: String,
    username: String,
    gender:String, 
    DOB: Date,
    country: String,
    city:String,
    email:String,
    phoneNumber:String,
    password:String, 
    confirmPassword:String, 
    timestamp:String
})
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;