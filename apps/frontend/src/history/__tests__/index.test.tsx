import React from 'react';
import { Router } from 'react-router-dom';
import { renderHook } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';

import { usePushFromHere, usePushFromPathname } from '..';

describe('usePushFromPathname', () => {
  it('pushes a history entry if currently on given page', () => {
    const history = createMemoryHistory({ initialEntries: ['/current'] });
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const {
      result: { current },
    } = renderHook(() => usePushFromPathname('/current'), {
      wrapper,
    });

    current('/new');
    expect(history.location.pathname).toBe('/new');
  });

  it('does not push a history entry if currently on a different page', () => {
    const history = createMemoryHistory({ initialEntries: ['/current'] });
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const {
      result: { current },
    } = renderHook(() => usePushFromPathname('/wrong'), {
      wrapper,
    });

    current('/new');
    expect(history.location.pathname).toBe('/current');
  });
});

describe('usePushFromHere', () => {
  it('pushes a history entry if still on the same page', () => {
    const history = createMemoryHistory({ initialEntries: ['/current'] });
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const {
      result: { current },
    } = renderHook(() => usePushFromHere(), {
      wrapper,
    });

    current('/new');
    expect(history.location.pathname).toBe('/new');
  });

  it('does not push a history entry if no longer on the same page', () => {
    const history = createMemoryHistory({ initialEntries: ['/current'] });
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const {
      result: { current },
    } = renderHook(() => usePushFromHere(), {
      wrapper,
    });

    history.push('/elsewhere');

    // Note that `current` is still the hook result from before the push;
    // now the hook is returning a function "bound" to `/elsewhere`.
    current('/new');
    expect(history.location.pathname).toBe('/elsewhere');
  });
});
