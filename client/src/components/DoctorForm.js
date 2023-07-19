import React from "react";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import dayjs from "dayjs";

const DoctorForm = ({onFinish, initivalValues}) => {
   
    return(
        <Form layout="vertical" onFinish={onFinish} initialValues={{
            ...initivalValues,
            ...(initivalValues && {
                timing: [
                    dayjs(initivalValues?.timing[0], "HH:mm A"),
                    dayjs(initivalValues?.timing[1], "HH:mm A")
                ]
            })
        }}>
            <h1 className="personal-info">Personal Information</h1>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="First Name/ Tên" name="firstName" rules={[{required: true}]}>
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Last Name/ Họ" name="lastName" rules={[{required: true}]}>
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Phone Number/ Số Điện Thoại" name="phoneNumber" rules={[{required: true}]}>
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Address/ Địa Chỉ" name="address" rules={[{required: true}]}>
                            <Input placeholder="Address" />
                        </Form.Item>
                    </Col>
                    
                </Row>
                <hr/>
                <h1 className="personal-info">Professional Information</h1>
                <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Specialization/ Chuyên Môn" name="specialization" rules={[{required: true}]}>
                            <Input placeholder="Specialization"/>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Experience/ Kinh Nghiệm" name="experience" rules={[{required: true}]}>
                            <Input placeholder="Experience" type="number"/>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Fees/ Phí ($)" name="fee" rules={[{required: true}]}>
                            <Input placeholder="Fees" type="number"/>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Working Time/ Giờ Làm Việc" name="timing" rules={[{required: true}]}>
                        <TimePicker.RangePicker format="HH:mm A" style={{width:"380px"}} />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="submit-btn">
                    <Button type="primary" className="primary-button" htmlType="submit">SUBMIT</Button>
                </div>
        </Form>
    )
}

export default DoctorForm;