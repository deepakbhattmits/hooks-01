import React from "react";
import App from "../App";
import { shallow } from "enzyme";
test("renders App correctly", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.debug()).toMatchSnapshot();
});
