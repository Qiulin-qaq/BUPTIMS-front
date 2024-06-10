import React from 'react';
import { Button, Card, ConfigProvider, Form, Image, Input, Space, message } from "antd";
import axios from 'axios';
import logo from '../../assets/logo.png';
import loginBackground from "../../assets/loginbackgroud.svg";
import './index.scss';
import { TinyColor } from "@ctrl/tinycolor";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const colorsLogin = ['#6253E1', '#04BEFE'];
const colorsRegister = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Form submitted with values:', values);  // 调试信息
        try {
            const response = await axios.post('http://localhost:8000/user/login', values, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log('Response:', response);  // 打印响应以进行调试
            if (response.status === 200) {
                message.success('登录成功');
                navigate('/display'); // 跳转到登录后的页面
            } else {
                message.error('登录失败，请检查用户名和密码');
            }
        } catch (error) {
            console.error('登录错误:', error);
            message.error('登录失败，请稍后再试');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('登录失败:', errorInfo);
    };

    const handleRegister = () => {
        navigate('/signup'); // 跳转到注册页面
    };

    return (
        <div className="login-wrapper">
            <Space>
                <Image src={loginBackground}
                    width={1000}
                    height={800}
                    preview={false} />
                <Card size="default" className="login-container">
                    <img src={logo} alt="logo" className="login-logo" />
                    <Form
                        labelCol={{ span: 4, offset: 1 }}
                        style={{ maxWidth: 600 }}
                        validateTrigger="onBlur"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            wrapperCol={{ span: 16 }}
                            labelAlign="left"
                            name="phone"
                            label="手机号码"
                            rules={[{ required: true, message: "手机号码不能为空" }]}
                        >
                            <Input prefix={<UserOutlined />} size="large" placeholder="请输入手机号码" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ span: 16 }}
                            labelAlign="left"
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: "密码不能为空" }]}
                        >
                            <Input.Password prefix={<LockOutlined />} size="large" placeholder="请输入密码" />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <ConfigProvider theme={{
                                    components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(135deg, ${colorsRegister.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colorsRegister).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colorsRegister).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                    },
                                }}>
                                    <Button type="primary" size="large" onClick={handleRegister}>
                                        注册
                                    </Button>
                                </ConfigProvider>
                                <ConfigProvider theme={{
                                    components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(116deg,  ${colorsLogin.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colorsLogin).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colorsLogin).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                    },
                                }}>
                                    <Button type="primary" htmlType="submit" size="large">
                                        登录
                                    </Button>
                                </ConfigProvider>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>
    );
};

export default Login;
