import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  value, placeholder, onChange, onKeyPress, onClick, className,
}) => (
  <input
    className={className}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    onKeyPress={onKeyPress}
    onClick={onClick}
  />
);

Input.defaultProps = {
  placeholder: '',
  onKeyPress: null,
  onClick: null,
  className: 'input',
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
export default Input;
