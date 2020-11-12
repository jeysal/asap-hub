import React, { ComponentProps } from 'react';
import { render } from '@testing-library/react';

import ProfileResearch from '../ProfileResearch';

const commonProps: ComponentProps<typeof ProfileResearch> = {
  firstName: 'Phillip',
  displayName: 'Phillip Winter',
  email: 'test@test.com',
  teams: [],
  skills: [],
  questions: [],
};

it('renders the role on ASAP', () => {
  const { getByText } = render(
    <ProfileResearch
      {...commonProps}
      teams={[
        {
          id: '42',
          displayName: 'Team',
          role: 'Lead PI (Core Leadership)',
          href: '/network/teams/42',
        },
      ]}
    />,
  );
  expect(getByText(/role.+asap/i)).toBeVisible();
});

it('renders the skills list', () => {
  const { getByText } = render(
    <ProfileResearch {...commonProps} skills={['Neurological Diseases']} />,
  );
  expect(getByText(/expertise/i)).toBeVisible();
  expect(getByText('Neurological Diseases')).toBeVisible();
});
it('does not render an empty skills list', () => {
  const { queryByText } = render(
    <ProfileResearch {...commonProps} skills={[]} />,
  );
  expect(queryByText(/expertise/i)).not.toBeInTheDocument();
  expect(queryByText('Neurological Diseases')).not.toBeInTheDocument();
});

it('renders the questions list', () => {
  const { getByText } = render(
    <ProfileResearch
      {...commonProps}
      questions={['What is the meaning of life?']}
    />,
  );
  expect(getByText(/open questions/i).tagName).toBe('H2');
  expect(
    getByText('What is the meaning of life?', { exact: false }),
  ).toBeVisible();
});
it('does not render an empty questions list', () => {
  const { queryByText } = render(
    <ProfileResearch {...commonProps} questions={[]} />,
  );
  expect(queryByText(/open questions/i)).not.toBeInTheDocument();
});

it('does not render an edit button by default', () => {
  const { queryByLabelText } = render(<ProfileResearch {...commonProps} />);
  expect(queryByLabelText(/edit/i)).not.toBeInTheDocument();
});
it('renders an edit button for the role on ASAP', () => {
  const { getByLabelText } = render(
    <ProfileResearch {...commonProps} editBackgroundHref="/edit-background" />,
  );
  expect(getByLabelText(/edit.+role.+asap/i)).toHaveAttribute(
    'href',
    '/edit-background',
  );
});
it('renders an edit button for the skills list', () => {
  const { getByLabelText } = render(
    <ProfileResearch {...commonProps} editSkillsHref="/edit-skills" />,
  );
  expect(getByLabelText(/edit.+expertise/i)).toHaveAttribute(
    'href',
    '/edit-skills',
  );
});
it('renders an edit button for the questions list', () => {
  const { getByLabelText } = render(
    <ProfileResearch {...commonProps} editQuestionsHref="/edit-questions" />,
  );
  expect(getByLabelText(/edit.+question/i)).toHaveAttribute(
    'href',
    '/edit-questions',
  );
});
