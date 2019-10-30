import React from "react";
import Button from "../../../components/UI/Button";
import { shallow } from "enzyme";
test("renders Button correctly", () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.debug()).toMatchSnapshot();
});
