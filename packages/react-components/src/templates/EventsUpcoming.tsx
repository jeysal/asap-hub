import React, { ComponentProps } from 'react';
import css from '@emotion/css';
import { EventResponse, GroupResponse } from '@asap-hub/model';

import { perRem } from '../pixels';
import { ResultList, EventCard } from '../organisms';

const containerStyles = css({
  display: 'grid',
  gridRowGap: `${36 / perRem}em`,
});

type EventsUpcomingProps = Omit<
  ComponentProps<typeof ResultList>,
  'children'
> & {
  events: Array<
    Omit<EventResponse, 'groups'> & {
      href: string;
      groups: (GroupResponse & { href: string })[];
    }
  >;
};

const EventsUpcomingPage: React.FC<EventsUpcomingProps> = ({
  events,
  ...props
}) => (
  <div css={containerStyles}>
    <ResultList {...props}>
      {events.map(({ id, ...event }) => (
        <React.Fragment key={id}>
          <EventCard {...event} />
        </React.Fragment>
      ))}
    </ResultList>
  </div>
);
export default EventsUpcomingPage;