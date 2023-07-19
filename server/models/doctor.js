const mongoose = require("mongoose");
// create schema for doctor 

const DoctorSchema = new mongoose.Schema({
    userId : {
        type: String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    phoneNumber : {
        type: String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    specialization : {
        type : String,
        required : true
    },
    experience : {
        type : String,
        required : true 
    },
    fee : {
        type: Number,
        required : true
    },
    timing : {
        type: Array,
        required : true
    },
    status : {
        type : String,
        default: "pending"
    }
}, {
    timestamps: true
})
// create model for doctor
const doctorModel = mongoose.model("Doctor", DoctorSchema);
module.exports = doctorModel;