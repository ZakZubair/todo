import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  onClick, children, className,
}) => (
  <button className={className} onClick={onClick} type="button">
    {children}
  </button>
);

Button.defaultProps = {
  children: null,
  className: 'button__add',
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
export default Button;
