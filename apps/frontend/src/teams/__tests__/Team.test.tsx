import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import nock from 'nock';
import { TeamResponse } from '@asap-hub/model';
import { authTestUtils } from '@asap-hub/react-components';

import Team from '../Team';
import { API_BASE_URL } from '../../config';

const team: TeamResponse = {
  id: '42',
  displayName: 'Team Unknown',
  applicationNumber: 'Unknow Number',
  projectTitle: 'Unkown Project Title',
  projectSummary: 'Unkown Project Summary',
  lastModifiedDate: new Date().toISOString(),
  members: [],
  skills: [],
};

// fetch user by code request
beforeEach(() => {
  nock(API_BASE_URL, {
    reqheaders: { authorization: 'Bearer token' },
  })
    .get('/teams/42')
    .reply(200, team);
});
afterEach(async () => {
  nock.cleanAll();
});

const renderTeam = async () => {
  const result = render(
    <authTestUtils.Auth0Provider>
      <authTestUtils.WhenReady>
        <authTestUtils.LoggedIn user={undefined}>
          <MemoryRouter initialEntries={['/42/']}>
            <Route path="/:id" component={Team} />
          </MemoryRouter>
        </authTestUtils.LoggedIn>
      </authTestUtils.WhenReady>
    </authTestUtils.Auth0Provider>,
  );
  await waitFor(() =>
    expect(result.queryByText(/auth0/i)).not.toBeInTheDocument(),
  );
  return result;
};

it('renders a loading indicator', async () => {
  const { getByText } = await renderTeam();

  const loadingIndicator = getByText(/loading/i);
  expect(loadingIndicator).toBeVisible();

  await waitForElementToBeRemoved(loadingIndicator);
});

it('renders a team information', async () => {
  const { getByText } = await renderTeam();
  expect(getByText('Team Unknown')).toBeVisible();
});
