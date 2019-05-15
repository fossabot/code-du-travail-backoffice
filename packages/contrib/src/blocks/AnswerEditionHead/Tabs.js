import React from "react";
import { Flex } from "rebass";
import styled from "styled-components";

import Tab from "./Tab";

const Container = styled(Flex)`
  margin-top: 0.5rem;
`;

export const TABS = {
  EDITOR: 0,
  REFERENCES: 1,
  SUGGESTIONS: 2,
  TAGS: 3
};

export default ({
  currentTab,
  onChange,
  referencesCount,
  suggestionsCount,
  tagsCount
}) => (
  <Container>
    <Tab
      isActive={currentTab === TABS.EDITOR}
      onClick={() => onChange(TABS.EDITOR)}
    >
      Édition
    </Tab>
    <Tab
      isActive={currentTab === TABS.REFERENCES}
      onClick={() => onChange(TABS.REFERENCES)}
    >
      {`Références juridiques (${referencesCount})`}
    </Tab>
    <Tab
      isActive={currentTab === TABS.TAGS}
      onClick={() => onChange(TABS.TAGS)}
    >
      {`Étiquettes (${tagsCount})`}
    </Tab>
    <Tab
      isActive={currentTab === TABS.SUGGESTIONS}
      onClick={() => onChange(TABS.SUGGESTIONS)}
    >
      {`Suggestions (${suggestionsCount})`}
    </Tab>
  </Container>
);
