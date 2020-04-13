import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Item from './Item';
import checkIn from '../../assets/img/check-in.svg';

const mockCallBack = jest.fn();
const commonProps = {
  id: 'abc123',
  name: 'Test name',
  description: 'Test description',
  date: 'Date time',
  onToggle: mockCallBack,
  onRemove: mockCallBack,
  onEdit: mockCallBack,
};

const propsUnchecked = {
  ...commonProps,
  checked: false,
};

const propsChecked = {
  ...commonProps,
  checked: true,
};

describe('test Item component', () => {
  it('render correctly item component', () => {
    const ItemComponent = renderer.create(<Item {...propsUnchecked} />).toJSON();
    expect(ItemComponent).toMatchSnapshot();
  });

  it('render item correctly with values', () => {
    const ItemComponent = mount(<Item {...propsUnchecked} />);
    expect((ItemComponent).prop('name')).toEqual('Test name');
    expect((ItemComponent).prop('description')).toEqual('Test description');
    expect((ItemComponent).prop('date')).toEqual('Date time');
    expect((ItemComponent).prop('checked')).toEqual(false);
    expect(ItemComponent.state().isEditing).toBeFalsy();
  });

  it('check the item is not editing', () => {
    const ItemComponent = mount(<Item {...propsUnchecked} />);
    expect(ItemComponent.state().isEditing).toBeFalsy();
  });

  it('check the item onToggle', () => {
    const ItemComponent = mount(<Item {...propsUnchecked} />).find('.item');
    ItemComponent.simulate('click');
  });

  it('check the item is editing', () => {
    const ItemComponent = mount(<Item {...propsUnchecked} />);
    ItemComponent.setState({ isEditing: true });
    const name = ItemComponent.find('input').at(0);
    const description = ItemComponent.find('input').at(1);
    name.simulate('change', { target: { value: 'New title' } });
    name.simulate('click', { preventDefault: () => {} });
    name.simulate('keypress', { preventDefault: () => {} });
    description.simulate('change', { target: { value: 'New description' } });
    description.simulate('click', { preventDefault: () => {} });
    description.simulate('keypress', { preventDefault: () => {} });
    expect(ItemComponent.state().isEditing).toBeTruthy();
  });

  it('check the edit button', () => {
    const ItemComponent = mount(<Item {...propsUnchecked} />);
    const editButton = ItemComponent.find('.button__edit').at(0);
    editButton.simulate('click', { preventDefault: () => {} });
  });

  it('check the done edit button', () => {
    const ItemComponent = mount(<Item {...propsUnchecked} />);
    ItemComponent.setState({ isEditing: true });
    const editButton = ItemComponent.find('.button__edit').at(0);
    editButton.simulate('click', { preventDefault: () => {} });
  });

  it('check the remove button', () => {
    const ItemComponent = mount(<Item {...propsUnchecked} />);
    const removeButton = ItemComponent.find('.button__remove').at(0);
    removeButton.simulate('click', { preventDefault: () => {} });
  });

  it('check the check mark', () => {
    const ItemComponent = mount(<Item {...propsChecked} />);
    const wrapper = ItemComponent.find('.item__check-mark').at(0);
    expect(wrapper.find('img').prop('src')).toEqual(checkIn);
  });
});
