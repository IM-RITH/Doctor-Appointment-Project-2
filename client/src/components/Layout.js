import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import "../layout.css"
import { Badge } from "antd";
const Layout = ({children}) => {
    const {user} = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    // menu 
    const menu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-8-fill"
        },
        {
            name: "Appointments",
            path: "/appointment",
            icon: "ri-file-list-3-fill"
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "ri-nurse-fill"
        },
    ];

    //doctor menu
    const DoctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-8-fill"
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "ri-profile-fill"
        },
        {
            name: "Appointments",
            path: "/doctor/appointment",
            icon: "ri-file-list-3-fill"
        },
    ];
    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-2-fill"
        },
        {
            name: "List of Users",
            path: "/admin/list-of-users",
            icon: "ri-user-3-fill"
        },
        {
            name: "List of Doctors",
            path: "/admin/list-of-doctors",
            icon: "ri-nurse-fill"
        },
    
    ];
    // render ( if user is the admin => show admin menu, If user is the doctor => show doctor menu, if user => show usermenu)
    const menuToBeRender = user?.isAdmin ? adminMenu : user?.isDoctor ? DoctorMenu : menu; 
    const role =  user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
    return (
        <div className="MainContainer">
            <div className="d-flex layout">
                <div className="side-bar-user">
                    <div className="user">
                        <Link className="user_name" to="/profile">{user?.username} ({role})</Link>
                    </div>
                    <div className="sidebar">
                        <div className="menu">
                            {menuToBeRender.map((menu) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <div className={`d-flex menu-item ${isActive && "active-menu"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                )
                            })}
                            <div className="d-flex menu-item" onClick={()=> {localStorage.clear()
                                navigate("login")
                            }}>
                            <i class="ri-logout-circle-line"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                            {/* <img style={{width:"200px", height:"auto",marginTop:"35px", borderRadius:"20px"}} src="https://www.pngkit.com/png/detail/100-1007755_doctor-and-patient-icon.png"/> */}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        <Badge count={user?.unseenNoti.length} onClick={() => navigate("/notifications")}>
                            <i className="ri-notification-3-fill notification-icon mr-2"></i>
                        </Badge>
                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Layout;