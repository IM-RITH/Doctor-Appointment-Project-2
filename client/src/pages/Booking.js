import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showloading, hideloading } from "../redux/alertSlice";
import {toast} from "react-hot-toast";
import { useParams } from "react-router-dom";
// import DoctorForm from "../components/DoctorForm";
import { Button, Col, Row, TimePicker, DatePicker } from "antd";
const Booking = () => {
    const [date, setDate] = useState();
    const [time, setTime] = useState(); 
    const {user} = useSelector((state)=> state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    // const [isAvailable, setIsAvailable] = useState(false);

    const getDoctorData = async () => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/doctor/DoctorInfo-by-id", { doctorId : params.doctorId }, {
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
    };

    // check available function
    // const checkAvailable = async () => {
    //     try {
    //         dispatch(showloading());
    //         const response = await axios.post("/api/user/check-available", { 
    //             doctorId : params.doctorId,
    //             date : date,
    //             time : time,
    //         }, 
    //         {
    //             headers: {
    //                 authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         });
    //         dispatch(hideloading());
    //         if(response.data.success) {
    //             toast.success(response.data.message);
    //         } else {
    //             toast.error(response.data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Opp!! someting wrong");
    //         dispatch(hideloading());
    //     }
    // } 

    // call api for booking
    const bookingNow = async () => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/user/booking-appointment", { 
                doctorId : params.doctorId,
                userId : user._id,
                doctorInfo : doctor,
                userInfo : user,
                date : date,
                time : time,
            }, 
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
        
            toast.error("Opp!! cannot booking appointment");
            dispatch(hideloading());
        }
    };
    useEffect(()=> {
        getDoctorData();
    }, []);
    
    return(
        <Layout>
           {doctor && (
             <div className="title2">
                <h3 className="card-title2"><i class="ri-nurse-fill"></i> Doctor: {doctor.firstName} {doctor.lastName}</h3>
                <hr/>
                <Row className="booking">
                    <Col span={8} xs={24} sm={24} lg={8}>
                    <h3 className="specialize"><i style={{color:"goldenrod"}} class="ri-menu-line"></i> Specialization: {doctor.specialization}</h3>
                    <hr/>
                    <h3 className="phoneNumber"><i style={{color:"goldenrod"}}  class="ri-phone-fill"></i> Phone Number: {doctor.phoneNumber}</h3>
                    <hr/>
                    <h3 className="fees"><i style={{color:"goldenrod"}}  class="ri-money-dollar-circle-fill"></i> Fees: {doctor.fee} ($)</h3>
                    <hr/>
                    <h3 className="time"><i style={{color:"goldenrod"}}  class="ri-time-fill"></i> Time: {doctor.timing[0]} - {doctor.timing[1]}</h3>
                    <hr/>
                    {/* check isAvailable or not */}
                    <div className="d-flex flex-column date_time">
                        <DatePicker format="dddd, DD-MMM-YYYY" onChange={(value)=> setDate(dayjs(value).format("dddd, DD-MMM-YYYY"))}/>
                        <TimePicker format="HH:mm A" className="mt-3" onChange={(value)=> setTime(dayjs(value).format("HH:mm A"))}/>
                        {/* <Button className="primary-button mt-3" onClick={checkAvailable}>Check Available</Button> */}
                        <hr/>
                        <Button className="primary-button mt-3 booking-btn" onClick={bookingNow}>BOOKING NOW</Button>
                        <hr/>
                    </div>
                    </Col>
                </Row>
            </div>
           )}
        </Layout>
    )
}
export default Booking;