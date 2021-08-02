import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../../components/Title';
import { Ship, useBattleship, useLocalStorage } from 'app/game-logic';
import { RootState } from 'types/RootState';
import { PageWrapper } from 'app/components/PageWrapper';
import { MatchInformation } from '../../components/MatchInformation';
import { Helmet } from 'react-helmet-async';
import { Grid } from 'app/components/Grid';
import { addMatchResult, resetMatchResult } from 'entities/score';

export type Props = {
  rows?: number;
  columns?: number;
  initialShips?: {
    cpu?: Ship[];
    player?: Ship[];
  };
};

export function BattleshipPage(props: Props) {
  const { rows = 10, columns = 10, initialShips } = props;
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
      <Helmet>
        <title>Battleship</title>
        <meta name="description" content="Current match" />
      </Helmet>
      <PageWrapper>
        <MatchInformation matchEnded={matchEnded} turnsLeft={turnsLeft} />

        <Title>CPU</Title>
        <Grid
          rows={10}
          columns={10}
          isCpu={true}
          grid={grid}
          onAttack={handleAttack}
          cellClassName={getCellClassName}
        />

        <Title>Player</Title>
        <Grid
          rows={10}
          columns={10}
          grid={grid}
          onAttack={handleAttack}
          cellClassName={getCellClassName}
        />
      </PageWrapper>
    </>
  );
}
