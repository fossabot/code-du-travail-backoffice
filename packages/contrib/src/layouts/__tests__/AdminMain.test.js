import React from "react";
import { render } from "react-testing-library";

jest.mock("next/router", () => ({
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: {
        pathname: "/admin"
      }
    };

    return component;
  }
}));

import AdminMain from "../AdminMain";

describe("[Contrib] layouts/<AdminMain />", () => {
  // https://github.com/facebook/jest/issues/890#issuecomment-415202799
  window.history.pushState({}, "", "/admin");

  const props = {
    children: "Some Content Text",
    isLoading: false
  };

  const γ = render(<AdminMain {...props} />);
  const firstRender = γ.container;

  it("should match snapshot", () => {
    expect(firstRender).toMatchSnapshot();
  });

  it("should match snapshot diff with `isLoading` prop", () => {
    const newProps = {
      ...props,
      isLoading: true
    };

    const Γ = render(<AdminMain {...newProps} />);

    expect(firstRender).toMatchDiffSnapshot(Γ.asFragment());
  });
});
