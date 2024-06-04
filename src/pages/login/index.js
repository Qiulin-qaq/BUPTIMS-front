import {Button, Card, Form, Input} from "antd";
import logo from '../../assets/logo.png'
import './index.scss'

const Login = () => {


    return (
        <div>
            <Card size={"default"} className={"login-container"}>
                <img src={logo} alt={"logo"} className={"login-logo"}/>
                <Form>
                    <Form.Item>
                        <Input size={"large"} placeholder={"请输入账号"}/>
                    </Form.Item>

                    <Form.Item>
                        <Input size={"large"} placeholder={"请输入密码"}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type={"default"} htmlType={"submit"} size={"large"} block>
                            注册
                        </Button>
                        <Button type={"primary"} htmlType={"submit"} size={"large"} block>
                            登录
                        </Button>
                    </Form.Item>

                </Form>
            </Card>

        </div>
    )
}

export default Login