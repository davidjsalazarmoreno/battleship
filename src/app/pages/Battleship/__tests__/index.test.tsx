import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { BattleshipPage } from '../index';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { getInitialShips } from '../../../game-logic/initialization';
import { selectGameDifficulty } from 'entities/configuration';
import { HelmetProvider } from 'react-helmet-async';

const push = jest.fn(path => path);

const useHistory = () => ({
  push,
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory,
}));

let store = configureAppStore();

describe('<BattleshipPage />', () => {
  beforeEach(() => {
    store = configureAppStore();
  });

  test('should check that turns left should be 50 as default (medium difficulty)', () => {
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

  test('should redirect to home if turns value is null', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BattleshipPage rows={10} columns={10} />
        </HelmetProvider>
      </Provider>,
    );
    const spy = jest.spyOn(useHistory(), 'push');
    expect(spy).toHaveBeenCalledWith('/');
  });

  test('should redirect to game over when match ended', () => {
    const store = configureAppStore();
    store.dispatch(selectGameDifficulty(2));

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BattleshipPage />
        </HelmetProvider>
      </Provider>,
    );

    const selector = `cpu-a0`;
    fireEvent(
      screen.getByTestId(selector),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const spy = jest.spyOn(useHistory(), 'push');
    expect(spy).toHaveBeenCalledWith('/game-over');
  });

  test('should check player ships are rendering in the BattleshipPage', () => {
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

    player.forEach(ship => {
      ship.position.forEach(position => {
        const selector = `player-${position}`;
        expect(screen.getByTestId(selector)).toHaveClass('cell-ship');
      });
    });
  });

  test('should check that a cpu ship is not visible by default', () => {
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

    const selector = `cpu-${cpu[0].position[0]}`;
    expect(screen.getByTestId(selector)).toHaveClass('cell-default');
  });

  test('should check when a cpu ship is attacked', () => {
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

    const selector = `cpu-${cpu[0].position[0]}`;
    fireEvent(
      screen.getByTestId(selector),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(screen.getByTestId(selector)).toHaveClass('cell-strike');
  });

  test('should check when a cpu ship is sunk', () => {
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

    cpu[0].position.forEach(position => {
      const selector = `cpu-${position}`;
      fireEvent(
        screen.getByTestId(selector),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    cpu[0].position.forEach(position => {
      const selector = `cpu-${position}`;
      expect(screen.getByTestId(selector)).toHaveClass('cell-sunk');
    });
  });

  test('should check if a ship was attacked or a shot missed', () => {
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

    const selector = `cpu-a0`;
    fireEvent(
      screen.getByTestId(selector),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const containsClassNames = screen
      .getByTestId(selector)
      .className.split(' ')
      .some(className => {
        return className === 'cell-strike' || className === 'cell-failed-shot';
      });
    expect(containsClassNames).toBe(true);
  });
});
