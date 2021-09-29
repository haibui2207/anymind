import React, { memo, useCallback, useEffect, useRef } from "react";
import classNames from "classnames";

import { Select } from "../../../components";
import { IChannel, IUser } from "../../../models";
import { useConversationContext } from "../../../providers/ConversationProvider";

import useStyles from "./sidebar.styles";

const Sidebar: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const {
    users,
    channels,
    activeUser,
    activeChannel,
    activeSidebar,
    setActiveUser,
    setActiveChannel,
    setActiveSidebar,
  } = useConversationContext();

  const handleChannelClick = useCallback(
    (channel: IChannel): void => {
      if (activeChannel?.id !== channel.id) {
        setActiveChannel(channel);
        setActiveSidebar(false);
        // TODO fetch latest message when channel change
      }
    },
    [activeChannel]
  );

  const handleUserSelectChange = useCallback(
    (user: IUser): void => {
      if (activeUser?.id !== user.id) {
        setActiveUser(user);
        // TODO fetch latest message when user change
      }
    },
    [activeUser]
  );

  useEffect(() => {
    const listener = (event: any): any => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      if (activeSidebar) {
        setActiveSidebar(!activeSidebar);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, activeSidebar]);

  return (
    <div
      ref={ref}
      className={classNames("custom-scrollbar", classes.root, {
        show: activeSidebar,
      })}
    >
      <div className={classes.infoWrapper}>
        <div className={classes.avatarWrapper}>
          <img
            alt={activeUser?.name}
            src={activeUser?.avatar}
            className={classes.avatar}
            data-test="sidebar-active-user-avatar"
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
          <li
            key={channel.id}
            className={classes.channelItem}
            data-test="sidebar-channel-item"
          >
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
