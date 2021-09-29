import { createUseStyles } from "react-jss";

import { rem } from "../../utils/jss";
import COLORS from "../../constants/COLORS";
import BREAKPOINTS from "../../constants/BREAKPOINTS";

export default createUseStyles({
  root: {
    display: "flex",
    boxSizing: "border-box",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: rem(16),
    flex: "none",
    height: rem(40),
    backgroundColor: COLORS.bgBlack01,
  },
  logo: { display: "block", height: "100%", flex: "none" },
  toggleButton: { display: "none" },
  content: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    position: "relative",
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    header: { justifyContent: "space-between" },
    logo: { height: "80%" },
    toggleButton: {
      display: "flex",
      marginLeft: rem(16),
      backgroundColor: COLORS.bgWhite,
      border: "none",
      borderRadius: rem(4),
      width: rem(30),
      height: rem(30),
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
  },
});
