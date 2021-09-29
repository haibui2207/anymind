import React, { memo, useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import classNames from 'classnames';

import { apiUtil } from "../../../utils";
import { useConversationContext } from "../../../providers/ConversationProvider";

import Empty from "./Empty";
import Messages from "./Messages";
import useStyles from "./conversation.styles";

const Conversation: React.FC<{}> = () => {
  const classes = useStyles();
  const {
    messages,
    draftMessage,
    activeUser,
    activeChannel,
    setDraftMessage,
  } = useConversationContext();

  const [postMessage, { called, loading, error }] = useMutation(
    apiUtil.POST_MESSAGE
  );

  useEffect((): void => {
    // TODO handle error if exist
    // TODO reset draft message after sending
  }, [called, loading, error]);

  // TODO using debounce if necessary
  const handleInputChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setDraftMessage({
        channelId: activeChannel?.id || "",
        userId: activeUser?.id || "",
        text: value,
      });
    },
    [activeUser, activeChannel]
  );

  const handleSubmit = useCallback((): void => {
    if (!loading && draftMessage) {
      postMessage({
        variables: {
          channelId: activeChannel?.id || "",
          userId: activeUser?.id || "",
          text: draftMessage,
        },
      });
    }
  }, [loading, activeUser, activeChannel, draftMessage]);

  return (
    <div className={classes.root}>
      <h2 className={classes.header} data-test="conversation-channel-name">
        {activeChannel?.name}
      </h2>
      <div className={classNames('custom-scrollbar', classes.content)}>
        {messages.length > 0 ? <Messages /> : <Empty />}
      </div>
      <div className={classes.chatBox}>
        <textarea
          placeholder="Type your message here..."
          className={classes.editor}
          onChange={handleInputChange}
          value={draftMessage?.text || ''}
          data-test="conversation-chat-box"
        />
        <button
          className={classes.sendButton}
          title="Send message"
          disabled={loading || !draftMessage?.text}
          onClick={handleSubmit}
          data-test="conversation-submit-button"
        >
          <i className="icon-plane" />
        </button>
      </div>
    </div>
  );
};

export default memo(Conversation);
