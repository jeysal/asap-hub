import React, { ComponentProps } from 'react';
import { render, waitFor } from '@testing-library/react';
import {
  createTeamResponse,
  createListGroupResponse,
} from '@asap-hub/fixtures';
import {
  Auth0Provider,
  WhenReady,
} from '@asap-hub/frontend/src/auth/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { disable } from '@asap-hub/flags';

import About from '../About';
import { getTeamGroups } from '../api';
import { refreshTeamState } from '../state';

jest.mock('../api');

const mockGetTeamGroups = getTeamGroups as jest.MockedFunction<
  typeof getTeamGroups
>;

const renderTeamAbout = async (
  aboutProps: ComponentProps<typeof About>,
  getTeamGroupResponse = createListGroupResponse(0),
) => {
  mockGetTeamGroups.mockResolvedValue(getTeamGroupResponse);
  const result = render(
    <RecoilRoot
      initializeState={({ set }) =>
        set(refreshTeamState(aboutProps.team.id), Math.random())
      }
    >
      <React.Suspense fallback="loading">
        <Auth0Provider user={{}}>
          <WhenReady>
            <MemoryRouter initialEntries={['/team/about']}>
              <Route path="/team/about">
                <About {...aboutProps} />
              </Route>
            </MemoryRouter>
          </WhenReady>
        </Auth0Provider>
      </React.Suspense>
    </RecoilRoot>,
  );
  await waitFor(() =>
    expect(result.queryByText(/Loading/i)).not.toBeInTheDocument(),
  );
  return result;
};

it('renders the member links', async () => {
  const { getByText } = await renderTeamAbout({
    team: {
      ...createTeamResponse(),
      members: [
        {
          ...createTeamResponse({ teamMembers: 1 }).members[0],
          id: '42',
          displayName: 'Mem',
        },
      ],
    },
  });
  expect(getByText('Mem').closest('a')!.href).toContain('42');
});

describe('the proposal', () => {
  it('is not rendered when there is no proposal', async () => {
    const { queryByText } = await renderTeamAbout({
      team: { ...createTeamResponse(), proposalURL: undefined },
    });
    expect(queryByText(/proposal/i)).not.toBeInTheDocument();
  });

  it('is rendered with a library href', async () => {
    const { getByText } = await renderTeamAbout({
      team: { ...createTeamResponse(), proposalURL: 'someproposal' },
    });
    expect(getByText(/proposal/i).closest('a')!.href).toMatch(/someproposal$/);
  });
});

describe('the team groups card', () => {
  it('is not rendered when feature flag disabled (REGRESSION)', async () => {
    disable('GROUPS');
    const { queryByText } = await renderTeamAbout(
      {
        team: createTeamResponse(),
      },
      createListGroupResponse(1),
    );
    expect(queryByText(/team groups/i)).not.toBeInTheDocument();
  });
  it('is not rendered when there are no groups', async () => {
    const { queryByText } = await renderTeamAbout(
      {
        team: createTeamResponse(),
      },
      createListGroupResponse(0),
    );
    expect(queryByText(/team groups/i)).not.toBeInTheDocument();
  });

  it('is rendered when there are groups', async () => {
    const { queryByText } = await renderTeamAbout(
      {
        team: createTeamResponse(),
      },
      createListGroupResponse(1),
    );
    await waitFor(() =>
      expect(queryByText(/team groups/i)).toBeInTheDocument(),
    );
  });
});
