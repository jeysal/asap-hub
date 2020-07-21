import React from 'react';
import { text } from '@storybook/addon-knobs';
import { messages } from '@asap-hub/react-components';

export default { title: 'Pages / Emails' };

export const Welcome = () => (
  <messages.Welcome
    firstName={text('First Name', 'Filipe')}
    link="https://hub.asap.science/"
  />
);