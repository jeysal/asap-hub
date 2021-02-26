import React, { ComponentProps } from 'react';
import css from '@emotion/css';
import { EventResponse } from '@asap-hub/model';
import formatDistance from 'date-fns/formatDistance';

import { EventInfo, BackLink } from '../molecules';
import { Card, Paragraph } from '../atoms';
import { perRem } from '../pixels';
import { contentSidePaddingWithNavigation } from '../layout';

const containerStyles = css({
  padding: `${36 / perRem}em ${contentSidePaddingWithNavigation(8)}`,
});

type EventPageProps = ComponentProps<typeof EventInfo> &
  Pick<EventResponse, 'lastModifiedDate'> & { readonly backHref: string };
const EventPage: React.FC<EventPageProps> = ({
  backHref,
  lastModifiedDate,
  ...props
}) => (
  <div css={containerStyles}>
    <BackLink href={backHref} />
    <Card>
      <EventInfo {...props} />
      <Paragraph accent="lead">
        <small>
          Last updated: {formatDistance(new Date(), new Date(lastModifiedDate))}{' '}
          ago
        </small>
      </Paragraph>
    </Card>
  </div>
);

export default EventPage;