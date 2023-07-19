import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { showloading, hideloading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";
const Appointment = () => {

    const [appointments, setAppointment] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentData = async () => {
        try {
            dispatch(showloading());
            const response = await axios.get("/api/user/get-appointment-by-user-id", {
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
    const column = [
        {
            // patient name
            title: "Patient Name",
            dataIndex: "username",
            render: (text, record) => <h4 className="doctor_name">{record.userInfo.username}</h4>
        },
        {
            // doctor name
            title: "Dr. Name",
            dataIndex: "username",
            render: (text, record) => <h4 className="doctor_name">{record.doctorInfo.firstName} {record.doctorInfo.lastName}</h4>     
        },
        {
            // doctor phone number
            title: "Dr. Phone Number",
            dataIndex: "phoneNumber",
            render: (text, record) => <h4 className="doctor_name">{record.doctorInfo.phoneNumber}</h4>
            
        },
        // {
        //     title: "Working Time",
        //     dataIndex: "timing",
        //     render: (text, record) => <h4 className="doctor_name">{record.doctorInfo.timing[0]} - {record.doctorInfo.timing[1]}</h4>
        // },
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
        }
    ];
    return  (
        <Layout>
            <h3 className="doctors_list">List Of Your Appointment With Doctor</h3>
            <Table className="users-table" columns={column} dataSource={appointments} />
        </Layout>
    )
}

export default Appointment;