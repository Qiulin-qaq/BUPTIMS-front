import React from 'react';
import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";
import './index.scss';

const Signup = () => {
    const onFinish = async (values) => {
        console.log(values);
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
                        <Button shape={"round"} type="primary" htmlType="submit" size="large" href={"/user/login"} block>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Signup;
