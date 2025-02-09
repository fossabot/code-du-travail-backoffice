import React from "react";
import { render } from "react-testing-library";
import Input from "../Input";

describe("[Contrib] elements/<Input />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Input />);

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with a custom `icon` prop", () => {
    const { container } = render(<Input icon="search" />);

    expect(container).toMatchSnapshot();
  });
});
