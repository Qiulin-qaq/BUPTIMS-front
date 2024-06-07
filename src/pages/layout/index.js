
import {Menu, Button, Input, Layout, Row, Col, Image, Space, Card} from 'antd';
import {
    SearchOutlined,
    GithubOutlined,
    AudioOutlined,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined
} from '@ant-design/icons';
import logo from '../../assets/logo.png';
import './index.scss';
import {Content, Header} from "antd/es/layout/layout";

const {Search} = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const items = [
    {
        label: 'todo1',
        style: {marginRight: '20px'},

    },
    {
        label: 'todo2',
        style: {marginRight: '20px'},


    },
    {
        label: 'todo3',
        style: {marginRight: '20px'},

    },
    {
        label: 'todo4',
        style: {marginRight: '20px'},


    },


];
const Home = () => {


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header className={"header"}>
                <div>
                    <Row style={{flexFlow: 'nowrap', height: '80px'}} align="middle">
                        <Col xs={50} sm={50} md={6} lg={6} xl={5} xxl={4}>
                            <Image src={logo} height="10" width="200" alt="logo" preview={false}/>
                        </Col>
                        <Col lg={18} xl={19} xxl={20}>
                            <Space>
                                <Search
                                    placeholder="input search text"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={onSearch}
                                    style={{marginTop: '15px', width: '500px'}}

                                />

                                <Menu mode="horizontal" style={{lineHeight: '50px', marginLeft: '20px'}} items={items}>

                                </Menu>
                            </Space>


                        </Col>
                    </Row>
                </div>
            </Header>
            <Content style={{padding: '0 50px', marginTop: 200}}>
                <Card
                    title="Card title"
                    bordered={false}
                    style={{
                        width: 500,

                    }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>

            </Content>
        </Layout>)
};

export default Home;

