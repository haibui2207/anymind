import { createUseStyles } from "react-jss";

import { rem } from "../../../../../utils/jss";
import COLORS from "../../../../../constants/COLORS";

export default createUseStyles({
  root: {
    padding: rem(16),
    overflow: "auto",
    display: "flex",
    boxSizing: "border-box",
    "&.reverse": {
      flexDirection: "row-reverse",
      "& $avatarWrapper": {
        marginRight: 0,
        marginLeft: rem(12),
      },
    },
  },
  avatarWrapper: {
    flex: "none",
    backgroundColor: COLORS.bgWhite,
    overflow: "hidden",
    borderRadius: "50%",
    width: rem(40),
    height: rem(40),
    position: "relative",
    marginRight: rem(12),
  },
  avatar: {
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  userName: {
    marginBottom: 0,
    marginTop: rem(4),
    fontSize: rem(12),
    lineHeight: rem(16),
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontWeight: "bold",
  },
  dateTime: {
    display: "inline-block",
    fontWeight: "normal",
    color: COLORS.textGray,
    fontSize: rem(10),
    marginLeft: rem(12),
  },
  content: {},
  message: {
    fontSize: rem(14),
    lineHeight: rem(16),
  },
});
