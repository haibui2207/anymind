import React, { memo, useCallback, useEffect } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";

import { apiUtil } from "../../utils";
import { IChannel, IUser, IMessage } from "../../models";
import { useConversationContext } from "../../providers/ConversationProvider";
import avatar01 from "../../assets/images/user-01.svg";
import avatar02 from "../../assets/images/user-02.svg";
import avatar03 from "../../assets/images/user-03.svg";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import useStyles from "./main.styles";

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

  const handleFetchLatestMessagesSuccess = useCallback(
    (data: { fetchLatestMessages: IMessage[] }): void => {
      setMessages([...data.fetchLatestMessages]);
    },
    []
  );

  const handleFetchLatestMessagesFailed = useCallback(
    (error: ApolloError): void => {
      // TODO show error cannot get list messages
      window.alert("Cannot fetch messages");
      console.error(error);
    },
    []
  );

  const handleFetchMoreMessagesSuccess = useCallback(
    (data: { fetchMoreMessages: IMessage[] }): void => {
      if (data.fetchMoreMessages.length > 0) {
        setMessages([...messages, ...data.fetchMoreMessages]);
        // Waiting messages update
        setTimeout(() => {
          const messagesBox = document.getElementById("messages-box");
          if (messagesBox) {
            messagesBox.scrollTop = messagesBox.scrollHeight;
          }
        }, 100);
      }
    },
    [messages, document]
  );

  const handleFetchMoreMessagesFailed = useCallback(
    (error: ApolloError): void => {
      // TODO show error cannot get list messages
      window.alert("Cannot fetch more messages");
      console.error(error);
    },
    []
  );

  const [fetchLatestMessages] = useLazyQuery<{
    fetchLatestMessages: IMessage[];
  }>(apiUtil.FETCH_LATEST_MESSAGES, {
    onCompleted: handleFetchLatestMessagesSuccess,
    onError: handleFetchLatestMessagesFailed,
  });

  const [fetchMoreMessages, { called, refetch }] = useLazyQuery<{
    fetchMoreMessages: IMessage[];
  }>(apiUtil.FETCH_MORE_MESSAGES, {
    onCompleted: handleFetchMoreMessagesSuccess,
    onError: handleFetchMoreMessagesFailed,
    notifyOnNetworkStatusChange: true,
  });

  const initConversationValue = useCallback((): void => {
    if (!users.length) {
      const mockUsers: IUser[] = [
        { id: "Sam", name: "Sam", avatar: avatar01 },
        { id: "Russell", name: "Russell", avatar: avatar02 },
        { id: "Joyse", name: "Joyse", avatar: avatar03 },
      ];
      setUsers(mockUsers);
      if (!activeUser) setActiveUser(mockUsers[0]);
    }
    if (!channels.length) {
      const mockChannels: IChannel[] = [
        { id: "1", name: "General Channel" },
        { id: "2", name: "Technology Channel" },
        { id: "3", name: "LGTM Channel" },
      ];
      setChannels(mockChannels);
      if (!activeChannel) {
        setActiveChannel(mockChannels[0]);
        fetchLatestMessages({ variables: { channelId: mockChannels[0].id } });
      }
    }
  }, [users, channels, activeUser, activeChannel]);

  useEffect((): void => {
    initConversationValue();
  }, [initConversationValue]);

  useEffect((): (() => void) => {
    const timer = setInterval((): void => {
      if (activeChannel && messages.length > 0) {
        const variables: {
          channelId: string;
          messageId: string;
          old: boolean;
        } = {
          channelId: activeChannel.id,
          messageId: messages[messages.length - 1].messageId,
          old: false,
        };
        if (called && refetch) {
          refetch(variables);
        } else {
          fetchMoreMessages({ variables: variables });
        }
      }
    }, 5000);

    return (): void => {
      clearInterval(timer);
    };
  }, [called, activeChannel, messages]);

  const handleToggleMenu = useCallback((): void => {
    setActiveSidebar(!activeSidebar);
  }, [activeSidebar]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img
          alt="Anymind"
          src="https://anymindgroup.com/wp-content/themes/anymind/img/logo_white.svg"
          className={classes.logo}
          data-test="main-logo"
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
