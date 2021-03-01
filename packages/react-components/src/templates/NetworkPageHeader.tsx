import React from 'react';
import css from '@emotion/css';
import { TeamRole, Role } from '@asap-hub/model';

import { Display, Paragraph, TabLink } from '../atoms';
import { perRem } from '../pixels';
import { paper, steel } from '../colors';
import { contentSidePaddingWithNavigation } from '../layout';
import { SearchAndFilter } from '../organisms';
import { Option } from '../organisms/CheckboxGroup';
import { TabNav, SearchField } from '../molecules';
import { teamIcon, userIcon, groupsIcon } from '../icons';

const visualHeaderStyles = css({
  padding: `${36 / perRem}em ${contentSidePaddingWithNavigation(8)} 0`,
  marginBottom: `${30 / perRem}em`,
  background: paper.rgb,
  boxShadow: `0 2px 4px -2px ${steel.rgb}`,
});
const textStyles = css({
  maxWidth: `${610 / perRem}em`,
});
const iconStyles = css({
  display: 'inline-grid',
  verticalAlign: 'middle',
  paddingRight: `${6 / perRem}em`,
});

const controlsStyles = css({
  padding: `0 ${contentSidePaddingWithNavigation(8)}`,
});

interface NetworkTeamsOrGroupsPageHeaderProps {
  page: 'teams' | 'groups';
  filters?: undefined;
  onChangeFilter?: undefined;
}
interface NetworkPeoplePageHeaderProps {
  page: 'users';
  filters?: Set<string>;
  onChangeFilter?: (filter: string) => void;
}
type NetworkPageHeaderProps = (
  | NetworkTeamsOrGroupsPageHeaderProps
  | NetworkPeoplePageHeaderProps
) & {
  teamsHref: string;
  usersHref: string;
  groupsHref: string;

  searchQuery: string;
  onChangeSearch?: (newQuery: string) => void;
};

const userFilters: Option<TeamRole | Role>[] = [
  { label: 'Lead PI', value: 'Lead PI (Core Leadership)' },
  { label: 'Co-PI', value: 'Co-PI (Core Leadership)' },
  { label: 'Project Manager', value: 'Project Manager' },
  { label: 'Collaborating PI', value: 'Collaborating PI' },
  { label: 'Key Personnel', value: 'Key Personnel' },
  { label: 'ASAP Staff', value: 'Staff' },
];

const NetworkPageHeader: React.FC<NetworkPageHeaderProps> = ({
  page,
  teamsHref,
  usersHref,
  groupsHref,

  onChangeSearch,
  onChangeFilter,
  searchQuery,
  filters,
}) => (
  <header>
    <div css={visualHeaderStyles}>
      <Display styleAsHeading={2}>Network</Display>
      <div css={textStyles}>
        <Paragraph accent="lead">
          Explore the ASAP Network and collaborate! Search for teams or
          individuals by keyword or name.
        </Paragraph>
      </div>
      <TabNav>
        <TabLink href={usersHref}>
          <span css={iconStyles}>{userIcon}</span>People
        </TabLink>
        <TabLink href={teamsHref}>
          <span css={iconStyles}>{teamIcon}</span>Teams
        </TabLink>
        <TabLink href={groupsHref}>
          <span css={iconStyles}>{groupsIcon}</span>Groups
        </TabLink>
      </TabNav>
    </div>
    <div css={controlsStyles}>
      {page === 'users' ? (
        <SearchAndFilter
          onChangeSearch={onChangeSearch}
          searchPlaceholder="Enter name, keyword, institution, …"
          searchQuery={searchQuery}
          onChangeFilter={onChangeFilter}
          filterOptions={userFilters}
          filterTitle="TEAM ROLES"
          filters={filters}
        />
      ) : (
        <SearchField
          placeholder={
            page === 'teams'
              ? 'Enter name, keyword, method, …'
              : 'Search for a group…'
          }
          value={searchQuery}
          onChange={onChangeSearch}
        />
      )}
    </div>
  </header>
);

export default NetworkPageHeader;
