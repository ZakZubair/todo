import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Item from './Item';

const mockCallBack = jest.fn();
const props = {
  id: 'abc123',
  name: 'Test name',
  description: 'Test description',
  date: 'Date time',
  checked: false,
  onToggle: mockCallBack,
  onRemove: mockCallBack,
  onEdit: mockCallBack,
};

describe('test Item component', () => {
  it('render correctly item component', () => {
    const ItemComponent = renderer.create(<Item {...props} />).toJSON();
    expect(ItemComponent).toMatchSnapshot();
  });

  it('render item correctly with values', () => {
    const ItemComponent = mount(<Item {...props} />);
    expect((ItemComponent).prop('name')).toEqual('Test name');
    expect((ItemComponent).prop('description')).toEqual('Test description');
    expect((ItemComponent).prop('date')).toEqual('Date time');
    expect((ItemComponent).prop('checked')).toEqual(false);
    expect(ItemComponent.state().isEditing).toBeFalsy();
  });

  it('check the item is not editing', () => {
    const ItemComponent = mount(<Item {...props} />);
    expect(ItemComponent.state().isEditing).toBeFalsy();
  });

  it('check the item is editing', () => {
    const ItemComponent = mount(<Item {...props} />);
    ItemComponent.setState({ isEditing: true });
    expect(ItemComponent.state().isEditing).toBeTruthy();
  });
});
