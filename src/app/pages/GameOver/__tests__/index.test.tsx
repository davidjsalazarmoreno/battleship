import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameOverPage } from '../index';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { HelmetProvider } from 'react-helmet-async';
import { addMatchResult } from 'entities/score';
import { Score } from 'app/game-logic/types';

const push = jest.fn(path => path);

const useHistory = () => ({
  push,
});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory,
}));

const useLocalStorage = () => ({ storedValue: [], setValue: jest.fn() });

jest.mock('app/game-logic', () => ({
  ...jest.requireActual('app/game-logic'),
  useLocalStorage,
}));

describe('<GameOverPage />', () => {
  test('should redirect to home when there is not a result', () => {
    const store = configureAppStore();

    const spy = jest.spyOn(useHistory(), 'push');

    render(
      <Provider store={store}>
        <HelmetProvider>
          <GameOverPage />
        </HelmetProvider>
      </Provider>,
    );

    expect(spy).toHaveBeenCalledWith('/');
    expect(screen.queryByText('Last match result: victory')).toBeNull();
  });

  test('should check that all the button are available', () => {
    const store = configureAppStore();
    const result: Score = {
      result: 'victory',
      cpuShips: 0,
      playerShips: 9,
      turnsLeft: 4,
      difficulty: 'hard',
    };
    store.dispatch(addMatchResult(result));

    render(
      <Provider store={store}>
        <HelmetProvider>
          <GameOverPage />
        </HelmetProvider>
      </Provider>,
    );

    expect(screen.getByText('Last match result: victory')).toBeDefined();
  });
});
