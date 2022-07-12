import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Typography, Form, Input, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import httpClient from './../../helpers/httpClient';
import { openNotification } from './../../utils';
import AuthTypes from './../../constants/authTypes';
import './styles/style.css';

const { Title } = Typography;
const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onFinish (values) {
        const loginRequest = await httpClient().post("/apiv1/user/login",{
            username: values.username,
            password: values.password
        });
        if (loginRequest.error){
            openNotification("error", "Inicio de sesión", "No se pudo iniciar sesión. Por favor intenta nuevamente.")
        }else{
            dispatch({
                type: AuthTypes.LOGIN,
                token: loginRequest.data.access_token
            });
            navigate("/home");
        }
    };

    const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
    };

    return (
            <Row>
                <Col span={8}></Col>
                <Col span={8} className="login-container">
                    <Typography>
                        <Title>Ingreso a artículos</Title>
                    </Typography>
                    <Divider />
                    <Form
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 19,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Debes ingresar el username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Debes ingresar el password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 5,
                                span: 19,
                            }}
                        >
                            <Button icon={<UploadOutlined />} type="primary" htmlType="submit">
                                Ingresar
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                </Col>
                <Col span={8}></Col>
            </Row>
    );
};

export default Login;