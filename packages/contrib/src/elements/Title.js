import styled from "styled-components";

export default styled.h1`
  color: black;
  font-size: 1.3rem;
  font-weight: 600;
  margin: ${props => (props.isFirst ? "0 0 0.5rem" : "1.5rem 0 0.5rem")};
  user-select: none;
`;
