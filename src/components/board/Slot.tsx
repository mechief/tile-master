import React from "react";
import styled, { css } from "styled-components";

import {
  SLOT_CLOSED,
  SLOT_OPENED,
  SLOT_EQUIPED,
} from "../../constants/board";

import type Board from "../../classes/board";
import type { SlotState } from "../../classes/board";

const Slot = ({ board, row, col }: { board: Board, row: number, col: number }) => {
  const SlotStyle = SlotBasic;

  return (
    <SlotStyle
      $slotState={board.getStateOfPosition({ row, col })}
    ></SlotStyle>
  );
}

const StyledSlot = styled.div<{ $slotState: SlotState }>`
  position: relative;
  height: 0;
  padding-bottom: 100%;
`;

const SlotBasic = styled(StyledSlot)`
  ${props => props.$slotState === SLOT_CLOSED && css`
    background-color: #e1e1e1;
  `}

  ${props => props.$slotState === SLOT_OPENED && css`
    background-color: #fff;
  `}

  ${props => props.$slotState === SLOT_EQUIPED && css`
    background-color: #e8bfdb;
  `}
`;

const SlotBlockUsable = styled(StyledSlot)`
  background-color: #d7ebf4;
`;

export default Slot;