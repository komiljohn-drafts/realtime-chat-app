import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import query from 'query-string';
import { useHistory } from 'react-router';
import { Input, message as mesinfo } from 'antd';

let socket;

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:5000';
  const history = useHistory();

  useEffect(() => {
    const { room, name } = query.parse(history.location.search);

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
    socket.on('message', (m) => {
      setMessages([...messages, m]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(messages);

  return (
    <>
      <div>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
          placeholder="Write a message..."
        />
      </div>
    </>
  );
}

export default Chat;
