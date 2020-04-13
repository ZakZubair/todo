import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Input from './Input';

describe('test Input component', () => {
  it('test change event', () => {
    const mockCallBack = jest.fn();

    const wrapper = shallow((<Input onChange={mockCallBack} value="Old value" />));
    wrapper.find('input').simulate('change', { target: { value: 'New value' } });
  });

  it('render correctly input component', () => {
    const mockCallBack = jest.fn();

    const props = {
      value: 'Test value',
      onChange: mockCallBack,
      onKeyPress: mockCallBack,
      onClick: mockCallBack,
    };
    const InputComponent = renderer.create(<Input {...props} />).toJSON();
    expect(InputComponent).toMatchSnapshot();
  });
});
