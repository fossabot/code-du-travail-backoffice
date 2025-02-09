import React from "react";
import styled from "styled-components";

import AdminMenu from "./AdminMenu";
import Main from "./Main";

const Content = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`;

export default ({ children, isLoading }) => (
  <Main isAdmin isHorizontal isLoading={isLoading}>
    <AdminMenu />
    <Content>{children}</Content>
  </Main>
);
