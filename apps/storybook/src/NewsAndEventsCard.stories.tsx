import React from 'react';
import { text } from '@storybook/addon-knobs';

import { NewsAndEventsCard } from '@asap-hub/react-components';

export default {
  title: 'Organisms / News and Events / Card',
};

const newsProps = () => ({
  id: 'uuid-1',
  created: new Date(),
  type: 'News' as const,
  title: text('Title', "Coordinating different approaches into Parkinson's"),
  subtitle: text(
    'Subtitle',
    'Point of view from ASAP scientific director, Randy Schekman, PhD and managing director, Ekemini A. U. Riley, PhD.',
  ),
  thumbnail: text('Thumbnail', 'https://picsum.photos/200'),
});

const eventProps = () => ({
  id: 'uuid-2',
  created: new Date(),
  type: 'Event' as const,
  title: text(
    'Title',
    'Welcome to the ASAP Collaborative Initiative: The Science & the scientists',
  ),
  thumbnail: text('Thumbnail', 'https://picsum.photos/200'),
});

export const News = () => <NewsAndEventsCard {...newsProps()} />;

export const Event = () => <NewsAndEventsCard {...eventProps()} />;