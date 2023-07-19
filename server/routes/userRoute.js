const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authmiddle = require("../middleware/authmiddle");
const Appointment = require("../models/appointment");
const dayjs = require("dayjs");
router.post("/register", async (req, res) => {
    try {
        const userExist = await User.findOne({email: req.body.email});
        if (userExist) {
            res.status(200).send({message: "User already exist", success: false});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({message: "User created successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error creating user", success: false, error});
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(200).send({message: "User not found", success: false});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({message: "Password does not match", success: false});
        } else {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
            res.status(200).send({message: "User logged in successfully", success: true, token});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error logging in user", success: false, error});
    }
});

router.post("/getInfo", authmiddle, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        user.password = undefined;
        if (!user) {
            return res.status(200).send({message: "User not found", success: false});
        } else {
            return res.status(200).send({success: true, data: user});
        }
        
    } catch (error) {
        res.status(500).send({message: "Error getting user info", success: false, error});
    }
});

// apply doctor
router.post("/apply-doctor", authmiddle, async (req, res) => {
    try {
        const newDoctor = new Doctor({...req.body, status: "pending"});
        await newDoctor.save();
        const adminUser = await User.findOne({isAdmin: true});
        const unseenNoti = adminUser.unseenNoti;
        unseenNoti.push({
            type: "new-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor!!`,
            data: {
                doctor: newDoctor._id,
                name: newDoctor.firstName + " "+newDoctor.lastName
            },
            onclickPatch: "/admin/list-of-doctors"
        })
        await User.findByIdAndUpdate(adminUser._id, {unseenNoti});
        res.status(200).send({message: "Doctor applied successfully", success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error applying doctor", success: false, error});
    }
});

// mark all as read
router.post("/mark-all-as-read", authmiddle, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        const unseenNoti = user.unseenNoti;
        const seenNoti = user.seenNoti;
        seenNoti.push(...unseenNoti);
        user.unseenNoti = [];
        user.seenNoti = seenNoti;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({message: "All notifications marked as read", success: true, data: updatedUser});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Cannot marked as read", success: false, error});
    }
});

// delete all notification
router.post("/delete-notification", authmiddle, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        user.seenNoti = [];
        user.unseenNoti = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({message: "All notifications deleted", success: true, data: updatedUser});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error delete notification", success: false, error});
    }
});

// get all approve doctor to display on home screen
router.get("/getAllDoctor", authmiddle, async (req, res) => {
    try {
        const doctors = await Doctor.find({status : "approved"});
        res.status(200).send({message: "Get all doctor has been approved", success: true, data: doctors});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error to Fetch the Doctors", success: false, error});
    }
});

//booking appointment route
router.post("/booking-appointment", authmiddle, async (req, res) => {
    try {
        req.body.status = "pending";
        const Newappointment = new Appointment(req.body);
        await Newappointment.save();
        // pushing ontifi to doctor 
        const user = await User.findOne({_id: req.body.doctorInfo.userId});
        user.unseenNoti.push({
            type: "new-appointment-request",
            message: `Your appointment request has been made by ${req.body.userInfo.username}`,
            onclickPatch: "/doctor/appointment"
        });
        await user.save();
        res.status(200).send({message: "Booking successfully", success: true});

    } catch (error) {
        res.status(500).send({message: "Error booking appointment", success: false, error});
    }
});

// check available 
// router.post("/check-available", authmiddle, async (req, res) => {
//     try {
//         // date, time and doctor id to check available
//         const date = dayjs(req.body.date, "dddd, DD-MMM-YYYY").toISOString(); // convert date to string
//         const fromTime = dayjs(req.body.time, "HH:mm A").subtract(60, "minutes").toISOString();  // block before 1h
//         const toTime = dayjs(req.body.time, "HH:mm A").add(60, "minutes").toISOString();  // block after 1h
//         const doctorId = req.body.doctorId;
//         const appointments = await Appointment.find({
//             doctorId,
//             date,
//             time: {$gte: fromTime, $lte: toTime},
//             // status: "approved"
//         });
//         if (appointments.length > 0) {
//             return res.status(200).send({message: "Appointment is not available", success: false});
//         } else {
//             return res.status(200).send({message: "Appointment is available", success: true});
//         }

//     } catch (error) {
//         res.status(500).send({message: "Error booking appointment", success: false, error});
//     }
// });

// fetch booking appointment
router.get("/get-appointment-by-user-id", authmiddle, async (req, res) => {
    try {
        const appointments = await Appointment.find({userId: req.body.userId});
        res.status(200).send({message: "Get all appointment", success: true, data: appointments});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error fetching appointment", success: false, error});
    }
});

module.exports = router;