import React, { memo, useCallback } from "react";
import classNames from "classnames";

import { Select } from "../../../components";
import { IChannel, IUser } from "../../../models";
import { useConversationContext } from "../../../providers/ConversationProvider";

import useStyles from "./sidebar.styles";

const Sidebar: React.FC<{}> = () => {
  const classes = useStyles();
  const {
    users,
    channels,
    activeUser,
    activeChannel,
    setActiveUser,
    setActiveChannel,
  } = useConversationContext();

  const handleChannelClick = useCallback(
    (channel: IChannel): void => {
      if (activeChannel?.id !== channel.id) {
        setActiveChannel(channel);
      }
    },
    [activeChannel]
  );

  const handleUserSelectChange = useCallback(
    (user: IUser): void => {
      if (activeUser?.id !== user.id) {
        setActiveUser(user);
      }
    },
    [activeUser]
  );

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        <div className={classes.avatarWrapper}>
          <img
            alt={activeUser?.name}
            src={activeUser?.avatar}
            className={classes.avatar}
          />
        </div>
        <div className={classes.infoGroup}>
          <h4 className={classes.infoTitle}>Switch user</h4>
          <Select
            name="user"
            options={users}
            onChange={({ value }: { value: IUser }) =>
              handleUserSelectChange(value)
            }
            value={activeUser}
            getOptionLabel={(user: IUser): string => user.name}
            getOptionValue={(user: IUser): string => user.name}
          />
        </div>
      </div>
      <h4 className={classes.title}>Channels</h4>
      <ul className={classes.listChannels}>
        {channels.map((channel: IChannel) => (
          <li key={channel.id} className={classes.channelItem}>
            <a
              href="/#"
              type="button"
              className={classNames(classes.link, {
                active: activeChannel?.id === channel.id,
              })}
              onClick={(e) => {
                e.preventDefault();
                handleChannelClick(channel);
              }}
            >
              #&nbsp;&nbsp;{channel.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Sidebar);
