const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const authmiddle = require("../middleware/authmiddle");
const Appointment = require("../models/appointment");


// doctor info
router.post("/getDoctorInfo-by-id", authmiddle, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId});
        res.status(200).send({message: "Success getting doctor info", success: true, data: doctor});
        
    } catch (error) {
        res.status(500).send({message: "Error getting doctor info", success: false, error});
    }
});

// update doctor profile
router.post("/update-doctor-profile", authmiddle, async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate({userId: req.body.userId}, req.body);
        res.status(200).send({message: "Update Info of Doctor Successfully", success: true, data: doctor});
        
    } catch (error) {
        res.status(500).send({message: "Error cannot update Info Of Doctor", success: false, error});
    }
});

router.post("/DoctorInfo-by-id", authmiddle, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({_id: req.body.doctorId});
        res.status(200).send({message: "Success getting doctor info", success: true, data: doctor});
        
    } catch (error) {
        res.status(500).send({message: "Error getting doctor info", success: false, error});
    }
});

// get appointment for Dr.
router.get("/get-appointment-by-doctor-id", authmiddle, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId});
        const appointments = await Appointment.find({doctorId: doctor._id});
        res.status(200).send({message: "Get all appointment", success: true, data: appointments});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error fetching appointment", success: false, error});
    }
});

// change doctor appointment status
router.post("/change-doctor-appointment-status", authmiddle, async (req, res) => {
    try {
        const {appointmentId, status} = req.body;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, {status, });
        // res.status(200).send({message: "Doctor Status Updated Successfully", success: true, data: doctor});
        // fetch the user id
        const user = await User.findOne({_id: appointment.userId});

        // send notification to user
        const unseenNoti = user.unseenNoti;
        unseenNoti.push({
            type: "appointment-status-changed",
            message: `Your Appointment has been ${status} by Doctor`,
            onclickPatch: "/appointment"
        });
        await user.save();
        res.status(200).send({message: "Appointment Status Updated Successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error changing status of appointment", success: false, error});
    }
});


module.exports = router;