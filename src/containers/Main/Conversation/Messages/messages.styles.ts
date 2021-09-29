import { createUseStyles } from "react-jss";

import { rem } from "../../../../utils/jss";
import COLORS from "../../../../constants/COLORS";

export default createUseStyles({
  root: {},
  moreButton: {
    border: "none",
    textAlign: "center",
    fontSize: rem(14),
    lineHeight: rem(16),
    color: COLORS.textGray,
    fontWeight: "normal",
    background: "transparent",
    display: "block",
    margin: [rem(16), "auto"],
    cursor: "pointer",
    "&:hover": { color: COLORS.textBlack },
  },
});
