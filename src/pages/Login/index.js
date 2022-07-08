import React from 'react';

import './styles/style.css';

import { Button, Divider, Typography, Form, Input, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Title } = Typography;

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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