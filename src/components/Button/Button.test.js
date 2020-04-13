import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('test Button component', () => {
  it('test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Button onClick={mockCallBack} />));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('render correctly button component', () => {
    const mockCallBack = jest.fn();

    const ButtonComponent = renderer.create(<Button onClick={mockCallBack} />).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });
});
