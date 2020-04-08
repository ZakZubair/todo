import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkIn from '../../assets/img/check-in.svg';

class Item extends Component {
  constructor(props) {
    super(props);
    const { name, description } = this.props;
    this.state = {
      editingName: name,
      editingDescription: description,
      isEditing: false,
    };
  }

  // Handle onChange event for name input
  handleEditNameChange = (e) => {
    e.stopPropagation();
    this.setState({
      editingName: e.target.value,
    });
  }

  // Handle onChange event for description input
  handleEditDescriptionChange = (e) => {
    e.stopPropagation();
    this.setState({
      editingDescription: e.target.value,
    });
  }

  render() {
    const { isEditing, editingName, editingDescription } = this.state;
    const {
      id, name, description, date, dateUpdated, checked, onToggle, onRemove, onEdit,
    } = this.props;

    const {
      handleEditNameChange,
      handleEditDescriptionChange,
    } = this;

    return (
      <div className="item" onClick={() => onToggle(id)} onKeyPress={() => onToggle(id)} role="button" tabIndex={id}>
        <div className="item__check-mark">
          { checked && (
          <img src={checkIn} alt="checked" />
          ) }
        </div>
        <div className={`item__text ${checked ? 'item__checked' : ''}`}>
          {!isEditing ? <p className="item__text__name"><span>{name}</span></p> : (
            <input
              value={editingName}
              onChange={handleEditNameChange}
              placeholder="Name"
              className="name"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyPress={(e) => {
                e.stopPropagation();
              }}
            />
          )}
          {!isEditing ? <p className="item__text__description">{description}</p> : (
            <input
              value={editingDescription}
              onChange={handleEditDescriptionChange}
              placeholder="Description"
              className="description"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyPress={(e) => {
                e.stopPropagation();
              }}
            />
          )}
          <p className="item__text__date">{dateUpdated ? `Updated at ${dateUpdated}` : `Created at ${date}`}</p>
        </div>
        {!checked && !isEditing && (
          <button
            className="item__edit"
            onClick={(e) => {
              e.stopPropagation();
              this.setState({
                isEditing: true,
              });
            }}
            type="button"
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            className="item__edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id, editingName, editingDescription);
              this.setState({
                isEditing: false,
              });
            }}
            type="button"
          >
            Done editing
          </button>
        )}
        <button
          className="item__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          type="button"
        >
          &times;
        </button>
      </div>
    );
  }
}

Item.defaultProps = {
  dateUpdated: '',
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateUpdated: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Item;
