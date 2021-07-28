import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { useHistory } from 'react-router-dom';
import { Ship, useBattleship, useLocalStorage } from 'app/game-logic';
import { useDispatch, useSelector } from 'react-redux';
import { addMatchResult, resetMatchResult } from 'entities/score';
import { RootState } from 'types/RootState';
import tw from 'twin.macro';
import { MatchInformation } from '../MatchInformation';
import { Title } from '../Title/index';

export type Props = {
  rows: number;
  columns: number;
  initialShips?: {
    cpu?: Ship[];
    player?: Ship[];
  };
};

export const Grid: React.FC<Props> = props => {
  const { rows, columns, initialShips } = props;
  const turns = useSelector((state: RootState) => state.configuration.turns);
  const history = useHistory();
  const {
    matchEnded,
    grid,
    turnsLeft,
    handleAttack,
    getScore,
    getCellClassName,
  } = useBattleship({
    rows,
    columns,
    turns: turns || 50,
    initialShips: initialShips,
  });
  const { storedValue: scoreboard, setValue: setScoreboard } = useLocalStorage(
    [],
  );
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

  useEffect(() => {
    if (turns === null) {
      history.push('/');
    }
  }, [turns, history]);

  if (turns === null) {
    return null;
  }

  return (
    <>
      <MatchInformation matchEnded={matchEnded} turnsLeft={turnsLeft} />
      <Title>CPU</Title>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <Cell
              key={position}
              testIdPrefix="cpu"
              {...cell}
              className={getCellClassName(position, true)}
              onClick={() => handleAttack(position)}
            />
          );
        })}
      </Wrapper>
      {/* ./CPU Grid */}

      <Title>Player</Title>

      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <Cell
              key={position}
              testIdPrefix="player"
              {...cell}
              className={getCellClassName(position)}
            />
          );
        })}
      </Wrapper>
      {/* ./Player grid */}
    </>
  );
};

const Wrapper = styled.div<Props>`
  ${tw`grid w-full select-none lg:w-4/6`}
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
