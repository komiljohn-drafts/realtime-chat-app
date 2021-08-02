/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import ReactEmoji from 'react-emoji';
import Flex from '../containers/Flex';

const Message = ({
  message, color, name,
}) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (name === message.user) {
      setIsCurrent(true);
    }
  }, [name, message.user]);

  useEffect(() => {
    if (message.user === 'admin') {
      setIsAdmin(true);
    }
  }, [message]);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <Flex
      height="initial"
      justify={isAdmin
        ? 'center'
        : (isCurrent
          ? 'flex-end'
          : 'flex-start')}
    >
      <div
        className="messageWrapper"
        style={
          isAdmin ? {
            borderRadius: '7px',
            background: '#6B778D',
          } : (
            isCurrent ? {
              background: '#0f4c75',
              borderBottomRightRadius: 0,
            } : {
              borderBottomLeftRadius: 0,
            }
          )
        }
      >
        <Typography
          className="author"
          style={{ color }}
        >
          { !isCurrent && !isAdmin && capitalizeFirstLetter(message.user) }
        </Typography>
        <Typography className="message">
          {ReactEmoji.emojify(message.text)}
        </Typography>
      </div>
    </Flex>
  );
};

export default Message;
