import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { App } from '../Routes';

const renderer = createRenderer();

xdescribe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
