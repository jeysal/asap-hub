import React from 'react';
import { render } from '@testing-library/react';
import TeamMembersSection from '../TeamMembersSection';

it('renders an header with number of members', () => {
  const { getByRole } = render(<TeamMembersSection members={[]} />);
  expect(getByRole('heading').textContent).toMatchInlineSnapshot(
    `"Team Members (0)"`,
  );
});

it('renders the content', async () => {
  const { getByText } = render(
    <TeamMembersSection
      title={'Title'}
      members={[
        {
          id: '42',
          href: '#42',
          firstName: 'Phillip',
          lastName: 'Mars',
          displayName: 'Phillip Mars, PhD',
          role: 'Collaborating PI',
        },
      ]}
    />,
  );

  expect(getByText('Title')).toBeVisible();
  expect(getByText('Phillip Mars, PhD')).toBeVisible();
  expect(getByText('Collaborating PI')).toBeVisible();
});
