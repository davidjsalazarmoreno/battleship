import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { HomePage } from '../index';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import {
  resetGameDifficulty,
  selectGameDifficulty,
} from 'entities/configuration';
import { HelmetProvider } from 'react-helmet-async';

const push = jest.fn(path => path);

const useHistory = () => ({
  push,
});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory,
}));

const dispatch = jest.fn();
const useDispatch = () => {
  return dispatch;
};
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch,
}));

describe('<HomePage />', () => {
  test('should check that all the button are available', () => {
    const store = configureAppStore();

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HomePage />
        </HelmetProvider>
      </Provider>,
    );

    expect(dispatch).toHaveBeenCalledWith(resetGameDifficulty());
    expect(screen.getByText('Easy (1000 turns)')).toBeDefined();
    expect(screen.getByText('Medium (100 turns)')).toBeDefined();
    expect(screen.getByText('Hard (50 turns)')).toBeDefined();
    expect(screen.getByText('Scoreboard')).toBeDefined();
  });

  test('should redirect the user when click a start game button', () => {
    const store = configureAppStore();

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HomePage />
        </HelmetProvider>
      </Provider>,
    );

    expect(dispatch).toHaveBeenCalledWith(resetGameDifficulty());
    fireEvent(
      screen.getByText('Easy (1000 turns)'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(dispatch).toHaveBeenCalledWith(selectGameDifficulty(1000));
  });
});
