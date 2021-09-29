import React, { memo } from "react";

import coverImage from "../../../../assets/images/empty-conversation.jpg";

import useStyles from "./empty.styles";

const Empty: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        alt="No message"
        className={classes.image}
        src={coverImage}
        data-test="empty-image"
      />
      <h2 className={classes.title} data-test="empty-title">
        No message found
      </h2>
      <p className={classes.description} data-test="empty-description">
        Let's start your conversation
      </p>
    </div>
  );
};

export default memo(Empty);
