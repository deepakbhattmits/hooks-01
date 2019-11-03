import React from 'react'
import { shallow } from "enzyme";
import ClickCounter from '../../../components/ClickCounter/ClickCounter';

test('Click Counter randerswith out crashing', () => {
    const wrapper = shallow(<ClickCounter />)
    const clickCountWrapper = wrapper.find("[className='component-click-counter']");
    expect(clickCountWrapper.length).toBe(1);
})