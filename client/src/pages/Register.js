import React from "react";
import {Form, Input, Button} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideloading, showloading } from "../redux/alertSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/user/register", values);
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
                toast("Welcome to login page");
                navigate("/login");
            } else {
                toast.error(response.data.message);
            }
            
        } catch (error) {
            dispatch(hideloading());
            toast.error("Something wrong");
        }
    }
    return (
        <div className="container-register">
            <div className="register-form card p-3">
                <h1 className="card-title">Register Page</h1>
                <Form layout="vertical" className="form" onFinish={onFinish}>
                    <Form.Item label="Username" name="username" rules={[{required: true}]}>
                        <Input placeholder="Username"/>
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{required: true}]}>
                        <Input placeholder="Email"/>
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{required: true}]}>
                        <Input.Password placeholder="Password"/>
                    </Form.Item>
                    <Button className="register-button my-2" htmlType="submit">REGISTER</Button>
                    <Link className="link-back-login" to={'/login'}>BACK TO LOGIN</Link>
                </Form>
            </div>
        </div>
    )
}
export default Register;