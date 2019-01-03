import React from 'react';
import Layout from '../../../ui/components/Layout';
import { shallow } from 'enzyme';

describe('<Layout />', () => {

  it('should render correctly with default props', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper).toMatchSnapshot();
  });
});
