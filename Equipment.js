const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EquipmentSchema = new mongoose.Schema({
    //dateAdded:Datet,
    category: String,
    origin: String,
    capacity: Number,
    yom: Number,
    warranty: Number,
    cost: String,
    quantity:Number,    
    technology: String,    
    comments: String,
})

const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = Equipment;