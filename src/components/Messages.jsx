/* eslint-disable react/prop-types */
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from '@emotion/css';
import randomColor from 'randomcolor';
import key from 'weak-key';
import Message from './Message';

const ROOT_CSS = css('height: calc(100% - 40px);');

const color = randomColor({ luminosity: 'light', count: 1 });

const Messages = ({ messages, room, name }) => (
  <ScrollToBottom className={ROOT_CSS}>
    <div style={{ padding: '10px 15px' }}>
      {messages.map((m) => (
        <Message
          room={room}
          name={name}
          key={key(m)}
          color={color}
          message={m}
        />
      ))}
    </div>
  </ScrollToBottom>
);

export default Messages;
