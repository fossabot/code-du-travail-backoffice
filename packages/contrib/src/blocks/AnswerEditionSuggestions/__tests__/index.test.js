import React from "react";
import { fireEvent, render } from "react-testing-library";

import "../../../../__mocks__/waitFor";

import AnswerEditionSuggestions from "..";

describe("[Contrib] blocks/<AnswerEditionSuggestions />", () => {
  const props = {
    onAdd: jest.fn(),
    onRemove: jest.fn(),
    suggestions: [
      {
        id: "12345678-9abc-4def-0123-456789abcdef",
        value: "An Alternative Question Value"
      },
      {
        id: "12345678-9abc-4def-0123-456789abcdf0",
        value: "Another Alternative Question Value"
      }
    ]
  };

  const λ = render(<AnswerEditionSuggestions {...props} />);
  // const firstRender = asFragment();

  it("should match snapshot", () => {
    expect(λ.container).toMatchSnapshot();
    expect(λ.queryByText(props.suggestions[0].value)).toBeInTheDocument();
    expect(λ.queryByText(props.suggestions[1].value)).toBeInTheDocument();
  });
});
