import React, { ComponentProps } from 'react';
import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { createUserResponse } from '@asap-hub/fixtures';

import PersonalInfoModal from '../PersonalInfoModal';

const props: ComponentProps<typeof PersonalInfoModal> = {
  ...createUserResponse(),
  backHref: '/wrong',
};
it('renders the title', () => {
  const { getByText } = render(<PersonalInfoModal {...props} />);
  expect(getByText('Your details', { selector: 'h3' })).toBeVisible();
});

it('renders default values into text inputs', () => {
  const { queryAllByRole } = render(
    <PersonalInfoModal
      {...props}
      firstName="firstName"
      lastName="lastName"
      location="location"
      jobTitle="jobTitle"
      institution="institution"
    />,
  );
  expect(queryAllByRole('textbox').map((input) => input.getAttribute('value')))
    .toMatchInlineSnapshot(`
    Array [
      "firstName",
      "lastName",
      "",
      "institution",
      "jobTitle",
      "location",
    ]
  `);
});

it('triggers the save function', async () => {
  const jestFn = jest.fn();
  const { getByText } = render(
    <MemoryRouter>
      <PersonalInfoModal
        {...props}
        firstName="firstName"
        lastName="lastName"
        location="location"
        jobTitle="jobTitle"
        institution="institution"
        degree="BA"
        onSave={jestFn}
      />
      ,
    </MemoryRouter>,
  );

  userEvent.click(getByText('Save'));
  expect(jestFn).toHaveBeenCalledWith({
    firstName: 'firstName',
    lastName: 'lastName',
    location: 'location',
    degree: 'BA',
    jobTitle: 'jobTitle',
    institution: 'institution',
  });

  await waitFor(() =>
    expect(getByText(/save/i).closest('button')).toBeEnabled(),
  );
});

it('disables the form elements while submitting', async () => {
  let resolveSubmit!: () => void;
  const handleSave = () =>
    new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });
  const { getByText } = render(
    <PersonalInfoModal {...props} onSave={handleSave} />,
  );

  userEvent.click(getByText(/save/i));

  const form = getByText(/save/i).closest('form')!;
  expect(form.elements.length).toBeGreaterThan(1);
  [...form.elements].forEach((element) => expect(element).toBeDisabled());

  act(resolveSubmit);
  await waitFor(() =>
    expect(getByText(/save/i).closest('button')).toBeEnabled(),
  );
});
