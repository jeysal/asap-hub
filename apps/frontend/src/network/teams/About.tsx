import React from 'react';
import { join } from 'path';
import { TeamProfileAbout, TeamGroupsCard } from '@asap-hub/react-components';
import { TeamResponse } from '@asap-hub/model';
import { isEnabled } from '@asap-hub/flags';

import { SHARED_RESEARCH_PATH, NETWORK_PATH } from '../../routes';
import { USERS_PATH } from '../routes';
import { useTeamGroupsById } from './state';
import Frame from '../../structure/Frame';

const TeamGroups: React.FC<{ id: string }> = ({ id }) => {
  const teamGroups = useTeamGroupsById(id);
  return teamGroups.total > 0 ? <TeamGroupsCard {...teamGroups} /> : null;
};

interface AboutProps {
  readonly team: TeamResponse;
}
const About: React.FC<AboutProps> = ({ team }) => (
  <TeamProfileAbout
    {...team}
    members={team.members.map((member) => ({
      ...member,
      href: join(NETWORK_PATH, USERS_PATH, member.id),
    }))}
    proposalHref={
      team.proposalURL && join(SHARED_RESEARCH_PATH, team.proposalURL)
    }
    teamGroupsCard={
      isEnabled('GROUPS') ? (
        <Frame fallback={null}>
          <TeamGroups id={team.id} />
        </Frame>
      ) : null
    }
  />
);

export default About;
