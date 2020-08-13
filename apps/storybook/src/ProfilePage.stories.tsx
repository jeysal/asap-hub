import React from 'react';
import { date, text, array } from '@storybook/addon-knobs';
import { ProfilePage } from '@asap-hub/react-components';

import { NoPaddingDecorator } from './padding';

export default {
  title: 'Pages / Profile',
  decorators: [NoPaddingDecorator],
};

const commonProps = () => ({
  department: text('Department', 'Biology Department'),
  displayName: text('Display Name', 'Phillip Mars, PhD'),
  institution: text('Institution', 'Yale University'),
  orcidLastModifiedDate: new Date(
    date('Last modified', new Date(2020, 6, 12, 14, 32)),
  ).toISOString(),
  firstName: text('First Name', 'Phillip'),
  lastName: text('Last Name', 'Mars'),
  location: text('Location', 'New Haven, Connecticut'),
  teams: [
    {
      id: '42',
      role: text('Role', 'Researcher'),
      displayName: text('Team Name', 'Team A'),
    },
  ],
  jobTitle: text('Job Title', 'Assistant Professor'),
  skills: [],
  aboutHref: '/wrong',
  researchInterestsHref: '/wrong',
  outputsHref: '/wrong',
});

export const AboutTab = () => (
  <ProfilePage
    {...commonProps()}
    tab="about"
    aboutHref="#"
    biography={text(
      'Biography',
      'Dr. Randy Schekman is a Professor in the Department of Molecular and Cell Biology, University of California, and an Investigator of the Howard Hughes Medical Institute. He studied the enzymology of DNA replication as a graduate student with Arthur Kornberg at Stanford University. Among his awards is the Nobel Prize in Physiology or Medicine, which he shared with James Rothman and Thomas Südhof.',
    )}
    skills={array('Skills', [
      'Neurological Diseases',
      'Clinical Neurology',
      'Adult Neurology',
      'Neuroimaging',
      'Neurologic Examination',
      'Neuroprotection',
      'Movement Disorders',
      'Neurodegenerative Diseases',
      'Neurological Diseases',
    ])}
  />
);

export const ResearchInterestsTab = () => (
  <ProfilePage
    {...commonProps()}
    tab="researchInterests"
    researchInterestsHref="#"
  />
);

export const OutputsTab = () => (
  <ProfilePage {...commonProps()} tab="outputs" outputsHref="#" />
);