import React from 'react';
import css from '@emotion/css';
import { NewsOrEventResponse } from '@asap-hub/model';

import { TagLabel, Display, Card, Caption, Link } from '../atoms';
import { RichText } from '../organisms';
import { perRem } from '../pixels';
import { contentSidePaddingWithNavigation } from '../layout';
import { formatDate } from '../utils';
import { externalLinkIcon } from '../icons';

const containerStyles = css({
  alignSelf: 'stretch',
  padding: `${36 / perRem}em ${contentSidePaddingWithNavigation(8)}`,
});

const footerContainer = css({
  marginTop: `${30 / perRem}em`,
});

const richTextContainer = css({
  marginTop: `${12 / perRem}em`,
  marginBottom: `${24 / perRem}em`,
});

type NewsOrEventPageProps = Pick<
  NewsOrEventResponse,
  'text' | 'title' | 'type' | 'created' | 'link' | 'linkText'
>;

const NewsOrEventPage: React.FC<NewsOrEventPageProps> = ({
  text = '',
  created,
  title,
  type,
  link,
  linkText,
}) => {
  const attachmentComponent = link ? (
    <div>
      <Caption bold asParagraph>
        Attachments
      </Caption>
      <div css={{ fontSize: `${13 / perRem}em` }}>
        <Link buttonStyle small={true} href={link}>
          {externalLinkIcon}
          <span css={{ fontWeight: 'normal' }}>
            {linkText || 'Open External Link'}
          </span>
        </Link>
      </div>
    </div>
  ) : null;
  const publishDateComponent = (
    <Caption accent={'lead'} asParagraph>
      Posted: {formatDate(new Date(created))} by ASAP
    </Caption>
  );

  return (
    <div css={containerStyles}>
      <Card>
        <TagLabel>{type}</TagLabel>
        <Display styleAsHeading={3}>{title}</Display>
        {publishDateComponent}
        <div css={richTextContainer}>
          <RichText text={text} sanitize={false} />
        </div>
        {attachmentComponent}
        <div css={footerContainer}>{publishDateComponent}</div>
      </Card>
    </div>
  );
};

export default NewsOrEventPage;