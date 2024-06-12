import React, { useEffect, useState } from 'react';
import { Input, Layout, Row, Col, Image, Space, Card, Pagination, message, Button } from 'antd';
import axios from 'axios';
import logo from '../../assets/logo.png';
import './index.scss';
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const AdminHome = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const fetchNews = async (page) => {
    try {
      const token = localStorage.getItem('token'); // 获取存储在 localStorage 中的 token
      const response = await axios.get(`http://localhost:8000/admin/home?page=${page}`, {
        headers: {
          'token': `${token}` // 设置请求头
        }
      });
      console.log('Response:', response.data); // 打印响应以进行调试
      setNews(response.data.news);
      setPage(response.data.page);
      setTotalItems(response.data.len * 10); // 假设每页10条新闻
    } catch (error) {
      console.error('Error fetching news:', error);
      message.error('获取新闻失败，请稍后再试');
    }
  };

  const deleteNews = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/admin/home',
        { id },
        {
          headers: {
            'token': `${token}`
          }
        }
      );
      console.log('Response from delete request:', response);
      if (response.status === 200) {
        message.success('新闻删除成功');
        fetchNews(page); // 删除新闻后重新获取新闻列表
      } else {
        message.error('删除新闻失败，请稍后再试');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      message.error('删除新闻失败，请稍后再试');
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const onSearch = (value) => {
    console.log('Search:', value);
    navigate(`/search/${value}`);
  };

  const handlePageChange = (page) => {
    setPage(page);
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
      <Content className="content" style={{ padding: '0 50px', marginTop: '1900px' }}>
        <div style={{ marginTop: '20px' }}>
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            {news.map((item, index) => (
              <Col key={index} span={24} className="card-container">
                <Card 
                  title={<a onClick={() => handleTitleClick(item.id)}>{item.title}</a>} 
                  bordered={false}
                  extra={
                    <Button type="link" danger onClick={() => deleteNews(item.id)}>
                      删除
                    </Button>
                  }
                >
                  <p>{item.department}</p>
                  <p>{item.time}</p>
                  <p>Clicks: {item.click_num}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <Pagination
          current={page}
          total={totalItems}
          pageSize={10}
          onChange={handlePageChange}
          style={{ textAlign: 'center', marginTop: 20 }}
        />
      </Content>
    </Layout>
  );
};

export default AdminHome;
