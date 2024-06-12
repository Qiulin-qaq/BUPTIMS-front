import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Image, Card, message } from 'antd';
import axios from 'axios';
import logo from '../../assets/logo.png';
import './index.scss';
import { Content, Header } from "antd/es/layout/layout";
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const [newsDetail, setNewsDetail] = useState(null);
  const { id } = useParams();

  const fetchNewsDetail = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/home/detail?id=${id}`, {
        headers: {
          'token': `${token}`
        }
      });
      const formattedContent = response.data.content
        .split('\n\n').map(paragraph => `<p>${paragraph.split('\n').join('<br/>')}</p>`).join('');

      setNewsDetail({
        ...response.data,
        content: formattedContent
      });
    } catch (error) {
      console.error('Error fetching news detail:', error);
      message.error('获取新闻详情失败，请稍后再试');
    }
  };

  useEffect(() => {
    fetchNewsDetail(id);
  }, [id]);



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div>
          <Row style={{ flexFlow: 'nowrap', height: '80px' }} align="middle" justify="space-between">
            <Col xs={24} sm={12} md={6} lg={6} xl={5} xxl={4}>
              <Image src={logo} height="10" width="200" alt="logo" preview={false} />
            </Col>
          </Row>
        </div>
      </Header>
      <Content className="content" style={{ padding: '0 50px', marginTop: '100px' }}>
        {newsDetail ? (
          <Card title={newsDetail.title} bordered={false}>
            <p>{newsDetail.department}</p>
            <p>{newsDetail.time}</p>
            <div dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
            <p>Clicks: {newsDetail.click_num}</p>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Content>
    </Layout>
  );
};

export default NewsDetail;
