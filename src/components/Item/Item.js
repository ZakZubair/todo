import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import checkIn from '../../assets/img/check-in.svg';

class Item extends PureComponent {
  render() {
    const {
      id, name, description, date, checked, onToggle, onRemove, onEdit,
    } = this.props;

    return (
      <div className="item" onClick={() => onToggle(id)} onKeyPress={() => onToggle(id)} role="button" tabIndex={id}>
        <div className="item__check-mark">
          { checked && (
          <img src={checkIn} alt="checked" />
          ) }
        </div>
        <div className={`item__text ${checked ? 'item__checked' : ''}`}>
          <p className="item__text__name"><span>{name}</span></p>
          <p className="item__text__description">{description}</p>
          <p className="item__text__date">{`Created at ${date}`}</p>
        </div>
        <button
          className="item__edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          type="button"
        >
          Edit
        </button>
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

Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Item;
