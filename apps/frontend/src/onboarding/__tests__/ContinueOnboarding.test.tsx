import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, waitFor, RenderResult } from '@testing-library/react';
import { authTestUtils } from '@asap-hub/react-components';

import ContinueOnboarding from '../ContinueOnboarding';
import { STORAGE_KEY_INVITATION_CODE } from '../../config';

it('does not render its children while Auth0 is loading', async () => {
  const { container } = render(
    <ContinueOnboarding>content</ContinueOnboarding>,
  );
  expect(container).toHaveTextContent('');
});

it('renders its children once Auth0 is loaded', async () => {
  const { getByText } = render(
    <authTestUtils.Auth0Provider>
      <ContinueOnboarding>content</ContinueOnboarding>
    </authTestUtils.Auth0Provider>,
  );
  await waitFor(() => expect(getByText('content')).toBeVisible());
});

describe('when logged in and an invitation code is in the storage', () => {
  beforeEach(() => {
    window.sessionStorage.setItem(STORAGE_KEY_INVITATION_CODE, '42');
  });
  afterEach(() => {
    window.sessionStorage.clear();
  });

  let result!: RenderResult;
  beforeEach(async () => {
    result = render(
      <authTestUtils.Auth0Provider>
        <authTestUtils.LoggedIn user={{ name: 'John Doe' }}>
          <MemoryRouter initialEntries={['/']}>
            <Route
              exact
              path="/"
              render={() => <ContinueOnboarding>content</ContinueOnboarding>}
            />
            <Route
              exact
              path="/create-profile"
              render={() => 'create profile route'}
            />
          </MemoryRouter>
        </authTestUtils.LoggedIn>
      </authTestUtils.Auth0Provider>,
    );
    await waitFor(() => !!result.container.textContent);
  });

  it('deletes the invitation code from the storage', async () => {
    expect(window.sessionStorage.getItem(STORAGE_KEY_INVITATION_CODE)).toBe(
      null,
    );
  });

  it('redirects to the create profile page', async () => {
    expect(result.getByText('create profile route')).toBeVisible();
  });
});