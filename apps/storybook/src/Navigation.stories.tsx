import React from 'react';

import { Navigation } from '@asap-hub/react-components';
import { NoPaddingDecorator } from './padding';

export default {
  title: 'Molecules / Navigation / Main Nav',
  component: Navigation,
  decorators: [NoPaddingDecorator],
};

export const Normal = () => <Navigation />;
