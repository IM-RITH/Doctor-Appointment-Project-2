import React from 'react'
import { Navigate } from 'react-router-dom';

// to back to login or register page => delete token of uder from localStorage
const PublicRoute = (props) => {
    if(localStorage.getItem("token")) {
        return <Navigate to={"/"}/>;
    } else {
        return props.children;
    }
}

export default PublicRoute