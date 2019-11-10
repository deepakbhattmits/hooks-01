import React from 'react'
import { shallow } from "enzyme";
import ClickCounter from '../../../components/ClickCounter/ClickCounter';
// import Button from '../../../components/UI/Button';

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<ClickCounter {...props} />)
    if (state) wrapper.setState(state);
    return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}


test('renders without crashing', () => {
    const wrapper = setup();
    const clickCountWrapper = findByTestAttr(wrapper, 'component-click-counter');
    expect(wrapper.debug()).toMatchSnapshot();
    expect(clickCountWrapper.length).toBe(1);
});
test('renders with increment button', () => {
    const wrapper = setup();
    const clickCountWrapper = findByTestAttr(wrapper, 'increment-button');
    expect(wrapper.debug()).toMatchSnapshot();
    expect(clickCountWrapper.length).toBe(1);
});
test("renders counter initial value", () => {
    const wrapper = setup();
    // const initialStateCounter = wrapper.text();
    const initialStateCounter = findByTestAttr(wrapper, 'counter-display');
    console.log('TEST : ', initialStateCounter)
    expect(initialStateCounter.textContent).toBe('0')
    // console.log('TEST : ', initialStateCounter)
    // expect(initialStateCounter).toBe({});
});

