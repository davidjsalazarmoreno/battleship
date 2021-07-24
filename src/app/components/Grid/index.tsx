import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { useHistory } from 'react-router-dom';
import {
  getPlayerCellStyle,
  useBattleship,
  useLocalStorage,
} from 'app/game-logic';
import { useDispatch, useSelector } from 'react-redux';
import { addMatchResult, resetMatchResult } from 'entities/score';
import { RootState } from 'types/RootState';

export type Props = {
  rows: number;
  columns: number;
};

export const Grid: React.FC<Props> = props => {
  const { rows, columns } = props;
  const turns = useSelector(
    (state: RootState) => state.configuration.turns || 50,
  );
  const history = useHistory();
  const {
    matchEnded,
    grid,
    turnsLeft,
    handleAttack,
    getScore,
    getCellStyles,
  } = useBattleship({
    rows,
    columns,
    turns,
  });
  const [scoreboard, setScoreboard] = useLocalStorage([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (matchEnded) {
      const result = getScore();
      setScoreboard([result, ...scoreboard]);
      dispatch(addMatchResult(result));
      history.push('/game-over');
      return;
    }
  }, [matchEnded, getScore, history, setScoreboard, dispatch, scoreboard]);

  useEffect(() => {
    dispatch(resetMatchResult());
  }, [dispatch]);

  return (
    <>
      <h1>{matchEnded ? '' : `Turns left: ${turnsLeft}`}</h1>
      <h1>CPU</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getCellStyles(position, true)}
              onClick={() => handleAttack(position)}
            />
          );
        })}
      </Wrapper>
      {/* ./CPU Grid */}

      <h1>Player</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <Cell key={cell.index} {...cell} style={getCellStyles(position)} />
          );
        })}
      </Wrapper>
      {/* ./Player grid */}
    </>
  );
};

const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
