import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScoreboardPage } from '../index';
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

let storedValue = [];
const useLocalStorage = () => ({
  storedValue,
  setValue: value => {
    storedValue = value;
  },
});

jest.mock('app/game-logic', () => ({
  ...jest.requireActual('app/game-logic'),
  useLocalStorage,
}));

describe('<ScoreboardPage />', () => {
  beforeEach(() => {
    useLocalStorage().setValue([]);
  });

  test('should show a default message when there is no score to load', () => {
    const store = configureAppStore();

    render(
      <Provider store={store}>
        <HelmetProvider>
          <ScoreboardPage />
        </HelmetProvider>
      </Provider>,
    );

    expect(
      screen.getByText(
        "There's not score to show, please go back to start screen and play a match :-)",
      ),
    ).toBeDefined();
  });

  test('should show the scoreboard', () => {
    const store = configureAppStore();
    const results = [
      {
        result: 'victory',
        cpuShips: 0,
        playerShips: 9,
        turnsLeft: 4,
        difficulty: 'hard',
      },
    ];
    useLocalStorage().setValue(results);
    render(
      <Provider store={store}>
        <HelmetProvider>
          <ScoreboardPage />
        </HelmetProvider>
      </Provider>,
    );

    expect(screen.getByText('victory')).toBeDefined();
    expect(screen.getByText('hard')).toBeDefined();
  });
});
