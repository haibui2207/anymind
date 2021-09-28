import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import COLORS from '../../constants/COLORS';
import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  select: {
    fontWeight: 400,
    fontSize: rem(16),
    '& .custom-react-select__control': {
      minHeight: rem(32),
      borderRadius: rem(4),
      boxShadow: 'none',
      borderColor: COLORS.borderGray,
    },
    '& .custom-react-select__control--is-disabled': {
      backgroundColor: COLORS.bgGray,
    },
    '& .custom-react-select__control--menu-is-open': {
      borderColor: COLORS.primary,
      '&:hover': { borderColor: COLORS.primary },
    },
    '& .custom-react-select__value-container': {
      paddingLeft: rem(14),
    },
    '& .custom-react-select__placeholder': {
      color: COLORS.textGray,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      whiteSpace: 'nowrap',
    },
    '& .custom-react-select__indicator-separator': {
      display: 'none',
    },
    '& .custom-react-select__single-value': {
      color: COLORS.textBlack,
      fontSize: 'inherit',
      fontWeight: 'inherit',
    },
    '& .custom-react-select__single-value--is-disabled': {
      color: COLORS.textGray,
    },
    '& .custom-react-select__indicator': {
      height: rem(32),
      padding: [0, rem(12)],
      alignItems: 'center',
      '& > [class^=icon-]': { fontSize: rem(8), color: COLORS.textBlack },
    },
    '& .custom-react-select__option': {
      fontSize: 'inherit',
      fontWeight: 'inherit',
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    select: {
      fontSize: rem(14),
      '& .custom-react-select__control': { minHeight: rem(30) },
      '& .custom-react-select__indicator': { height: rem(30) },
    },
  },
});
