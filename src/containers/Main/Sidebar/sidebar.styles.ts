import { createUseStyles } from "react-jss";

import { rem } from "../../../utils/jss";
import COLORS from "../../../constants/COLORS";
import BREAKPOINTS from "../../../constants/BREAKPOINTS";

export default createUseStyles({
  root: {
    width: rem(320),
    boxSizing: "border-box",
    padding: [rem(16), rem(16), rem(24)],
    backgroundColor: COLORS.bgBlack,
    height: "100%",
    transform: "translateX(0)",
    transition: "width .5s ease, padding .3s ease, transform .5s ease",
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

  [`@media only screen and (max-width: ${BREAKPOINTS.maxLg}px)`]: {
    root: { width: rem(260) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { width: rem(240), padding: [rem(16), rem(8), rem(24)] },
    infoWrapper: { marginBottom: rem(24) },
    infoTitle: { fontSize: rem(12), lineHeight: rem(16) },
    avatarWrapper: { width: rem(40), height: rem(40), marginRight: rem(8) },
    title: { fontSize: rem(16), lineHeight: rem(20) },
    link: { padding: [rem(8)], fontSize: rem(12), lineHeight: rem(16) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      "&:not(.show)": { transform: "translateX(-100%)" },
    },
    toggleButton: {
      display: "block",
      position: "absolute",
      right: 0,
      width: rem(50),
      height: rem(50),
      transform: "translateX(100%)",
      color: COLORS.textWhite,
      cursor: "pointer",
      backgroundColor: COLORS.bgBlack,
      border: "none",
    },
  },
});
