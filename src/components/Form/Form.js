import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';

const Form = ({
  name, description, onChangeName, onChangeDescription, onCreate, onKeyPress,
}) => (
  <div className="form">
    <Input name="name" value={name} onChange={onChangeName} placeholder="Name" />
    <Input name="description" value={description} onChange={onChangeDescription} placeholder="Description" onKeyPress={onKeyPress} />
    <Button onClick={onCreate}>+</Button>
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
