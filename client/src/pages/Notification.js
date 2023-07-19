import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";

const Notification = () => {
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const MarkAllAsRead = async () => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/user/mark-all-as-read", {userId : user._id}, {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
            
        } catch (error) {
            dispatch(hideloading());
            toast.error("Something wrong");
        }
    }
    // delete notification
    const Delete_Notification = async () => {
        try {
            dispatch(showloading());
            const response = await axios.post("/api/user/delete-notification", {userId : user._id}, {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideloading());
            if(response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
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
            <h1 className="notification-bar">Notifications</h1>
            <Tabs className="tab">
                <Tabs.TabPane className="Unread-notifi" tab="UnRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="Mark-all" onClick={()=> MarkAllAsRead()}>Mark All As Read</h4>
                    </div>
                    {user?.unseenNoti.map((notifications) => (
                        <div className="card1 p-2" onClick={() => navigate(notifications.onclickPatch)}>
                            <div className="card-text">{notifications.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane className="read-notifi" tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="delete" onClick={()=> Delete_Notification()}>Delete All</h4>
                    </div>
                    {user?.seenNoti.map((notifications) => (
                        <div className="card1 p-2" onClick={() => navigate(notifications.onclickPatch)}>
                            <div className="card-text">{notifications.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notification;