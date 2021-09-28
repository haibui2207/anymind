import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import COLORS from '../../constants/COLORS';
import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    lineHeight: rem(24),
    padding: [0, rem(16)],
    textAlign: 'center',
    borderRadius: rem(5),
    position: 'relative',
    transition: 'background-color .1s linear',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    textDecoration: 'none',
    boxSizing: 'border-box',
    overflow: 'hidden',
    height: rem(40),
    fontSize: rem(16),
    '&:focus': { outline: 'none' },
    '&:hover': { cursor: 'pointer' },
    '&.primary': {
      border: 'none',
      color: COLORS.textWhite,
      backgroundColor: COLORS.primary,
      boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.15)',
      '&.disabled': {
        boxShadow: 'none',
        cursor: 'not-allowed',
        color: COLORS.textGray,
        backgroundColor: COLORS.bgGray,
      },
    },
    '&.secondary': {
      color: COLORS.primary,
      border: `1px solid ${COLORS.primary}`,
      backgroundColor: COLORS.bgWhite,
      '&.disabled': {
        cursor: 'not-allowed',
        borderColor: COLORS.borderGray,
        color: COLORS.textGray,
      },
    },
    '&.tertiary': {
      color: COLORS.textBlack,
      border: 'none',
      backgroundColor: 'transparent',
      '&.disabled': { cursor: 'not-allowed', color: COLORS.textGray },
    },
  },

  '@media (hover: hover) and (pointer: fine)': {
    root: {
      '&.primary:not(.disabled):hover': {
        opacity: 0.75,
      },
      '&.secondary:not(.disabled):hover': {
        opacity: 0.75,
      },
      '&.tertiary:not(.disabled):hover': {
        opacity: 0.75,
      },
    },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {
      fontSize: rem(14),
      height: rem(32),
    },
  },
});
