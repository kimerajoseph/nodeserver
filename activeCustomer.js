const mongoose = require('mongoose');
const Schema = mongoose.Schema

const activeCustomerSchema = new mongoose.Schema({
    name: String,
    dateOfBirth: String,
    NIN: String,
    tel:String,
    email:String,
    eqType:String,
    cost:String,
    downPayment:String,
    financing:String,
    guarantor: String,
    gContact:String,
    gNIN:String,
})


const activeCustomer = mongoose.model('activeCustomer', activeCustomerSchema);

module.exports = activeCustomer;