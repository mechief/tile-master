import React from "react";
import styled from "styled-components";

const GameLayout = ({ children }: { children: React.ReactElement } ) => {
  return (
    <StyledGameLayout>{children}</StyledGameLayout>
  );
}

const StyledGameLayout = styled.div`
  width: 800px;
  max-width: 100%;
`;

export default GameLayout;