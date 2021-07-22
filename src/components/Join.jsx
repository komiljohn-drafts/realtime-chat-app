import React from 'react';
import {
  Form, Input, Button, Typography, message,
} from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

message.config({ top: 100 });

const Join = () => {
  const history = useHistory();

  const onFinish = (v) => {
    history.push(`/chat/?room=${v.room}&name=${v.name}`);
  };

  const onFinishFailed = () => {
    message.error('Fill the all fields((', 3);
  };

  return (
    <div className="formWrapper">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title className="title">Muloqot</Title>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input className="joinInput" placeholder="Your Name" />
        </Form.Item>

        <Form.Item
          name="room"
          rules={[
            {
              required: true,
              message: 'Please input your room!',
            },
          ]}
        >
          <Input className="joinInput" placeholder="Your room" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Start
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Join;
