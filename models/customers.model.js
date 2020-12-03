const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customersSchema = new Schema({
    image:{ type:String},
    name:{type:String , required:true},
    email:{type:String, required:true},
    certificates:{type:Array},
});

const Customers = mongoose.model('Customers',customersSchema);

module.exports = Customers;
