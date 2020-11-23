import React, { ComponentProps } from 'react';
import { UserResponse } from '@asap-hub/model';
import { useFlags } from '@asap-hub/react-context';

import {
  UserProfileBackground,
  ProfileSkills,
  QuestionsSection,
  ProfileCardList,
} from '../organisms';
import { CtaCard } from '../molecules';
import { createMailTo } from '../mail';

type UserProfileResearchProps = ComponentProps<typeof QuestionsSection> &
  ComponentProps<typeof ProfileSkills> &
  Pick<
    ComponentProps<typeof UserProfileBackground>,
    'firstName' | 'displayName'
  > &
  Pick<UserResponse, 'email'> & {
    readonly teams: ReadonlyArray<
      Omit<ComponentProps<typeof UserProfileBackground>, 'firstName'> & {
        editHref?: string;
      }
    >;
  } & {
    editSkillsHref?: string;
    editQuestionsHref?: string;
  };

const UserProfileResearch: React.FC<UserProfileResearchProps> = ({
  firstName,
  displayName,
  email,
  teams,
  skills,
  skillsDescription,
  questions,

  editSkillsHref,
  editQuestionsHref,
}) => {
  const { isEnabled } = useFlags();
  return (
    <ProfileCardList>
      {[
        ...teams.map((team) => ({
          card: (
            <UserProfileBackground
              key={team.id}
              {...team}
              firstName={firstName}
            />
          ),
          editLink:
            team.editHref !== undefined
              ? {
                  href: team.editHref,
                  label: `Edit role on ${team.displayName}`,
                  enabled: isEnabled('EDIT_PROFILE_REST'),
                }
              : undefined,
        })),
        {
          card: skills.length ? (
            <ProfileSkills
              skillsDescription={skillsDescription}
              skills={skills}
            />
          ) : null,
          editLink:
            editSkillsHref === undefined
              ? undefined
              : {
                  href: editSkillsHref,
                  label: 'Edit expertise and resources',
                  enabled: isEnabled('EDIT_PROFILE_SKILLS'),
                },
        },
        {
          card: questions.length ? (
            <QuestionsSection firstName={firstName} questions={questions} />
          ) : null,
          editLink:
            editQuestionsHref === undefined
              ? undefined
              : {
                  href: editQuestionsHref,
                  label: 'Edit open questions',
                  enabled: isEnabled('EDIT_PROFILE_QUESTIONS'),
                },
        },
        {
          card: (
            <CtaCard href={createMailTo(email)} buttonText="Contact">
              <strong>Interested in what you have seen?</strong> <br />
              Why not get in touch with {displayName}?
            </CtaCard>
          ),
        },
      ]}
    </ProfileCardList>
  );
};

export default UserProfileResearch;