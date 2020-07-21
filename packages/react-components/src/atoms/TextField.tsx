import React, { InputHTMLAttributes } from 'react';
import css from '@emotion/css';
import { useDebounce } from 'use-debounce';

import { perRem } from '../pixels';
import { lead, silver, ember, rose, tin } from '../colors';
import { noop, getSvgAspectRatio } from '../utils';
import { loadingImage, validTickGreenImage } from '../images';
import { useGifReplay } from '../hooks';
import {
  useValidation,
  styles,
  paddingTopBottom,
  paddingLeftRight,
  indicatorSize,
  indicatorPadding,
  validationMessageStyles,
} from '../form';

const disabledStyles = css({
  color: lead.rgb,
  backgroundColor: silver.rgb,
});

const customIndicatorPadding = (aspectRatio: number) =>
  css({
    paddingRight: `${
      (paddingLeftRight + indicatorSize * aspectRatio + indicatorPadding) /
      perRem
    }em`,
  });
const loadingStyles = css({
  paddingRight: `${
    (paddingLeftRight + indicatorSize + indicatorPadding) / perRem
  }em`,
  backgroundImage: `url(${loadingImage})`,
});
const validStyles = (gifUrl: string) =>
  css({
    ':valid': {
      paddingRight: `${
        (paddingLeftRight + indicatorSize + indicatorPadding) / perRem
      }em`,
      backgroundImage: `url(${gifUrl})`,
    },
  });
const invalidStyles = css({
  ':invalid': {
    color: ember.rgb,
    borderColor: ember.rgb,
    backgroundColor: rose.rgb,

    '~ div:last-of-type': {
      display: 'block',
    },
    '~ div': {
      color: ember.rgb,
    },
    '~ div svg': {
      fill: ember.rgb,
    },
  },
});

const textFieldStyles = css({
  backgroundPosition: `right ${paddingLeftRight / perRem}em top ${
    paddingTopBottom / perRem
  }em`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `auto ${indicatorSize / perRem}em`,

  '::placeholder': {
    color: tin.rgb,
  },

  // see invalid
  '~ div:last-of-type': {
    display: 'none',
  },
});
const containerStyles = css({
  flexBasis: '100%',
  position: 'relative',
});
const customIndicatorStyles = (aspectRatio: number) =>
  css({
    position: 'absolute',

    top: `${paddingTopBottom / perRem}em`,
    right: `${paddingLeftRight / perRem}em`,

    height: `${indicatorSize / perRem}em`,
    width: `${(indicatorSize * aspectRatio) / perRem}em`,
  });

type TextFieldProps = {
  readonly type?:
    | 'text'
    | 'search'
    | 'email'
    | 'tel'
    | 'url'
    | 'password'
    | 'date';
  readonly enabled?: boolean;

  /**
   * By default, a valid text field only shows an indicator
   * if one of the input validation attributes is set
   * to avoid polluting fields that do not have validation at all with indicators.
   * However, if custom validity checking is used, this can be used
   * to show an indicator despite no validation attributes being set.
   */
  readonly indicateValid?: boolean;
  readonly customValidationMessage?: string;

  readonly loading?: boolean;
  readonly customIndicator?: React.ReactElement;

  readonly value: string;
  readonly onChange?: (newValue: string) => void;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'placeholder' | 'required' | 'minLength' | 'maxLength' | 'pattern'
>;
const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  enabled = true,

  required,
  minLength,
  maxLength,
  pattern,

  customValidationMessage = '',

  customIndicator,
  loading = false,
  indicateValid = customIndicator === undefined &&
    (required !== undefined ||
      minLength !== undefined ||
      maxLength !== undefined ||
      pattern !== undefined),

  value,
  onChange = noop,

  ...props
}) => {
  const { validationMessage, validationTargetProps } = useValidation<
    HTMLInputElement
  >(customValidationMessage);

  const validGifUrl = useGifReplay(validTickGreenImage, [indicateValid, value]);
  const [debouncedValue] = useDebounce(value, 500);
  const debouncedIndicateValid = indicateValid && value === debouncedValue;

  return (
    <div css={containerStyles}>
      <input
        {...props}
        {...validationTargetProps}
        type={type}
        disabled={!enabled}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        value={value}
        onChange={({ currentTarget: { value: newValue } }) =>
          onChange(newValue)
        }
        css={[
          styles,
          textFieldStyles,
          enabled || disabledStyles,

          debouncedIndicateValid && validStyles(validGifUrl),
          validationMessage && invalidStyles,

          customIndicator &&
            customIndicatorPadding(getSvgAspectRatio(customIndicator)),
          loading && loadingStyles,
        ]}
      />
      {customIndicator && (
        <div css={customIndicatorStyles(getSvgAspectRatio(customIndicator))}>
          {customIndicator}
        </div>
      )}
      <div css={validationMessageStyles}>{validationMessage}</div>
    </div>
  );
};

export default TextField;