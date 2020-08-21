import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { join } from 'path';
import {
  Paragraph,
  ProfilePage,
  ProfileAbout,
} from '@asap-hub/react-components';

import { useUserById } from '../api';

const Profile: React.FC<{}> = () => {
  const {
    url,
    path,
    params: { id },
  } = useRouteMatch();

  const { loading, data: profile, error } = useUserById(id);

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  if (profile) {
    const profilePageProps = {
      ...profile,
      aboutHref: join(url, 'about'),
      researchInterestsHref: join(url, './research-interests'),
      outputsHref: join(url, 'outputs'),
    };

    return (
      <ProfilePage {...profilePageProps}>
        <Switch>
          <Route path={`${path}/about`}>
            <ProfileAbout {...profile} />
          </Route>
          <Route path={`${path}/research-interests`}>
            TODO Research Interests here
          </Route>
          <Route path={`${path}/outputs`}>TODO Outputs here</Route>

          <Redirect to={join(url, 'about')} />
        </Switch>
      </ProfilePage>
    );
  }

  return (
    <Paragraph>
      {error.name}
      {': '}
      {error.message}
    </Paragraph>
  );
};

export default Profile;
