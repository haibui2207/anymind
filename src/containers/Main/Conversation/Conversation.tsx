import React, { memo, useCallback, useEffect } from "react";
import { useLazyQuery, useMutation, ApolloError } from "@apollo/client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { apiUtil } from "../../../utils";
import { useConversationContext } from "../../../providers/ConversationProvider";

import Empty from "./Empty";
import Messages from "./Messages";
import useStyles from "./conversation.styles";
import { IMessage } from "../../../models";

const Conversation: React.FC<{}> = () => {
  const classes = useStyles();
  const {
    messages,
    draftMessage,
    activeUser,
    activeChannel,
    setMessages,
    setDraftMessage,
  } = useConversationContext();

  const handlePostMessageSuccess = useCallback(
    (data: { postMessage: IMessage }): void => {
      const newMessages = [...messages];
      newMessages.push(data.postMessage);
      setDraftMessage(undefined);
      setMessages(newMessages);
      const messagesBox = document.getElementById("messages-box");
      if (messagesBox) {
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }
    },
    [messages]
  );

  const handlePostMessageFailed = useCallback((error: ApolloError): void => {
    // TODO show error cannot get list messages
    window.alert("Cannot send message");
    console.error(error);
  }, []);

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

  const [postMessage, { loading: sendingMessage }] = useMutation<{
    postMessage: IMessage;
  }>(apiUtil.POST_MESSAGE, {
    onCompleted: handlePostMessageSuccess,
    onError: handlePostMessageFailed,
  });

  const [fetchLatestMessages] = useLazyQuery<{
    fetchLatestMessages: IMessage[];
  }>(apiUtil.FETCH_LATEST_MESSAGES, {
    onCompleted: handleFetchLatestMessagesSuccess,
    onError: handleFetchLatestMessagesFailed,
  });

  useEffect((): void => {
    fetchLatestMessages({ variables: { channelId: activeChannel?.id } });
  }, [activeChannel]);

  // TODO using debounce if necessary
  const handleEditorChange = useCallback(
    (text: string): void => {
      setDraftMessage({
        channelId: activeChannel?.id || "",
        userId: activeUser?.id || "",
        text,
      });
    },
    [activeUser, activeChannel]
  );

  const handleSubmit = useCallback((): void => {
    if (!sendingMessage && activeUser && activeChannel && draftMessage) {
      postMessage({
        variables: {
          channelId: activeChannel.id,
          userId: activeUser.id,
          text: draftMessage.text,
        },
      });
    }
  }, [sendingMessage, activeUser, activeChannel, draftMessage]);

  return (
    <div className={classes.root}>
      <h2 className={classes.header} data-test="conversation-channel-name">
        {activeChannel?.name}
      </h2>
      <div className={classes.content}>
        {messages.length > 0 ? <Messages /> : <Empty />}
      </div>
      <div className={classes.chatBox}>
        <CKEditor
          editor={ClassicEditor}
          data={draftMessage?.text || ""}
          onChange={(event, editor) => {
            const data = editor.getData();
            handleEditorChange(data);
          }}
          config={{
            placeholder: "Type your message here...",
          }}
        />
        <button
          className={classes.sendButton}
          title="Send message"
          disabled={sendingMessage || !draftMessage?.text}
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
