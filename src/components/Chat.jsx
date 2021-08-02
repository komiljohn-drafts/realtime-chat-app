import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import query from 'query-string';
import { useHistory } from 'react-router';
import {
  Layout,
  Menu,
  Input,
  Row,
  Col,
  message as mesinfo,
  Button,
} from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  MinusOutlined,
  BorderOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import key from 'weak-key';

import Flex from '../containers/Flex';
import Messages from './Messages';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

let socket;

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const ENDPOINT = 'https://react-socket-realtime-chat-app.herokuapp.com/';
  const history = useHistory();

  const { room, name } = query.parse(history.location.search);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit(
      'join',
      { room, name },
      (error) => error && mesinfo.error(error),
    );

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, history.location.search]);

  useEffect(() => {
    socket.on('roomData', ({ users }) => setUsers(users));
    socket.on('message', (m) => {
      setMessages((prev) => [...prev, m]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <>
      <Layout style={{ maxWidth: '900px' }}>
        <div style={{ backgroundColor: '#303841' }}>
          <Row justify="end" color="red">
            <Col>
              <Button
                className="controls"
                type="text"
                size="small"
                icon={<MinusOutlined />}
              />
              <Button
                className="controls"
                type="text"
                size="small"
                icon={<BorderOutlined />}
              />
              <Button
                className="controls"
                type="text"
                size="small"
                icon={<CloseOutlined />}
              />
            </Col>
          </Row>
        </div>
        <Layout>
          <Sider style={{ background: '#303841' }} collapsible>
            <Menu
              style={{ backgroundColor: '#002140' }}
              theme="dark"
              mode="inline"
              selectable={false}
            >
              <Menu.Item key="1" icon={<UserOutlined />}>
                {name}
              </Menu.Item>
              <SubMenu key="sub1" icon={<TeamOutlined />} title={room}>
                { users.map(
                  (user) => (<Menu.Item key={key(user)}>{user.name}</Menu.Item>),
                )}
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ background: '#1B262C' }}>
            <Flex
              height="600px"
              align="initial"
              flexDirection="column"
              justify="space-between"
            >
              <>
                <Messages room={room} name={name} messages={messages} />
                <div>
                  <Input
                    size="large"
                    type="text"
                    value={message}
                    className="joinInput"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=" Write a message..."
                  />
                </div>
              </>
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Chat;
