import React from "react";
import Auth from "../../components/Auth";
import { shallow } from "enzyme";
test("renders Auth correctly", () => {
    const wrapper = shallow(<Auth />);
    expect(wrapper.debug()).toMatchSnapshot();
});
