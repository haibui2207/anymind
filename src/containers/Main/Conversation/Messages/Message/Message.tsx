import React, { memo, useCallback } from "react";
import classNames from "classnames";

import { IMessage, IUser } from "../../../../../models";
import { StaticHTML } from "../../../../../components";

import useStyles from "./message.styles";

interface IProps extends IMessage {
  user?: IUser;
  isSender: boolean;
}

const Message: React.FC<IProps> = ({ user, text, datetime, isSender }) => {
  const classes = useStyles();

  const formatDateTime = useCallback(
    (value): string => new Date(value).toLocaleTimeString(),
    []
  );

  return (
    <div className={classNames(classes.root, isSender && "reverse")}>
      <div className={classes.avatarWrapper}>
        <img
          alt={user?.name}
          src={user?.avatar}
          className={classes.avatar}
          data-test="message-user-avatar"
        />
      </div>
      <div className={classes.content}>
        <p className={classes.userName} data-test="message-user-name">
          {user?.name}
          <span className={classes.dateTime} data-test="message-date-time">
            {formatDateTime(datetime)}
          </span>
        </p>
        <div
          className={classNames("ck-content", classes.message)}
          data-test="message-text"
        >
          <StaticHTML stringHtml={text} />
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
