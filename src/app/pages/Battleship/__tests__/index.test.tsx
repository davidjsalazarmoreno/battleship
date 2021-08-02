import React from 'react';

import { render, screen } from '@testing-library/react';

import { BattleshipPage } from '../index';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { getInitialShips } from '../../../game-logic/initialization';

const store = configureAppStore();

describe('<BattleshipPage />', () => {
  test('turns left should be 50 as default (medium difficulty)', () => {
    render(
      <Provider store={store}>
        <BattleshipPage rows={10} columns={10} />
      </Provider>,
    );
    expect(screen.getByTestId('turns-left')).toHaveTextContent('50');
  });

  test('should check player ship correct rendering in the BattleshipPage', () => {
    const player = getInitialShips(10, 10);
    const cpu = getInitialShips(10, 10);

    render(
      <Provider store={store}>
        <BattleshipPage
          rows={10}
          columns={10}
          initialShips={{
            player,
            cpu,
          }}
        />
      </Provider>,
    );

    const positionOne = 'player-' + player[0].position[0];

    expect(screen.getByTestId(positionOne)).toHaveTextContent(
      player[0].position[0].toUpperCase(),
    );
  });
});
