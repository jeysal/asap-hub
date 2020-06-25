import React, { useRef } from 'react';
import { text, button } from '@storybook/addon-knobs';

import { LabeledTextField } from '@asap-hub/react-components';

export default {
  title: 'Molecules / Labeled Text Field',
  component: LabeledTextField,
};

export const AllLabels = () => (
  <LabeledTextField
    title={text('Title', 'Full Name')}
    subtitle={text('Subtitle', 'As stated on passport')}
    value={text('Value', 'John Doe')}
    hint={text(
      'Hint',
      "Hint: Must not include special characters, such as '|' and '%'.",
    )}
  />
);
export const Empty = () => (
  <LabeledTextField
    title="Full Name"
    value=""
    placeholder={text('Placeholder', '')}
  />
);
export const Disabled = () => (
  <LabeledTextField
    title="Full Name"
    value={text('Value', 'John Doe')}
    enabled={false}
  />
);
export const Valid = () => (
  <LabeledTextField
    title={text('Title', 'Full Name')}
    value={text('Value', 'John Doe')}
    pattern=".*"
  />
);
export const Invalid = () => {
  const form = useRef<HTMLFormElement>(null);
  button('Validate Form', () => {
    form.current?.reportValidity();
  });

  return (
    <form ref={form}>
      <LabeledTextField
        title={text('Title', 'Full Name')}
        value={text('Value', 'John|Doe')}
        customValidationMessage={text(
          'Validation Error Message',
          "Must not include special characters, such as '|' and '%'.",
        )}
        hint={text('Hint', 'Hint')}
      />
    </form>
  );
};
export const Loading = () => (
  <LabeledTextField
    title={text('Title', 'Full Name')}
    value={text('Value', 'John Doe')}
    loading
  />
);
