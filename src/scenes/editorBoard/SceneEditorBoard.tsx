import React from "react";
import styled from "styled-components";

import BoardEditor from "../../components/board/BoardEditor";
import StatusWindow from "../../components/statusWindow/StatusWindow";
import BoardEditorBlockInventory from "../../components/inventory/BoardEditorBlockInventory";
import BlockInventory from "../../components/inventory/BlockInventory";

const SceneEditorBoard = () => {
  return (
    <>
      <BoardEditorWithStatus>
        <BoardEditor />
        <StatusWindow />
      </BoardEditorWithStatus>
      <BoardEditorBlockInventory>
        <BlockInventory />
      </BoardEditorBlockInventory>
    </>
  );
}

const BoardEditorWithStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export default SceneEditorBoard;