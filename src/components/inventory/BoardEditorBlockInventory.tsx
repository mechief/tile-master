import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/store";

import Block from "../../classes/block";

import { earnBlock } from "../../actions/inventory";

const BoardEditorBlockInventory = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();

  const handleBlockCreateButton = async () => {
    const newBlock = new Block();

    await dispatch(earnBlock(newBlock.getBlockData()));
  }

  return (
    <StyledContainer>
      <Title>블록</Title>
      <button type="button" onClick={handleBlockCreateButton}>새로운 블록 생성</button>
      <button type="button" id="blockEquipButton">장착</button>
      {children}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin-top: 30px;
  padding: 16px 24px;
  background: #f9f1e6;
`;

const Title = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
`;


export default BoardEditorBlockInventory;