import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({
  justifyContent, alignItems, children, style,
}) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      justifyContent,
      alignItems,
      ...style,
    }}
  >
    {children}
  </div>
);
Flex.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center',
  style: '',
};
Flex.propTypes = {
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  style: PropTypes.node,
  children: PropTypes.element.isRequired,
};
export default Flex;
