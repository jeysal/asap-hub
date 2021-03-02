import React from 'react';
import { EventsUpcoming } from '@asap-hub/react-components';
import { useRouteMatch } from 'react-router-dom';

import { useGroupEvents } from './state';
import { usePaginationParams, usePagination } from '../../hooks';
import { NETWORK_PATH, EVENTS_PATH } from '../../routes';
import { GROUPS_PATH } from '../routes';

type UpcomingProps = {
  readonly currentTime: Date;
};
const Upcoming: React.FC<UpcomingProps> = ({ currentTime }) => {
  const { currentPage, pageSize } = usePaginationParams();
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>();
  const { items, total } = useGroupEvents(id, {
    after: currentTime.toISOString(),
    currentPage,
    pageSize,
  });

  const { numberOfPages, renderPageHref } = usePagination(total, pageSize);
  return (
    <EventsUpcoming
      currentPageIndex={currentPage}
      numberOfItems={total}
      renderPageHref={renderPageHref}
      numberOfPages={numberOfPages}
      events={items.map((event) => ({
        ...event,
        groups: event.groups.map((group) => ({
          ...group,
          href: `${NETWORK_PATH}/${GROUPS_PATH}/${group.id}`,
        })),
        href: `${EVENTS_PATH}/${event.id}`,
      }))}
    />
  );
};

export default Upcoming;
