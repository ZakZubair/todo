import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Form from './Form';

describe('<Form />', () => {
  it('renders name and description with add button', () => {
    const mockCallBack = jest.fn();

    const props = {
      name: 'Test name',
      description: 'Test description',
      onChangeName: mockCallBack,
      onChangeDescription: mockCallBack,
      onCreate: mockCallBack,
      onKeyPress: mockCallBack,
    };

    const wrapper = mount(<Form {...props} />);
    const name = wrapper.find('input').at(0);
    const description = wrapper.find('input').at(1);
    const button = wrapper.find('button');
    expect(name).toHaveLength(1);
    name.simulate('change', { target: { value: 'New title' } });
    expect(description).toHaveLength(1);
    description.simulate('change', { target: { value: 'New description' } });
    expect(button).toHaveLength(1);
    expect(button.prop('type')).toEqual('button');
    expect(button.text()).toEqual('+');
  });

  it('render correctly form component', () => {
    const mockCallBack = jest.fn();

    const props = {
      name: 'Test name',
      description: 'Test description',
      onChangeName: mockCallBack,
      onChangeDescription: mockCallBack,
      onCreate: mockCallBack,
      onKeyPress: mockCallBack,
    };

    const FormComponent = renderer.create(<Form {...props} />).toJSON();
    expect(FormComponent).toMatchSnapshot();
  });
});
