import React, { useEffect, useState } from 'react';
import { Input, Layout, Row, Col, Image, Space, Card, message } from 'antd';
import axios from 'axios';
import logo from '../../assets/logo.png';
import './index.scss';
import { Content, Header } from "antd/es/layout/layout";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const SearchPage = () => {
  const [news, setNews] = useState([]);
  const { keyword } = useParams();
  const navigate = useNavigate();

  const fetchNews = async (keyword) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/home/search`, {
        params: { keyword },
        headers: {
          'token': `${token}`
        }
      });
      console.log('Response:', response.data);
      setNews(response.data.news);
    } catch (error) {
      console.error('Error fetching news:', error);
      message.error('获取新闻失败，请稍后再试');
    }
  };

  useEffect(() => {
    fetchNews(keyword);
  }, [keyword]);

  const onSearch = (value) => {
    console.log('Search:', value);
    navigate(`/search/${value}`);
  };

  const handleTitleClick = (id) => {
    window.open(`/news/${id}`, '_blank');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div>
          <Row style={{ flexFlow: 'nowrap', height: '80px' }} align="middle" justify="space-between">
            <Col xs={24} sm={12} md={6} lg={6} xl={5} xxl={4}>
              <Image src={logo} height="10" width="200" alt="logo" preview={false} />
            </Col>
            <Col xs={24} sm={12} md={18} lg={18} xl={19} xxl={20} style={{ display: 'flex', justifyContent: 'center' }}>
              <Space>
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                  style={{ marginTop: '15px', width: '500px' }}
                />
              </Space>
            </Col>
          </Row>
        </div>
      </Header>
      <Content className="content" style={{ padding: '0 50px', marginTop: '100px' }}>
        <div style={{ marginTop: '20px' }}>
          <Row gutter={[16, 16]}>
            {(news || []).map((item, index) => (
              <Col key={index} span={24} className="card-container">
                <Card title={<a onClick={() => handleTitleClick(item.id)}>{item.title}</a>} bordered={false}>
                  <p>{item.department}</p>
                  <p>{item.time}</p>
                  <p>Clicks: {item.click_num}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default SearchPage;
