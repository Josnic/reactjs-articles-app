import { Row, Col, Divider, Typography, Tooltip, Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import httpClient from './../../helpers/httpClient';
import ArticleList from './components/ArticleList';
import AuthTypes from './../../constants/authTypes';
const { Title } = Typography;
const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationOptions, setPaginationOptions] = useState({
    limit: 10,
    offset: 0,
    perPage: 10
  });

  const loadArticles = async () =>{
    setLoading(true);
    setHasError(false);
    const articles = await httpClient.get("/apiv1/articles/all?limit="+paginationOptions.limit+"&offset="+paginationOptions.offset);
    if (articles.error){
      setHasError(true);
    }else{
      setData(articles.data);
    }
    setLoading(false);
  }

  const onChangePagination = (current, pageSize) => {
    if (current !== page){
      setPage(current);
      const paginationOptionsCopy = Object.assign({} , paginationOptions)
      paginationOptionsCopy.offset = (current * paginationOptions.perPage) - paginationOptions.perPage;
      setPaginationOptions(paginationOptionsCopy);
    }
  };

  const closeSession = () =>{
    dispatch({
      type: AuthTypes.LOGOUT
    });
    navigate("/");
  }

  useEffect(() => {
    async function fetchData() {
      await loadArticles();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await loadArticles();
    }
    fetchData();
  }, [paginationOptions]);

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Typography>
            <Title 
              style={{textAlign: 'center'}}
            >
              Artículos
                <Tooltip 
                  title="Cerrar sesión">
                    <Button 
                        onClick={closeSession}
                        type="default" 
                        style={{marginLeft:'10px', top:'-5px'}}
                        shape="round" 
                        icon={<LogoutOutlined 
                                style={{ fontSize: '12px', color: '#08c', cursor:'pointer' }} 
                            />
                        } 
                    />
                </Tooltip>
          </Title> 
        </Typography>
        <Divider />
        {hasError ?
        <Result
          status="error"
          title="Sin datos"
          subTitle="No se pudo cargar datos"
          extra={<Button onClick={loadArticles} type="primary">Intentar de nuevo</Button>}
        />
        :
        <ArticleList
          loading={loading}
          data={data}
          defaultCurrent={page}
          pageSizeOptions={paginationOptions.perPage}
          onChangePagination={onChangePagination}
        />
        }
        <Divider />
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default Home;