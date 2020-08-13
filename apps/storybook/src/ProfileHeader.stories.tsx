import React from 'react';
import { date, text } from '@storybook/addon-knobs';
import { ProfileHeader } from '@asap-hub/react-components';

export default {
  title: 'Templates / Profile / Header',
};

const timestamp = (name: string, defaultValue?: Date): Date => {
  const value = date(name, defaultValue || new Date());
  return new Date(value);
};

export const Normal = () => (
  <ProfileHeader
    department={text('Department', 'Biology Department')}
    displayName={text('Display Name', 'Phillip Mars, PhD')}
    initials={text('Initials', 'PM')}
    institution={text('Institution', 'Yale University')}
    lastModified={timestamp('lastModified', new Date(2020, 6, 12, 14, 32))}
    location={text('Location', 'New Haven, Connecticut')}
    role={text('Role', 'Researcher')}
    team={text('Team', 'Team A')}
    title={text('Title', 'Assistant Professor')}
    aboutHref="#"
    researchInterestsHref="#"
    outputsHref="#"
  />
);