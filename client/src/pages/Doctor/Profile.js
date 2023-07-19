import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Layout from "../../components/Layout";
// import { Button, Col, Form, Input, Row, TimePicker} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showloading, hideloading } from "../../redux/alertSlice";
import {toast} from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";

const DoctorProfile = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const onFinish = async (values) => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/doctor/update-doctor-profile", 
            {
                ...values, 
                userId : user._id,
                // format time
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
    };

    const getDoctorData = async () => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/doctor/getDoctorInfo-by-id", { userId : params.userId }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideloading());
            if(response.data.success) {
                setDoctor(response.data.data)
            }
        } catch (error) {
            dispatch(hideloading());
        }
    }
    useEffect(()=> {
        getDoctorData();
    }, []);
    
    return(
        <Layout>
            <h3 className="dr-profile">Doctor Profile</h3>
            <hr/>
            {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor}/>}
        </Layout>
    )
}

// initialValues to fill the form of doctor profile
export default DoctorProfile;