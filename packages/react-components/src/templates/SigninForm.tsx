import React, { ComponentProps } from 'react';
import css from '@emotion/css';

import { EmailPasswordSignin, SsoButtons } from '../organisms';
import { Display, Divider } from '../atoms';
import {
  mobileScreen,
  largeDesktopScreen,
  vminLinearCalc,
  formTargetWidth,
  perRem,
} from '../pixels';

const styles = css({
  width: `${formTargetWidth / perRem}em`,
  maxWidth: '100%',
  display: 'grid',
  gridGap: vminLinearCalc(mobileScreen, 12, largeDesktopScreen, 24, 'px'),
});
const headerStyles = css({
  textAlign: 'center',
});
const ignoreWidthStyles = css({
  width: 0,
  minWidth: '100%',
});

type SigninProps = {
  signup?: boolean;
} & ComponentProps<typeof SsoButtons> &
  ComponentProps<typeof EmailPasswordSignin>;
const Signin: React.FC<SigninProps> = ({
  signup = false,

  onGoogleSignin,
  onOrcidSignin,

  ...props
}) => (
  <article css={styles}>
    <header css={[headerStyles, ignoreWidthStyles]}>
      <Display styleAsHeading={2}>
        {signup ? 'Create your account' : 'Sign in to the ASAP Hub'}
      </Display>
    </header>
    <SsoButtons onGoogleSignin={onGoogleSignin} onOrcidSignin={onOrcidSignin} />
    <div css={ignoreWidthStyles}>
      <Divider>or</Divider>
    </div>
    <EmailPasswordSignin signup={signup} {...props} />
  </article>
);

export default Signin;
