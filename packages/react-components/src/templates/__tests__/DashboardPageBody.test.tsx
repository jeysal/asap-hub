import React, { ComponentProps } from 'react';
import { render } from '@testing-library/react';

import DashboardPageBody from '../DashboardPageBody';

const props: ComponentProps<typeof DashboardPageBody> = {
  newsAndEvents: [
    {
      id: '55724942-3408-4ad6-9a73-14b92226ffb6',
      created: '2020-09-07T17:36:54Z',
      title: 'News Title',
      type: 'News',
    },
    {
      id: '55724942-3408-4ad6-9a73-14b92226ffb77',
      created: '2020-09-07T17:36:54Z',
      title: 'Event Title',
      type: 'Event',
    },
  ],
  pages: [
    {
      path: '/',
      title: 'Page 1 Title',
      text: 'Page 1 Text',
    },
    {
      path: '/',
      title: 'Page 2 Title',
      text: 'Page 2 Text',
    },
  ],
  hrefLibrary: '/library',
  hrefNewsAndEvents: '/news-and-events',
  hrefProfile: '/network/users/uuid',
  hrefTeamsNetwork: '/network/teams',
  hrefTeamWorkspace: '/network/teams/uuid',
  hrefUsersNetwork: '/network/users',
};

it('renders multiple news cards', () => {
  const { queryAllByText } = render(<DashboardPageBody {...props} />);
  expect(
    queryAllByText(/title/i, { selector: 'h2' }).map(
      ({ textContent }) => textContent,
    ),
  ).toEqual(['Page 1 Title', 'Page 2 Title', 'News Title', 'Event Title']);
});

it('renders news section when there are no news', () => {
  const { queryAllByText, queryByText } = render(
    <DashboardPageBody {...props} newsAndEvents={[]} />,
  );

  expect(queryByText('Latest news from ASAP')).not.toBeInTheDocument();
  expect(
    queryAllByText(/title/i, { selector: 'h2' }).map(
      ({ textContent }) => textContent,
    ),
  ).toEqual(['Page 1 Title', 'Page 2 Title']);
});

it('renders news section when there are no pages', () => {
  const { queryAllByText, queryByText } = render(
    <DashboardPageBody {...props} pages={[]} />,
  );

  expect(queryByText('Not sure where to start?')).not.toBeInTheDocument();
  expect(
    queryAllByText(/title/i, { selector: 'h2' }).map(
      ({ textContent }) => textContent,
    ),
  ).toEqual(['News Title', 'Event Title']);
});
