import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import classNames from "classnames";

import { apiUtil } from "../../../../utils";
import { IMessage, IUser } from "../../../../models";
import { useConversationContext } from "../../../../providers/ConversationProvider";

import Message from "./Message";
import useStyles from "./messages.styles";

interface IFormattedMessage extends IMessage {
  user?: IUser;
}

const Messages: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const {
    users,
    messages,
    activeUser,
    activeChannel,
    setMessages,
  } = useConversationContext();
  const [shownMoreButton, setMoreButtonStatus] = useState<boolean>(
    messages.length >= 10
  );
  const formattedMessages = useMemo(
    (): IFormattedMessage[] =>
      messages
        .sort(
          (a, b): number =>
            new Date(a.datetime).valueOf() - new Date(b.datetime).valueOf()
        )
        .map((message: IMessage) => ({
          ...message,
          user: users.find((user: IUser) => user.id === message.userId),
        }))
        .reduce((rs: IFormattedMessage[], cr: IFormattedMessage) => {
          if (rs.findIndex((i) => i.messageId === cr.messageId) === -1) {
            rs.push(cr);
          }
          return rs;
        }, []),
    [users, messages]
  );

  useEffect((): void => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref]);

  const handleFetchMoreMessagesSuccess = useCallback(
    (data: { fetchMoreMessages: IMessage[] }): void => {
      if (data.fetchMoreMessages.length === 0) {
        setMoreButtonStatus(false);
      } else {
        setMessages([...messages, ...data.fetchMoreMessages]);
      }
    },
    [messages]
  );

  const handleFetchMoreMessagesFailed = useCallback(
    (error: ApolloError): void => {
      // TODO show error cannot get list messages
      window.alert("Cannot fetch more messages");
      console.error(error);
    },
    []
  );

  const [fetchMoreMessages, { loading: fetchingMoreMessages }] = useLazyQuery<{
    fetchMoreMessages: IMessage[];
  }>(apiUtil.FETCH_MORE_MESSAGES, {
    onCompleted: handleFetchMoreMessagesSuccess,
    onError: handleFetchMoreMessagesFailed,
  });

  const handleButtonClick = useCallback((): void => {
    fetchMoreMessages({
      variables: {
        channelId: activeChannel?.id,
        messageId: messages[0].messageId,
        old: true,
      },
    });
  }, [messages, activeChannel]);

  return (
    <div
      ref={ref}
      id="messages-box"
      className={classNames("custom-scrollbar", classes.root)}
    >
      {shownMoreButton ? (
        <button
          className={classes.moreButton}
          onClick={handleButtonClick}
          disabled={fetchingMoreMessages}
        >
          {fetchingMoreMessages ? (
            <span>Loading...</span>
          ) : (
            <span>Click to load old messages</span>
          )}
        </button>
      ) : null}
      {formattedMessages.map(
        (message: IFormattedMessage): React.ReactElement => (
          <Message
            key={message.messageId}
            {...message}
            isSender={message.userId === activeUser?.id}
          />
        )
      )}
    </div>
  );
};

export default memo(Messages);
