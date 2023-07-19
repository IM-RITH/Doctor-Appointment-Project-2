import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import Layout from "../components/Layout";
// import { Button, Col, Form, Input, Row, TimePicker} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showloading, hideloading } from "../redux/alertSlice";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";


const ApplyToDoctor = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/user/apply-doctor", 
            {
                ...values, 
                userId : user._id,
                timing: [
                    dayjs(values.timing[0]).format("HH:mm A"),  // from
                    dayjs(values.timing[1]).format("HH:mm A")   // to
                ]
            },
            {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
            );
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
            
        } catch (error) {
            dispatch(hideloading());
            toast.error("Something wrong");
        }
    }
    return (
        <Layout>
            <h1 className="page">Apply To Become A Doctor</h1>
            <hr/>
            <DoctorForm onFinish={onFinish}/>
            
        </Layout>
    )
}

export default ApplyToDoctor;