import React, { memo, useCallback, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { apiUtil } from "../../utils";
import { IChannel, IUser, IMessage } from "../../models";
import { useConversationContext } from "../../providers/ConversationProvider";
import avatar01 from "../../assets/images/user-01.svg";
import avatar02 from "../../assets/images/user-02.svg";
import avatar03 from "../../assets/images/user-03.svg";

import useStyles from "./main.styles";
import Sidebar from "./Sidebar";
import Conversation from "./Conversation";

const Main: React.FC<{}> = () => {
  const classes = useStyles();
  const {
    users,
    channels,
    messages,
    activeUser,
    activeChannel,
    activeSidebar,
    setUsers,
    setChannels,
    setMessages,
    setActiveUser,
    setActiveChannel,
    setActiveSidebar,
  } = useConversationContext();

  const [fetchLatestMessages, { called, loading, error, data }] = useLazyQuery<
    IMessage[]
  >(apiUtil.FETCH_LATEST_MESSAGES);
  // const [fetchMoreMessages, { called, loading, error, data }] = useLazyQuery<
  //   IMessage[]
  // >(apiUtil.FETCH_MORE_MESSAGES);

  const initConversationValue = useCallback((): void => {
    const mockUsers: IUser[] = [
      { id: "Sam", name: "Sam", avatar: avatar01 },
      { id: "Russell", name: "Russell", avatar: avatar02 },
      { id: "Joyse", name: "Joyse", avatar: avatar03 },
    ];
    const mockChannels: IChannel[] = [
      { id: "1", name: "General Channel" },
      { id: "2", name: "Technology Channel" },
      { id: "3", name: "LGTM Channel" },
    ];
    // TODO Messages will be fetch from api
    const mockMessages: IMessage[] = [
      {
        messageId: "8893628174113670197",
        text: "Text from Russell",
        datetime: "2021-09-29T03:51:48.888Z",
        userId: "Russell",
      },
      {
        messageId: "4640626115768591696",
        text: "Text from Joyse",
        datetime: "2021-09-29T03:51:43.74Z",
        userId: "Joyse",
      },
      {
        messageId: "7619097256175680316",
        text: "Text from Sam",
        datetime: "2021-09-29T03:51:06.783Z",
        userId: "Sam",
      },
      {
        messageId: "8114703596647458087",
        text: "Sup",
        datetime: "2021-09-29T01:39:08.665Z",
        userId: "Sam",
      },
      {
        messageId: "459809310856795524",
        text: "Hey",
        datetime: "2021-09-29T01:02:40.527Z",
        userId: "Russell",
      },
      {
        messageId: "690924059307461292",
        text: "Hello",
        datetime: "2021-09-29T01:01:29.092Z",
        userId: "Russell",
      },
      {
        messageId: "459809310856795523",
        text: "Hey",
        datetime: "2021-09-29T01:02:40.527Z",
        userId: "Russell",
      },
      {
        messageId: "690924059307461295",
        text: "Hello",
        datetime: "2021-09-29T01:01:29.092Z",
        userId: "Russell",
      },
      {
        messageId: "459809310856795527",
        text: "Hey",
        datetime: "2021-09-29T01:02:40.527Z",
        userId: "Russell",
      },
      {
        messageId: "690924059307461492",
        text: "Hello",
        datetime: "2021-09-29T01:01:29.092Z",
        userId: "Russell",
      },
    ];
    if (!users.length) setUsers(mockUsers);
    if (!channels.length) setChannels(mockChannels);
    if (!activeUser) setActiveUser(mockUsers[0]);
    if (!activeChannel) {
      setActiveChannel(mockChannels[0]);
      if (!messages.length) {
        // TODO fetch message from api
        // fetchLatestMessages({ variables: { channelId: mockChannels[0] } });
        setMessages(mockMessages);
      }
    } else {
      if (!messages.length) {
        // TODO fetch message from api with existed channel
        // fetchLatestMessages({ variables: { channelId: activeChannel.id } });
        setMessages(mockMessages);
      }
    }
  }, [users, channels, messages, activeUser, activeChannel]);

  useEffect((): void => {
    initConversationValue();
  }, [initConversationValue]);

  useEffect((): void => {
    if (called && !loading) {
      if (!error && data) {
        setMessages(data);
      } else {
        // TODO show error cannot get list messages
        window.alert("Cannot fetch messages");
        console.error(error);
      }
    }
  }, [called, loading, error, data]);

  useEffect((): void => {
    setInterval((): void => {
      // TODO fetch more message every 15s
    }, 15000);
  }, [activeChannel]);

  const handleToggleMenu = useCallback((): void => {
    setActiveSidebar(!activeSidebar);
  }, [activeSidebar]);

  return (
    <div className={classes.root}>
      <div className={classes.header} data-test="main-header">
        <img
          alt="Anymind"
          src="https://anymindgroup.com/wp-content/themes/anymind/img/logo_white.svg"
          className={classes.logo}
        />
        {!activeSidebar ? (
          <button className={classes.toggleButton} onClick={handleToggleMenu}>
            <i className="icon-hamberger" />
          </button>
        ) : null}
      </div>
      <div className={classes.content}>
        <Sidebar />
        <Conversation />
      </div>
    </div>
  );
};

export default memo(Main);
