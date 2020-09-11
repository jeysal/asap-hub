import React from 'react';
import { text, date } from '@storybook/addon-knobs';

import { PeopleCard } from '@asap-hub/react-components';

export default {
  title: 'Organisms / Team / People Card',
};

export const Normal = () => (
  <PeopleCard
    displayName={text('Display Name', 'Phillip Mars, PhD')}
    createdDate={new Date(
      date('Created Date', new Date(2020, 6, 12, 14, 32)),
    ).toISOString()}
    institution={text('Institution', 'Yale University')}
    firstName={text('First Name', 'Phillip')}
    lastName={text('Last Name', 'Mars')}
    location={text('Location', 'New Haven, Connecticut')}
    teams={[
      {
        id: '42',
        role: text('Role', 'Researcher'),
        displayName: text('Team Name', 'Team A'),
      },
    ]}
    jobTitle={text('Job Title', 'Assistant Professor')}
    avatarURL={text(
      'Avatar URL',
      'https://www.hhmi.org/sites/default/files/styles/epsa_250_250/public/Programs/Investigator/Randy-Schekman-400x400.jpg',
    )}
    profileHref="#"
    teamProfileHref="#"
  />
);
