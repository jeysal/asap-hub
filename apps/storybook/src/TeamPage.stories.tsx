import React, { ComponentProps } from 'react';
import { formatISO, subDays } from 'date-fns';
import { text } from '@storybook/addon-knobs';
import {
  TeamPage,
  TeamAbout,
  TeamOutputs,
  TeamWorkspace,
  ToolModal,
} from '@asap-hub/react-components';

import { LayoutDecorator } from './layout';

export default {
  title: 'Pages / Team',
  decorators: [LayoutDecorator],
};

const commonProps = (): Omit<ComponentProps<typeof TeamPage>, 'children'> => ({
  id: '42',
  displayName: 'Ramirez, T',
  projectTitle:
    'Molecular actions of PD-associated pathological proteins using in vitro human pluripotent steam cell brain organoids.',
  projectSummary:
    'This project provides a transformational biological understanding of the cellular mechanisms that converge to cause the degeneration seen in Parkinson’s disease (PD), given the now well-studied genetic landscape [1]. The specific hypothesis addressed by this proposal is that bioenergetic (mitochondrial and mTOR regulation), glycolipid/lipid and neuroimmune abnormalities can converge, resulting in cell dysfunction of neurons, astrocytes and microglia that lead to PD. The current conventional view of the cellular and systemic culprits of PD has not led to any successful drug development. This project is organized into 5 synergistic research components. Each Co-Investigator (Co-I) addresses the central research questions in different human cellular systems (neurons and glia), in vivo models and methodological frameworks. The proposed work will provide new and transformational biological insight by systematically connecting critical cellular, organelle, metabolic, and neuroimmune mechanisms that converge in unique and specific intercellular pathways to cause the degeneration leading to PD. These critical experiments and analyses proposed will have a high and lasting impact on development of new PD therapeutics. Without this kind of comprehensive study by several teams working together, siloed information, such as protein aggregation, mitochondrial failure, autophagy, mTOR/lysosomal abnormalities and lipid stress will remain as detailed but incomplete and disconnected narratives, not reflecting what actually causes PD in individual patients with age.',
  applicationNumber: 'Unknnow',
  lastModifiedDate: formatISO(subDays(new Date(), 2)),
  skills: [],
  pointOfContact: {
    id: '2',
    displayName: 'Peter Venkman',
    firstName: 'Peter',
    lastName: 'Venkman',
    email: 'peter@ven.com',
    role: 'Project Manager',
  },
  members: [
    {
      id: '1',
      displayName: 'Daniel Ramirez',
      firstName: 'Daniel',
      lastName: 'Ramirez',
      email: 'd@niel.com',
      role: 'Lead PI (Core Leadership)',
    },
    {
      id: '2',
      displayName: 'Peter Venkman',
      firstName: 'Peter',
      lastName: 'Venkman',
      email: 'peter@ven.com',
      role: 'Project Manager',
      avatarUrl: text(
        'Member 2 Avatar URL',
        'https://www.hhmi.org/sites/default/files/styles/epsa_250_250/public/Programs/Investigator/Randy-Schekman-400x400.jpg',
      ),
    },
    {
      id: '3',
      displayName: 'Tess W. B. Goetz',
      firstName: 'Tess',
      lastName: 'Goetz',
      email: 'tess@goetz.com',
      role: 'Collaborating PI',
    },
    {
      id: '4',
      displayName: 'Robin Peploe',
      firstName: 'Robin',
      lastName: 'Peploe',
      email: 'r@bin.com',
      role: 'Collaborating PI',
    },
    {
      id: '5',
      displayName: 'Alice Lane',
      firstName: 'Alice',
      lastName: 'Lane',
      email: 'l@ne.com',
      role: 'Collaborating PI',
    },
    {
      id: '6',
      displayName: 'Philip Mars',
      firstName: 'Philip',
      lastName: 'Mars',
      email: 'm@rs.com',
      role: 'Collaborating PI',
    },
    {
      id: '7',
      displayName: 'Emmanuel Depay',
      firstName: 'Emanuel',
      lastName: 'Depay',
      email: 'em@nuel.com',
      role: 'Collaborating PI',
    },
  ],
  aboutHref: '/wrong',
  outputsHref: '/wrong',
  workspaceHref: '/wrong',
});

const tool = (): ComponentProps<typeof TeamWorkspace>['tools'][0] => ({
  name: text('Tool Name', 'Slack (#team-ferguson)'),
  description: text(
    'Tool Description',
    'Chat privately with your team members or seek out others in the ASAP Network',
  ),
  url: text('Tool URL', 'https://slack.com'),
  href: '/wrong',
});

const tools = (): ComponentProps<typeof TeamWorkspace>['tools'] => [
  tool(),
  {
    name: 'Google Drive',
    description:
      "Access your team's private and secure Google Drive with unlimited storage",
    url: '/wrong',
    href: '/wrong',
  },
  {
    name: 'Protocols.io',
    description:
      'Post and find protocols privately within your team or share with the ASAP Network',
    url: '/wrong',
    href: '/wrong',
  },
];

export const AboutTab = () => (
  <TeamPage {...commonProps()} aboutHref="#">
    <TeamAbout {...commonProps()}></TeamAbout>
  </TeamPage>
);

export const OutputsTab = () => (
  <TeamPage {...commonProps()} outputsHref="#">
    <TeamOutputs />
  </TeamPage>
);

export const WorkspaceTab = () => (
  <TeamPage {...commonProps()} tools={tools()} workspaceHref="#">
    <TeamWorkspace {...commonProps()} tools={tools()} newToolHref="/wrong" />
  </TeamPage>
);

export const WorkspaceTabEditTool = () => (
  <>
    <TeamPage {...commonProps()} tools={tools()} workspaceHref="#">
      <TeamWorkspace {...commonProps()} tools={tools()} newToolHref="/wrong" />
    </TeamPage>
    <ToolModal
      {...tool()}
      title={text('Modal Title', 'Add Link')}
      backHref="/wrong"
    />
  </>
);
