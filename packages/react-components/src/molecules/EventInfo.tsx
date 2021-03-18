import React, { ComponentProps } from 'react';
import css from '@emotion/css';
import { EventResponse } from '@asap-hub/model';
import { events, network } from '@asap-hub/routing';

import { Headline3, Link, Anchor } from '../atoms';
import { perRem, largeDesktopScreen } from '../pixels';
import { groupsIcon, eventPlaceholderIcon, calendarIcon } from '../icons';
import { lead } from '../colors';
import { EventTime } from '.';

const TITLE_LIMIT = 55;

const imageContainerStyle = css({
  flexShrink: 0,
  borderRadius: `${6 / perRem}em`,
  height: `${102 / perRem}em`,
  marginRight: `${24 / perRem}em`,
  marginTop: `${12 / perRem}em`,
  width: `${102 / perRem}em`,
  overflow: 'hidden',

  [`@media (max-width: ${largeDesktopScreen.min}px)`]: {
    display: 'none',
  },
});

const cardStyles = css({
  display: 'flex',
  flexDirection: 'row',
});

const groupsStyles = css({
  display: 'grid',
  listStyle: 'none',
  margin: 0,
  padding: `${12 / perRem}em 0`,
  gridRowGap: `${12 / perRem}em`,
});
const asapEventStyles = css({
  padding: `${12 / perRem}em 0`,
});
const eventOwnerStyles = css({
  color: lead.rgb,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const imageStyle = css({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

const iconStyles = css({
  display: 'inline-grid',
  verticalAlign: 'middle',
  width: `${24 / perRem}em`,
  height: `${24 / perRem}em`,
  paddingRight: `${15 / perRem}em`,
});

type EventInfoProps = ComponentProps<typeof EventTime> &
  Pick<EventResponse, 'id' | 'title' | 'thumbnail' | 'groups' | 'status'> & {
    titleLimit?: number | null;
  };

const EventInfo: React.FC<EventInfoProps> = ({
  id,
  title,
  thumbnail,
  groups,
  status,
  titleLimit = TITLE_LIMIT,
  ...props
}) => {
  const imageComponent = thumbnail ? (
    <img alt={`Thumbnail for "${title}"`} src={thumbnail} css={imageStyle} />
  ) : (
    eventPlaceholderIcon
  );

  return (
    <div css={cardStyles}>
      <div css={imageContainerStyle}>{imageComponent}</div>
      <div>
        <Anchor
          href={
            status === 'Cancelled'
              ? undefined
              : events({}).event({ eventId: id }).$
          }
        >
          <Headline3 styleAsHeading={4}>
            {title.substr(0, titleLimit ?? undefined)}
            {titleLimit && title.length > titleLimit ? '…' : undefined}
          </Headline3>
        </Anchor>
        <EventTime {...props} />
        {groups.length ? (
          <ul css={groupsStyles}>
            {groups.map((group) => (
              <li key={group.id} css={eventOwnerStyles}>
                <Link
                  href={network({}).groups({}).group({ groupId: group.id }).$}
                >
                  <span css={iconStyles}>{groupsIcon}</span>
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div css={[asapEventStyles, eventOwnerStyles]}>
            <span css={iconStyles}>{calendarIcon}</span>ASAP Event
          </div>
        )}
      </div>
    </div>
  );
};

export default EventInfo;
