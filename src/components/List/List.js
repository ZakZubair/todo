import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import { getFormattedTime } from '../../helpers';

class List extends PureComponent {
  render() {
    const {
      listItems,
      onToggle,
      onEdit,
      onRemove,
    } = this.props;

    const todoList = listItems && listItems.length > 0 && listItems.map(
      ({
        id,
        name,
        description,
        checked,
        dateCreated,
        dateUpdated,
      }) => (
        <Item
          id={id}
          name={name}
          description={description}
          date={getFormattedTime(dateCreated)}
          dateUpdated={dateUpdated ? getFormattedTime(dateUpdated) : ''}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
          key={id}
        />
      ),
    );

    return (
      <div className="list-container">
        {todoList && todoList}
      </div>
    );
  }
}

List.defaultProps = {
  listItems: [],
};

List.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.any),
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default List;
