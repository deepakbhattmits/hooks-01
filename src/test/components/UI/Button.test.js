import React from "react";
import Button from "../../../components/UI/Button";
import { shallow } from "enzyme";
test("renders Button correctly", () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.contains(<Button />)).toBe(false)

    expect(wrapper.debug()).toMatchSnapshot();
});
// test("renders Button correctly", () => {
//     const wrapper = shallow(<Button />)
//     const button = wrapper.find("[data-test='ingredient-add']");
//     expect(button.length).toBe(1);
// });
