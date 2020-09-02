import React from 'react';
import { Avatar } from '@asap-hub/react-components';
import { boolean, text } from '@storybook/addon-knobs';

export default {
  title: 'Atoms / Avatar',
};

export const Normal = () => (
  <Avatar
    border={boolean('Border', false)}
    small={boolean('Small', false)}
    imageUrl={text(
      'Image URL',
      'https://www.hhmi.org/sites/default/files/styles/epsa_250_250/public/Programs/Investigator/Randy-Schekman-400x400.jpg',
    )}
  />
);
export const InitialsFallback = () => (
  <Avatar
    border={boolean('Border', false)}
    small={boolean('Small', false)}
    firstName={text('First Name', 'John')}
    lastName={text('Last Name', 'Doe')}
  />
);
