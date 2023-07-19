import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { showloading, hideloading } from "../../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import dayjs from "dayjs";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const getUsersData = async () => {
        try {
            dispatch(showloading());
            const response = await axios.get("/api/admin/All-Users", {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideloading());
            if(response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            dispatch(hideloading());
        }
    };

    useEffect(() => {
        getUsersData();
    }, []);

    // create column for users

    const column = [
        {
            title: "Username",
            dataIndex: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record, text) => dayjs(record.createdAt).format("DD-MMM-YYYY")
        },
        // {
        //     title: "Actions",
        //     dataIndex: "actions",
        //     render: (text, record) => (
        //         <div className="d-flex">
        //             <h3 className="block-section">Block</h3>
        //         </div>
        //     )
        // }
    ];

    return (
       <Layout>
            <h3 className="users_list">List of Users</h3>
            <Table className="users-table" columns={column} dataSource={users} />
       </Layout>
    )
}

export default UserList;