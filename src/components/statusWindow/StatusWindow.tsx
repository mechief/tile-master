import React from "react";
import styled from "styled-components";

const StatusWindow = () => {
  return (
    <BoardStatus />
  );
}

const BoardStatus = styled.div`
  width: calc(33% - 20px);
  background: #f5f5f5;
`;

export default StatusWindow;