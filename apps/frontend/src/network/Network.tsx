import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { join } from 'path';
import { NetworkPage } from '@asap-hub/react-components';
import { useDebounce } from 'use-debounce';

import { useSearch } from '../hooks';
import { TEAMS_PATH, USERS_PATH } from './routes';
import { SearchFrame } from '../structure/Frame';

const loadUserList = () =>
  import(/* webpackChunkName: "network-user-list" */ './UserList');
const loadUserProfile = () =>
  import(/* webpackChunkName: "network-user-profile" */ './users/UserProfile');
const loadTeamList = () =>
  import(/* webpackChunkName: "network-team-list" */ './TeamList');
const loadTeamProfile = () =>
  import(/* webpackChunkName: "network-team-profile" */ './teams/TeamProfile');
const UserList = React.lazy(loadUserList);
const UserProfile = React.lazy(loadUserProfile);
const TeamList = React.lazy(loadTeamList);
const TeamProfile = React.lazy(loadTeamProfile);
loadTeamList();

const Network: React.FC<Record<string, never>> = () => {
  useEffect(() => {
    loadTeamList()
      // Toggle can be pressed very quickly
      .then(loadUserList)
      // Team can be clicked only after the list has been fetched
      .then(loadTeamProfile)
      // User can be clicked only after clicking the toggle and the list has been fetched
      .then(loadUserProfile);
  }, []);

  const { path, url } = useRouteMatch();
  const {
    searchQuery,
    searchQueryParams,
    setSearchQuery,
    filters,
    toggleFilter,
  } = useSearch();
  const [searchQueryDebounce] = useDebounce(searchQuery, 400);
  const searchQueryParamString = `?${searchQueryParams.toString()}`;

  const usersHref = join(url, USERS_PATH) + searchQueryParamString;
  const teamsHref = join(url, TEAMS_PATH) + searchQueryParamString;

  return (
    <Switch>
      <Route exact path={`${path}/${USERS_PATH}`}>
        <NetworkPage
          page="users"
          usersHref={usersHref}
          teamsHref={teamsHref}
          onChangeSearch={setSearchQuery}
          onChangeFilter={toggleFilter}
          filters={filters}
          searchQuery={searchQuery}
        >
          <SearchFrame>
            <UserList filters={filters} searchQuery={searchQueryDebounce} />
          </SearchFrame>
        </NetworkPage>
      </Route>
      <Route path={`${path}/${USERS_PATH}/:id`} component={UserProfile} />
      <Route exact path={`${path}/${TEAMS_PATH}`}>
        <NetworkPage
          page="teams"
          usersHref={usersHref}
          teamsHref={teamsHref}
          onChangeSearch={setSearchQuery}
          onChangeFilter={toggleFilter}
          filters={filters}
          searchQuery={searchQuery}
        >
          <SearchFrame>
            <TeamList filters={filters} searchQuery={searchQueryDebounce} />
          </SearchFrame>
        </NetworkPage>
      </Route>
      <Route path={`${path}/${TEAMS_PATH}/:id`} component={TeamProfile} />
      <Redirect to={`${path}/${TEAMS_PATH}`} />
    </Switch>
  );
};

export default Network;
