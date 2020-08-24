import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { Paragraph, TeamPage, TeamAbout } from '@asap-hub/react-components';
import { join } from 'path';
import { useTeamById } from '../api';

const Page: React.FC<{}> = () => {
  const {
    url,
    path,
    params: { id },
  } = useRouteMatch();

  const { loading, data: team, error } = useTeamById(id);

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  if (team) {
    const teamPageProps = {
      ...team,
      aboutHref: join(url, 'about'),
    };

    return (
      <TeamPage {...teamPageProps}>
        <Switch>
          <Route path={`${path}/about`}>
            <TeamAbout {...team} />
          </Route>
          <Redirect to={join(url, 'about')} />
        </Switch>
      </TeamPage>
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

export default Page;
