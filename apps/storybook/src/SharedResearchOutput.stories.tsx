import React, { ComponentProps } from 'react';
import {
  SharedResearchOutput,
  SharedResearchProposal,
} from '@asap-hub/react-components';
import { text, date, array, number } from '@storybook/addon-knobs';

import {
  createListTeamResponse,
  createResearchOutputResponse,
} from '@asap-hub/fixtures';

export default {
  title: 'Templates / Shared Research / Details',
};

const props = (): ComponentProps<typeof SharedResearchOutput> => ({
  ...createResearchOutputResponse(),
  addedDate: new Date(
    date('Added Date', new Date(2020, 6, 12, 14, 32)),
  ).toISOString(),
  description: text(
    'Description',
    `Neural control of muscle function is fundamental to animal behavior. In many cases, specific muscles can generate multiple distinct behaviors. Nonetheless, individual muscle cells are generally regarded as the smallest units of motor control. Here we report that muscle cells can alter their behavioral output by contracting subcellularly.
    <b>Bold Text</b> <a href="http://example.com"> link </a>
    `,
  ),
  title: text(
    'Title',
    'Molecular actions of PD-associated pathological proteins using in vitro human pluripotent stem cell-derived brain',
  ),
  link: text('Link', 'http://example.com'),
  tags: array('Tags', ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']),
  lastModifiedDate: new Date(
    date('Last Modified Date', new Date(2020, 6, 12, 14, 32)),
  ).toISOString(),
  backHref: '#',
  teams: createListTeamResponse(number('Number of teams', 3)).items,
});

export const Normal = () => <SharedResearchOutput {...props()} />;
export const Proposal = () => (
  <SharedResearchProposal {...props()} type="Proposal" />
);