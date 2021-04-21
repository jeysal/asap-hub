import React from 'react';

import { SharedResearchCard } from '@asap-hub/react-components';
import { text, select, date } from '@storybook/addon-knobs';

export default {
  title: 'Organisms / Shared Research / Card',
};

export const Normal = () => (
  <SharedResearchCard
    id="r42"
    link={text('Link', 'https://hub.asap.science')}
    title={text(
      'Title',
      'Tracing the Origin and Progression of Parkinson’s Disease through the Neuro-Immune Interactome',
    )}
    type={select('Type', ['Proposal'], 'Proposal')}
    created={new Date(
      date('Created Date', new Date(2020, 6, 4, 14, 32)),
    ).toISOString()}
    team={{
      id: text('Team Id', '123'),
      displayName: text('Team Name', 'Barnes, A.'),
    }}
  />
);
