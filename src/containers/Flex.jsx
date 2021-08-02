import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({
  justify, align, flexDirection, height, children, style,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection,
      width: '100%',
      height,
      justifyContent: justify,
      alignItems: align,
      ...style,
    }}
  >
    {children}
  </div>
);

Flex.defaultProps = {
  justify: 'center',
  flexDirection: 'row',
  align: 'center',
  height: '100vh',
  style: '',
};

Flex.propTypes = {
  justify: PropTypes.string,
  align: PropTypes.string,
  style: PropTypes.node,
  children: PropTypes.element.isRequired,
  flexDirection: PropTypes.string,
  height: PropTypes.string,
};

export default Flex;
