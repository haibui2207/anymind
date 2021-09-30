import { createUseStyles } from "react-jss";

import { rem } from "../../../utils/jss";
import COLORS from "../../../constants/COLORS";

export default createUseStyles({
  root: {
    flex: 1,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    "& .ck": {
      "&.ck-editor": { flex: 1 },
      "&.ck-toolbar": { display: "none" },
      "&.ck-editor__main": { height: "100%" },
      "&.ck-editor__editable": {
        height: "100%",
        "& p": { fontSize: rem(14), lineHeight: rem(20) },
      },
      "&.ck-editor__editable_inline": {
        border: "none",
        "&::-webkit-scrollbar": { width: 10, height: 3 },
        "&::-webkit-scrollbar-track, &::-webkit-scrollbar-thumbhover": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(178, 178, 178, 0.6)",
          borderRadius: 10,
        },
      },
    },
  },
  header: {
    flex: "none",
    margin: 0,
    padding: rem(16),
    fontSize: rem(24),
    lineHeight: rem(32),
    borderBottom: `1px solid ${COLORS.borderBlue}`,
  },
  content: {
    flex: "1 0 0",
    overflow: "hidden",
    borderBottom: `1px solid ${COLORS.borderBlue}`,
    position: "relative",
  },
  errorPopup: {
    position: "absolute",
    bottom: rem(12),
    left: "50%",
    whiteSpace: "nowrap",
    transform: "translateX(-50%)",
    backgroundColor: COLORS.bgBlack,
    padding: [rem(4), rem(16)],
    fontSize: rem(12),
    textAlign: "center",
    lineHeight: rem(20),
    borderRadius: rem(50),
    color: COLORS.textWhite,
  },
  chatBox: {
    flex: "none",
    display: "flex",
    minHeight: rem(40),
    maxHeight: rem(120),
  },
  sendButton: {
    flex: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: rem(12),
    width: rem(80),
    cursor: "pointer",
    border: "none",
    color: COLORS.textWhite,
    backgroundColor: COLORS.bgBlack,
    transition: "opacity .2s ease",
    "&:not(:disabled):hover": { opacity: 0.85 },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
});
