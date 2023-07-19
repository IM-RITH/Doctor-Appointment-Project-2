import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { showloading, hideloading } from "../../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const getDoctorsData = async () => {
        try {
            dispatch(showloading());
            const response = await axios.get("/api/admin/All-Doctors", {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideloading());
            if(response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideloading());
        }
    };

    // change doctor status function
    const doctorStatus = async (record, status) => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/admin/doctor-status", {doctorId : record._id, userId : record.userId, status: status}, {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
                getDoctorsData();
            }
        } catch (error) {
            toast.error("Error changing doctor status");
            dispatch(hideloading());
        }
    };
    useEffect(() => {
        getDoctorsData();
    }, []);

    const column = [
        {
            title: "Username",
            dataIndex: "username",
            render: (text, record) => <h3 className="doctor_name">{record.firstName} {record.lastName}</h3>
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record, text) => dayjs(record.createdAt).format("DD-MMM-YYYY")
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => (
                <div className="d-flex">
                    <h3 className="block-section">{record.status}</h3>
                </div>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && <h3 className="block-section" onClick={()=> doctorStatus(record, "approved")}>Approve</h3>}
                    {record.status === "approved" && <h3 className="block-section" onClick={()=> doctorStatus(record, "blocked")}>Block</h3>}
                </div>
            )
        }
    ];
    return (
        <Layout>
            <h3 className="doctors_list">List of Doctors</h3>
            <Table className="users-table" columns={column} dataSource={doctors} />
        </Layout>
    )
}

export default DoctorList;