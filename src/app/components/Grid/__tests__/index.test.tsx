import React, { useRef } from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { render, screen } from '@testing-library/react';

import { Grid } from '../index';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

const store = configureAppStore();

describe.only('<Grid />', () => {
  test('turns left should be 50 as default (medium difficulty)', () => {
    render(
      <Provider store={store}>
        <Grid rows={10} columns={10} />
      </Provider>,
    );
    expect(screen.getByTestId('turns-left')).toHaveTextContent('50');
  });
});
