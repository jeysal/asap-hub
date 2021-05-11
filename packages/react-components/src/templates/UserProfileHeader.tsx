import React, { useContext } from 'react';
import css from '@emotion/css';
import formatDistance from 'date-fns/formatDistance';
import { UserResponse } from '@asap-hub/model';
import { network } from '@asap-hub/routing';
import { UserProfileContext } from '@asap-hub/react-context';

import {
  tabletScreen,
  perRem,
  vminLinearCalc,
  mobileScreen,
  largeDesktopScreen,
} from '../pixels';
import { Avatar, Paragraph, TabLink, Display, Link } from '../atoms';
import { UserProfilePersonalText, TabNav, SocialIcons } from '../molecules';
import { contentSidePaddingWithNavigation } from '../layout';
import { createMailTo } from '../mail';
import { paper, tin } from '../colors';
import { editIcon, uploadIcon } from '../icons';

const containerStyles = css({
  backgroundColor: paper.rgb,
  padding: `${12 / perRem}em ${contentSidePaddingWithNavigation(10)} 0`,

  display: 'grid',
  grid: `
    ".             edit-personal-info" ${24 / perRem}em
    "personal-info personal-info     " auto
    "contact       edit-contact-info " auto
    "tab-nav       tab-nav           " auto
      / 1fr ${36 / perRem}em
  `,
  gridColumnGap: `${12 / perRem}em`,

  [`@media (min-width: ${tabletScreen.width}px)`]: {
    paddingTop: `${36 / perRem}em`,
    grid: `
      "edit-personal-info personal-info ."
      "edit-contact-info  contact       ."
      ".                  tab-nav       ."
        / ${36 / perRem}em 1fr ${36 / perRem}em
    `,
    gridColumnGap: vminLinearCalc(
      mobileScreen,
      24,
      largeDesktopScreen,
      30,
      'px',
    ),
  },
});

const editPersonalInfoStyles = css({
  gridArea: 'edit-personal-info',
  justifySelf: 'end',
});

const staffContainerStyles = css({
  paddingBottom: `${36 / perRem}em`,
});

const personalInfoStyles = css({
  gridArea: 'personal-info',

  display: 'flex',
  flexDirection: 'column-reverse',

  [`@media (min-width: ${tabletScreen.width}px)`]: {
    // only on big grid to avoid potential Avatar <=> Edit Button overlap
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
  },

  justifyContent: 'space-between',
  alignItems: 'start',
});

const editContactStyles = css({
  gridArea: 'edit-contact-info',
});
const contactStyles = css({
  gridArea: 'contact',

  display: 'grid',

  gridRowGap: `${12 / perRem}em`,
  gridColumnGap: `${12 / perRem}em`,

  gridTemplateColumns: 'min-content min-content auto',
});
const contactNoEditStyles = css({
  gridColumnEnd: 'edit-contact-info',
});
const contactButtonStyles = css({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gridColumn: 'span 3',
  [`@media (min-width: ${tabletScreen.min}px)`]: {
    gridColumn: 'span 1',
    display: 'block',
    paddingRight: `${12 / perRem}em`,
  },
});
const lastModifiedStyles = css({
  flexBasis: 0,
  flexGrow: 9999,

  textAlign: 'right',
  alignSelf: 'flex-end',

  display: 'none',
  [`@media (min-width: ${tabletScreen.min}px)`]: {
    display: 'unset',
  },
});

const lastModifiedNoContactStyles = css({
  gridColumn: 'span 2',
});

const tabNavStyles = css({
  gridArea: 'tab-nav',
});
const avatarContainer = css({
  display: 'grid',
  width: 90,
  height: 90,
  paddingBottom: `${12 / perRem}em`,
});
const imageContainer = css({ gridRow: 1, gridColumn: 1 });
const editButtonContainer = css({
  gridRow: 1,
  gridColumn: 1,
  alignSelf: 'flex-end',
  justifySelf: 'flex-end',
});

type UserProfileHeaderProps = Pick<
  UserResponse,
  | 'id'
  | 'avatarUrl'
  | 'contactEmail'
  | 'email'
  | 'displayName'
  | 'firstName'
  | 'institution'
  | 'jobTitle'
  | 'lastModifiedDate'
  | 'lastName'
  | 'location'
  | 'role'
  | 'social'
  | 'teams'
  | 'degree'
> & {
  readonly onImageSelect?: (file: File) => void;
  readonly avatarSaving?: boolean;

  readonly editPersonalInfoHref?: string;
  readonly editContactInfoHref?: string;
};

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  id,
  displayName,
  institution,
  lastModifiedDate,
  firstName,
  lastName,
  location,
  teams,
  jobTitle,
  avatarUrl,
  contactEmail,
  email,
  degree,
  onImageSelect,
  avatarSaving,

  editPersonalInfoHref,
  editContactInfoHref,
  role,
  social,
}) => {
  const tabRoutes = network({}).users({}).user({ userId: id });
  const { isOwnProfile } = useContext(UserProfileContext);

  return (
    <header css={[containerStyles, role === 'Staff' && staffContainerStyles]}>
      <section css={personalInfoStyles}>
        <div>
          <div css={{ display: 'flex' }}>
            <Display styleAsHeading={2}>{displayName}</Display>
            {degree ? (
              <Display styleAsHeading={2}>, {degree}</Display>
            ) : isOwnProfile ? (
              <div css={{ color: tin.rgb }}>
                <Display styleAsHeading={2}>, Degree</Display>
              </div>
            ) : null}
          </div>
          <UserProfilePersonalText
            institution={institution}
            location={location}
            jobTitle={jobTitle}
            teams={teams}
            role={role}
          />
        </div>
        <div css={avatarContainer}>
          <div css={imageContainer}>
            <Avatar
              imageUrl={avatarUrl}
              firstName={firstName}
              lastName={lastName}
            />
          </div>
          {onImageSelect && (
            <div css={editButtonContainer}>
              <label>
                <Link
                  buttonStyle
                  small
                  primary
                  href={undefined}
                  label="Edit Avatar"
                  enabled={!avatarSaving}
                >
                  {uploadIcon}
                  <input
                    disabled={avatarSaving}
                    type="file"
                    accept="image/x-png,image/jpeg"
                    aria-label="Upload Avatar"
                    onChange={(event) =>
                      event.target.files?.length &&
                      onImageSelect(event.target.files[0])
                    }
                    css={{ display: 'none' }}
                  />
                </Link>
              </label>
            </div>
          )}
        </div>
      </section>
      {editPersonalInfoHref && (
        <div css={editPersonalInfoStyles}>
          <Link
            buttonStyle
            small
            primary
            href={editPersonalInfoHref}
            label="Edit personal information"
          >
            {editIcon}
          </Link>
        </div>
      )}
      <section
        css={[contactStyles, editContactInfoHref ? null : contactNoEditStyles]}
      >
        {role !== 'Staff' ? (
          <div css={contactButtonStyles}>
            <Link
              small
              buttonStyle
              primary
              href={createMailTo(contactEmail || email)}
            >
              Contact
            </Link>
          </div>
        ) : null}
        <SocialIcons {...social} />
        <div
          css={[
            lastModifiedStyles,
            role === 'Staff' ? lastModifiedNoContactStyles : null,
          ]}
        >
          <Paragraph accent="lead">
            <small>
              Last updated:{' '}
              {formatDistance(new Date(), new Date(lastModifiedDate))} ago
            </small>
          </Paragraph>
        </div>
      </section>
      {editContactInfoHref && (
        <div css={editContactStyles}>
          <Link
            buttonStyle
            small
            primary
            href={editContactInfoHref}
            label="Edit contact information"
          >
            {editIcon}
          </Link>
        </div>
      )}
      <div css={tabNavStyles}>
        {role !== 'Staff' ? (
          <TabNav>
            <TabLink href={tabRoutes.research({}).$}>Research</TabLink>
            <TabLink href={tabRoutes.about({}).$}>Background</TabLink>
            <TabLink href={tabRoutes.outputs({}).$}>Shared Outputs</TabLink>
          </TabNav>
        ) : null}
      </div>
    </header>
  );
};

export default UserProfileHeader;
