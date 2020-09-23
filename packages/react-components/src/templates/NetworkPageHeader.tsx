import React from 'react';
import css from '@emotion/css';

import { Display, Paragraph, Button, Toggle } from '../atoms';
import { SearchField } from '../molecules';
import { perRem, tabletScreen } from '../pixels';
import { paper, steel } from '../colors';
import { filterIcon, userIcon, teamIcon } from '../icons';
import { contentSidePaddingWithNavigation } from '../layout';
import { noop } from '../utils';

const containerStyles = css({
  alignSelf: 'stretch',
  background: paper.rgb,
  boxShadow: `0 2px 4px -2px ${steel.rgb}`,
  marginBottom: '2px',
  padding: `${36 / perRem}em ${contentSidePaddingWithNavigation(8)} ${
    48 / perRem
  }em `,
});

const textStyles = css({
  maxWidth: `${610 / perRem}em`,
});

const controlsStyles = css({
  display: 'grid',
  gridRowGap: `${8 / perRem}em`,
  gridColumnGap: `${18 / perRem}em`,
  alignItems: 'center',
  paddingTop: `${18 / perRem}em`,
  [`@media (min-width: ${tabletScreen.max + 1}px)`]: {
    paddingTop: `${2 / perRem}em`,
    gridTemplateColumns: 'min-content auto',
  },
});

const searchContainerStyles = css({
  display: 'grid',
  gridTemplateColumns: 'auto min-content',
  gridColumnGap: `${18 / perRem}em`,
  alignItems: 'center',
});

const buttonTextStyles = css({
  display: 'none',
  [`@media (min-width: ${tabletScreen.min}px)`]: {
    display: 'unset',
  },
});

type NetworkPageHeaderProps = {
  onChangeToggle?: () => void;
  onChangeSearch?: (newQuery: string) => void;
  query: string;
  page: 'teams' | 'users';
};

const NetworkPageHeader: React.FC<NetworkPageHeaderProps> = ({
  onChangeSearch = noop,
  query,
  onChangeToggle = noop,
  page,
}) => {
  return (
    <header css={containerStyles}>
      <Display styleAsHeading={2}>Network</Display>
      <div css={textStyles}>
        <Paragraph accent="lead">
          Explore the ASAP Network where the collaboration begins! Search and
          browse and then connect with individuals and teams across the ASAP
          Network.
        </Paragraph>
      </div>
      <div css={controlsStyles}>
        <Toggle
          leftButtonText="Teams"
          leftButtonIcon={teamIcon}
          rightButtonText="People"
          rightButtonIcon={userIcon}
          onChange={onChangeToggle}
          position={page === 'teams' ? 'left' : 'right'}
        />
        <div css={searchContainerStyles}>
          <SearchField
            value={query}
            placeholder={
              page === 'users' ? 'Search for someone…' : 'Search for a team…'
            }
            onChange={onChangeSearch}
          />
          <Button enabled={false}>
            {filterIcon}
            <span css={buttonTextStyles}>Filters</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NetworkPageHeader;