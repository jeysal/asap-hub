import React from 'react';
import css from '@emotion/css';
import format from 'date-fns/format';
import { UserResponse, UserTeam } from '@asap-hub/model';

import { Card, Link, Headline2, Avatar, Caption } from '../atoms';
import { ProfilePersonalText } from '../molecules';
import { tabletScreen, vminLinearCalcClamped, mobileScreen } from '../pixels';
import { paddingStyles } from '../card';

const containerStyles = css({
  paddingBottom: `${vminLinearCalcClamped(
    mobileScreen,
    12,
    tabletScreen,
    24,
    'px',
  )}`,

  display: 'grid',
  columnGap: '25px',
  rowGap: '12px',
  [`@media (min-width: ${tabletScreen.min}px)`]: {
    gridTemplateColumns: 'min-content auto',
  },
});

const textContainerStyles = css({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'start',
});

const profileTextStyles = css({
  flexBasis: '100%',
});

const moveStyles = css({
  [`@media (min-width: ${tabletScreen.min}px)`]: {
    flexBasis: 'auto',
    order: -1,
  },
});

type PeopleCardProps = Pick<
  UserResponse,
  | 'avatarURL'
  | 'department'
  | 'displayName'
  | 'firstName'
  | 'institution'
  | 'jobTitle'
  | 'createdDate'
  | 'lastName'
  | 'location'
> & {
  readonly href: string;
  readonly teams: ReadonlyArray<UserTeam & { href: string }>;
};
const PeopleCard: React.FC<PeopleCardProps> = ({
  department,
  displayName,
  institution,
  createdDate,
  firstName,
  lastName,
  location,
  teams,
  jobTitle,
  avatarURL,
  href,
}) => {
  return (
    <Card>
      <div css={[paddingStyles, containerStyles]}>
        <Link theme={null} href={href}>
          <Avatar
            imageUrl={avatarURL}
            firstName={firstName}
            lastName={lastName}
          />
        </Link>
        <div css={textContainerStyles}>
          <div css={moveStyles}>
            <Link theme={null} href={href}>
              <Headline2 styleAsHeading={4}>{displayName}</Headline2>
            </Link>
          </div>
          <div css={profileTextStyles}>
            <ProfilePersonalText
              department={department}
              institution={institution}
              location={location}
              jobTitle={jobTitle}
              teams={teams}
            />
          </div>
          <div css={moveStyles}>
            <Caption accent={'lead'} asParagraph>
              Joined: {format(new Date(createdDate), 'Mo MMMM yyyy')}
            </Caption>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PeopleCard;
