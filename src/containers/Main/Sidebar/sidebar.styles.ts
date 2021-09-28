import { createUseStyles } from "react-jss";

import { rem } from "../../../utils/jss";
import COLORS from "../../../constants/COLORS";

export default createUseStyles({
  root: {
    flex: "30% 0 0",
    minWidth: rem(320),
    boxSizing: "border-box",
    padding: [rem(16), rem(16), rem(24)],
    borderRight: `1px solid ${COLORS.borderBlue}`,
    backgroundColor: COLORS.bgBlack,
  },
  infoWrapper: { display: "flex", alignItems: "center", marginBottom: rem(32) },
  infoTitle: {
    marginTop: 0,
    marginBottom: rem(12),
    fontSize: rem(14),
    lineHeight: rem(20),
    color: COLORS.textWhite,
  },
  infoGroup: { flex: 1 },
  avatarWrapper: {
    flex: "none",
    backgroundColor: COLORS.bgWhite,
    overflow: "hidden",
    borderRadius: "50%",
    width: rem(50),
    height: rem(50),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: rem(12),
    cursor: "none",
  },
  avatar: { width: "100%" },
  title: {
    margin: [rem(16), 0, rem(8)],
    fontSize: rem(20),
    lineHeight: rem(24),
    color: COLORS.textWhite,
  },
  listChannels: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  channelItem: {},
  link: {
    display: "block",
    color: COLORS.textGray,
    textDecoration: "none",
    padding: [rem(12)],
    fontSize: rem(16),
    lineHeight: rem(24),
    "&.active": {
      fontWeight: "bold",
      color: COLORS.textWhite,
    },
  },
});
