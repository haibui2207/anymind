import { createUseStyles } from "react-jss";

import { rem } from "../../../utils/jss";
import COLORS from "../../../constants/COLORS";

export default createUseStyles({
  root: {
    flex: 1,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
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
    overflow: "auto",
    borderBottom: `1px solid ${COLORS.borderBlue}`,
  },
  chatBox: { flex: "none", display: "flex" },
  editor: {
    flex: 1,
    height: rem(80),
    padding: rem(12),
    resize: "none",
    width: "100%",
    lineHeight: "normal",
    fontWeight: 400,
    boxSizing: "border-box",
    color: COLORS.textBlack,
    backgroundColor: COLORS.bgWhite,
    border: "none",
    "&:focus": { outline: "none", borderColor: COLORS.primary },
    "&::placeholder": { color: COLORS.textGray },
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
    },
    "&::-ms-clear, &::-ms-reveal": { display: "none" },
    "&:-ms-input-placeholder": { color: COLORS.textGray },
    "&:disabled": {
      cursor: "not-allowed",
      color: COLORS.textGray,
      backgroundColor: COLORS.bgGray,
    },
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
