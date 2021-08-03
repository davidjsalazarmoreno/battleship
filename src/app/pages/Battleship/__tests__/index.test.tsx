import React from 'react';

import { render, screen } from '@testing-library/react';
import { BattleshipPage } from '../index';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { getInitialShips } from '../../../game-logic/initialization';
import { selectGameDifficulty } from 'entities/configuration';
import { HelmetProvider } from 'react-helmet-async';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

let store = configureAppStore();

describe('<BattleshipPage />', () => {
  beforeEach(() => {
    store = configureAppStore();
  });

  test('turns left should be 50 as default (medium difficulty)', () => {
    const store = configureAppStore();
    store.dispatch(selectGameDifficulty(50));

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BattleshipPage rows={10} columns={10} />
        </HelmetProvider>
      </Provider>,
    );

    expect(screen.getByTestId('turns-left')).toHaveTextContent('50');
  });

  test('should check player ship correct rendering in the BattleshipPage', () => {
    const player = getInitialShips(10, 10);
    const cpu = getInitialShips(10, 10);
    store.dispatch(selectGameDifficulty(50));

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BattleshipPage
            rows={10}
            columns={10}
            initialShips={{
              player,
              cpu,
            }}
          />
        </HelmetProvider>
      </Provider>,
    );

    // const positionOne = 'player-' + player[0].position[0];
    const positionOne = 'player-b2';
    console.log((screen as any).outerHTML);
    expect(screen.getByTestId(positionOne)).toHaveTextContent(
      player[0].position[0].toUpperCase(),
    );
  });
});
