import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Item from '../Item';

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
          date={dayjs(dateCreated).format('DD/MM/YY  h:mm a')}
          dateUpdated={dateUpdated ? dayjs(dateUpdated).format('DD/MM/YY  h:mm a') : ''}
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
