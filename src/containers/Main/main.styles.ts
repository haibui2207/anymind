import { createUseStyles } from "react-jss";

import { rem } from "../../utils/jss";
import COLORS from "../../constants/COLORS";

export default createUseStyles({
  root: {
    display: "flex",
    boxSizing: "border-box",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    flex: "none",
    textAlign: "center",
    padding: rem(16),
    margin: 0,
    color: COLORS.textWhite,
    backgroundColor: COLORS.bgBlack01,
  },
  content: { flex: 1, display: "flex" },
  conversation: { flex: 1, boxSizing: "border-box" },
  conversationHeader: {
    margin: 0,
    padding: rem(16),
    fontSize: rem(24),
    lineHeight: rem(32),
    borderBottom: `1px solid ${COLORS.borderBlue}`,
  },
});
