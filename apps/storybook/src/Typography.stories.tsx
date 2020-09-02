import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';

import {
  Caption as CaptionText,
  Display as DisplayText,
  Headline2 as Headline2Text,
  Headline3 as Headline3Text,
  Headline4 as Headline4Text,
  Paragraph as ParagraphText,
} from '@asap-hub/react-components';
import { accentColor } from './text';
import { ThemeDecorator } from './decorators';

export default {
  title: 'Atoms / Typography',
  decorators: [ThemeDecorator],
};

export const Display = () => (
  <DisplayText>{text('Text', 'Display')}</DisplayText>
);
export const Headline2 = () => (
  <Headline2Text>{text('Text', 'Headline 2')}</Headline2Text>
);
export const Headline3 = () => (
  <Headline3Text>{text('Text', 'Headline 3')}</Headline3Text>
);
export const Headline4 = () => (
  <Headline4Text>{text('Text', 'Headline 4')}</Headline4Text>
);

export const Paragraph = () => {
  const Importance = boolean('Bold', false) ? 'strong' : React.Fragment;
  return (
    <ParagraphText primary={boolean('Primary', true)} accent={accentColor()}>
      <Importance>{text('Text', 'Paragraph')}</Importance>
    </ParagraphText>
  );
};
export const Caption = () => {
  const Importance = boolean('Bold', false) ? 'strong' : React.Fragment;
  return (
    <figure>
      <code>The figure being captioned</code>
      <CaptionText accent={accentColor()}>
        <Importance>{text('Text', 'Caption')}</Importance>
      </CaptionText>
    </figure>
  );
};
