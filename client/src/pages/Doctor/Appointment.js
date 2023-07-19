import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { showloading, hideloading } from "../../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";
const Appointment_Doctor = () => {

    const [appointments, setAppointment] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentData = async () => {
        try {
            dispatch(showloading());
            const response = await axios.get("/api/doctor/get-appointment-by-doctor-id", {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideloading());
            if(response.data.success) {
                setAppointment(response.data.data);
            }
        } catch (error) {
            dispatch(hideloading());
        }
    };
    useEffect(() => {
        getAppointmentData();
    }, []);

    // doctor appointment status
    const doctorAppointmentStatus = async (record, status) => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/doctor/change-doctor-appointment-status", {appointmentId: record._id, status: status}, {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
                getAppointmentData();
            }
        } catch (error) {
            toast.error("Error changing doctor status");
            dispatch(hideloading());
        }
    };
    const column = [
        {
            // patient name
            title: "Patient Name",
            dataIndex: "username",
            render: (text, record) => <h4 className="doctor_name">{record.userInfo.username}</h4>
        },
        // {
        //     // doctor name
        //     title: "Dr. Name",
        //     dataIndex: "username",
        //     render: (text, record) => <h4 className="doctor_name">{record.doctorInfo.firstName} {record.doctorInfo.lastName}</h4>     
        // },
        {
            // doctor phone number
            title: "Email",
            dataIndex: "email",
            render: (text, record) => <h4 className="doctor_name">{record.userInfo.email}</h4>
            
        },
        {
            // date of appointment
            title: "Date",
            dataIndex: "date",
            render: (text, record) => <h4 className="doctor_name">{dayjs(record.date).format("dddd, DD-MMM-YYYY")}</h4>
             
        },
        {
            // time of appointment
            title: "Time",
            dataIndex: "time",
            render: (text, record) => <h4 className="doctor_name">{record.time}</h4>
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <div className="d-flex">
                             <h3 className="block-section px-3" onClick={()=> doctorAppointmentStatus(record, "approved")}>Approve</h3>
                            <h3 style={{color:"red", fontWeight:"bold"}} className="block-section" onClick={()=> doctorAppointmentStatus(record, "rejected")}>Reject</h3>
                        </div>
                    )}
                </div>
            )
        }
    ];
    return  (
        <Layout>
            <h3 className="doctors_list">List of Appointments</h3>
            <Table className="users-table" columns={column} dataSource={appointments} />
        </Layout>
    )
}

export default Appointment_Doctor;