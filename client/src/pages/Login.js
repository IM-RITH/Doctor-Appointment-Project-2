import React from "react";
import {Form, Input, Button} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideloading, showloading } from "../redux/alertSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/user/login", values);
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.token);
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
        <div className="container-register">
            <div className="login-form card p-3">
                <h1 className="card-title">Login Page</h1>
                <Form layout="vertical" className="form" onFinish={onFinish}>
                    <Form.Item label="Email" name="email" rules={[{required: true}]}>
                        <Input placeholder="Email"/>
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{required: true}]}>
                        <Input.Password placeholder="Password"/>
                    </Form.Item>
                    <Button className="register-button my-2" htmlType="submit">LOGIN</Button>
                    <Link className="link-back-login" to={'/register'}>CLICK TO REGISTER</Link>
                </Form>
            </div>
        </div>
    )
}
export default Login;