import React, { useMemo } from "react";
import styled from "styled-components";

import Board from "../../classes/board";

import { useAppDispatch } from "../../store/store";
import { earnBoard } from "../../actions/inventory";
import { setScene } from "../../slices/sceneSlice";

import BoardItem from "../../components/board/BoardItem";

import { SCENE_EDITOR_BOARD } from "../../constants/scene";

const SceneChooseItem = () => {
  const dispatch = useAppDispatch();

  const boards = useMemo(() => [new Board(), new Board(), new Board()], []);

  const handleClickItem = async (board: Board): Promise<void> => {
    const boardData = board.getNewBoardData();

    try {
      await dispatch(earnBoard(boardData)).unwrap();
      
      changeScene();
    } catch (err) {
      alert('에러가 발생했습니다');
    }
  }

  const changeScene = (): void => {
    dispatch(setScene(SCENE_EDITOR_BOARD));
  }

  return (
    <SceneContainer>
      <ChooseList>
        {boards.map((board, i) => 
          <ChooseItem key={`choose_board_${i}`}>
            <BoardItem board={board} />
            <ButtonWrap>
              <Button type="button" onClick={() => handleClickItem(board)}>선택</Button>
            </ButtonWrap>
          </ChooseItem>
        )}
      </ChooseList>
    </SceneContainer>
  );
}

const SceneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ChooseList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const ChooseItem = styled.div`
  width: 32%;
`;

const ButtonWrap = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Button = styled.button`
  padding: 12px 24px;
`;

export default SceneChooseItem;