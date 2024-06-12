import React from 'react';
import { Button, Card, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";
import './index.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8000/user/signup', values);
            if (response.status === 200) {
                message.success('注册成功');
                navigate('/login');
            } else {
                message.error('注册失败，请稍后再试');
            }
        } catch (error) {
            console.error('注册错误:', error);
            message.error('注册失败，请稍后再试');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };

    return (
        <div className="signup-wrapper">
            <Card size="default" className="signup-container" type="inner">
                <img src={logo} alt="logo" className="signup-logo" />
                <Form
                    labelCol={{ span: 5, offset: 1 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                    style={{ maxWidth: 600 }}
                    validateTrigger="onBlur"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: "用户名不能为空" }]}
                    >
                        <Input prefix={<UserOutlined />} size="large" placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="手机号"
                        rules={[
                            { required: true, message: "手机号不能为空" },
                            { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号" }
                        ]}
                    >
                        <Input prefix={<PhoneOutlined />} size="large" placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: "密码不能为空" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} size="large" placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: "确认密码不能为空" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} size="large" placeholder="请再次输入密码" />
                    </Form.Item>

                    <Form.Item wrapperCol={{
                        offset: 4,
                        span: 15
                    }}>
                        <Button shape={"round"} type="primary" htmlType="submit" size="large" block>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Signup;
