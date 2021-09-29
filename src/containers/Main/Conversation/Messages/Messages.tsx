import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";

import { apiUtil } from "../../../../utils";
import { IMessage, IUser } from "../../../../models";
import { useConversationContext } from "../../../../providers/ConversationProvider";

import Message from "./Message";
import useStyles from "./messages.styles";

interface IFormattedMessage extends IMessage {
  user?: IUser;
}

const Messages: React.FC<{}> = () => {
  const classes = useStyles();
  const {
    users,
    messages,
    activeUser,
    activeChannel,
    setMessages,
  } = useConversationContext();
  const [fetchMoreMessages, { called, loading, error, data }] = useLazyQuery<
    IMessage[]
  >(apiUtil.FETCH_MORE_MESSAGES);
  const formattedMessages = useMemo(
    (): IFormattedMessage[] =>
      messages.map((message: IMessage) => ({
        ...message,
        user: users.find((user: IUser) => user.id === message.userId),
      })),
    [messages]
  );

  useEffect((): void => {
    if (called && !loading) {
      if (!error && data) {
        setMessages([...data, ...messages]);
      } else {
        // TODO show error cannot get list messages
        window.alert("Cannot fetch messages");
        console.error(error);
      }
    }
  }, [messages, called, loading, error, data]);

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
    <div className={classes.root}>
      <button
        className={classes.moreButton}
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>Click to load old messages</span>
        )}
      </button>
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
