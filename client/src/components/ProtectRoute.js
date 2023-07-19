import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideloading, showloading } from "../redux/alertSlice";

const ProtectRoute = (props) => {
    const {user} = useSelector((state)=> state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUser = async () => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/user/getInfo", {token : localStorage.getItem("token")}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideloading());
            if(response.data.success) {
                dispatch(setUser(response.data.data));
            } else {
                localStorage.clear();
                navigate("/login");
            }
        } catch (error) {
            dispatch(hideloading());
            localStorage.clear();
            navigate("/login");
        }
    }
    useEffect(()=> {
        if(!user) {
            getUser();
        }
    }, [user])
    // if localstorage doesnt have token => (example delete token from localstorage => go to login   page) user must to login
    if(localStorage.getItem("token")) {
        return props.children;
    } else {
        return <Navigate to={"/login"}/>;
    }  
}

export default ProtectRoute;