import React from 'react';
import PropTypes from 'prop-types';

const Form = ({
  name, description, onChangeName, onChangeDescription, onCreate, onKeyPress,
}) => (
  <div className="input">
    <input value={name} onChange={onChangeName} placeholder="Name" />
    <input value={description} onChange={onChangeDescription} placeholder="Description" onKeyPress={onKeyPress} />
    <button className="input__create-button" onClick={onCreate} type="button">
      +
    </button>
  </div>
);

Form.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};
export default Form;
