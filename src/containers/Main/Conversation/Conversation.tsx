import React, { memo, useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation, ApolloError } from "@apollo/client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { apiUtil } from "../../../utils";
import { IMessage } from "../../../models";
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
    setMessages,
    setDraftMessage,
  } = useConversationContext();
  const [shownErrorPopup, setErrorPopupStatus] = useState<boolean>(false);

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

  const handlePostMessageFailed = useCallback((): void => {
    setErrorPopupStatus(true);
    setTimeout((): void => {
      setErrorPopupStatus(false);
    }, 3000);
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

  const [fetchLatestMessages, { called, refetch }] = useLazyQuery<{
    fetchLatestMessages: IMessage[];
  }>(apiUtil.FETCH_LATEST_MESSAGES, {
    onCompleted: handleFetchLatestMessagesSuccess,
    onError: handleFetchLatestMessagesFailed,
    notifyOnNetworkStatusChange: true,
  });

  useEffect((): void => {
    if (activeChannel) {
      if (called && refetch) {
        refetch({ channelId: activeChannel.id });
      } else {
        fetchLatestMessages({ variables: { channelId: activeChannel.id } });
      }
    }
  }, [called, activeChannel]);

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
        {shownErrorPopup ? (
          <div className={classes.errorPopup}>Cannot send the message</div>
        ) : null}
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
