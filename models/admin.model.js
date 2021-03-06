const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
     image:{ type:String},
     name:{type:String , required:true},
     email:{type:String, required:true},
     certificates:{type:Array},
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;
