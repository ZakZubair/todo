import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import List from './List';

describe('test List component', () => {
  it('render correctly list component', () => {
    const mockCallBack = jest.fn();

    const props = {
      listItems: [
        {
          id: 'abc123',
          name: 'Test name',
          description: 'Test description',
          date: 'Date time ',
          checked: false,
        },
        {
          id: 'abc456',
          name: 'Test name 2',
          description: 'Test description 2',
          date: 'Date time ',
          checked: false,
          dateUpdated: new Date(),
        },
      ],
      onToggle: mockCallBack,
      onRemove: mockCallBack,
      onEdit: mockCallBack,
    };

    const ListComponent = renderer.create(<List {...props} />).toJSON();
    expect(ListComponent).toMatchSnapshot();
  });
});
