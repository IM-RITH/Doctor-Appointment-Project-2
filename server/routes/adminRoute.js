const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const authmiddle = require("../middleware/authmiddle");

// fetch all users
router.get("/All-Users", authmiddle, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({message: "All Users Fetched Successfully", success: true, data: users});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error to Fetch the Users", success: false, error});
    }
});

// fetch all doctors
router.get("/All-Doctors", authmiddle, async (req, res) => {
    try {
        const doctor = await Doctor.find({});
        res.status(200).send({message: "All Doctors Fetched Successfully", success: true, data: doctor});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error to Fetch the Doctors", success: false, error});
    }
});

// change doctor status

router.post("/doctor-status", authmiddle, async (req, res) => {
    try {
        const {doctorId, status} = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {status, });
        // res.status(200).send({message: "Doctor Status Updated Successfully", success: true, data: doctor});
        // fetch the user id
        const user = await User.findOne({_id: doctor.userId});
        // send notification to user
        const unseenNoti = user.unseenNoti;
        unseenNoti.push({
            type: "new-doctor-request-changed",
            message: `Your Doctor account has been ${status} by Admin`,
            onclickPatch: "/notifications"
        });
        // change status in db
        user.isDoctor = status === "approved" ? true : false;
        await user.save();
        res.status(200).send({message: "Doctor Status Updated Successfully", success: true, data: doctor});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Cannot Update Doctor Status", success: false, error});
    }
});

module.exports = router;