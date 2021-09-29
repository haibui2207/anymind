import { createUseStyles } from "react-jss";

import { rem } from "../../../../utils/jss";

export default createUseStyles({
  root: {
    padding: rem(16),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    textAlign: "center",
  },
  image: { display: "block", width: "100%", maxWidth: rem(250) },
  title: {
    marginTop: rem(16),
    marginBottom: 0,
    fontSize: rem(32),
    lineHeight: rem(48),
  },
  description: {
    marginTop: rem(12),
    marginBottom: 0,
    fontSize: rem(16),
    lineHeight: rem(24),
  },
});
