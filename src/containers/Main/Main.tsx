import React, { memo, useCallback, useEffect } from "react";
// import { useQuery, useMutation } from "@apollo/client";

// import { apiUtil } from "../../utils";
import { IChannel, IUser } from "../../models";
import { useConversationContext } from "../../providers/ConversationProvider";
import avatar01 from "../../assets/images/user-01.svg";
import avatar02 from "../../assets/images/user-02.svg";
import avatar03 from "../../assets/images/user-03.svg";

import useStyles from "./main.styles";
import Sidebar from "./Sidebar";

const Main: React.FC<{}> = () => {
  const classes = useStyles();
  const {
    users,
    channels,
    activeUser,
    activeChannel,
    setUsers,
    setChannels,
    setActiveUser,
    setActiveChannel,
  } = useConversationContext();
  console.log(users, channels, activeUser, activeChannel);

  // const { loading, error, data } = useQuery<Message>(
  //   apiUtil.FETCH_LATEST_MESSAGES,
  //   {
  //     variables: { channelId: "1" },
  //   }
  // );
  // const [postMessage, { data, loading, error }] = useMutation(
  //   apiUtil.POST_MESSAGE,
  // );
  // postMessage({
  //   variables: { channelId: '1', userId: 'Sam', text: 'Test new message' },
  // });

  // console.log({ loading, error, data });

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
    if (!users.length) setUsers(mockUsers);
    if (!channels.length) setChannels(mockChannels);
    if (!activeUser) setActiveUser(mockUsers[0]);
    if (!activeChannel) setActiveChannel(mockChannels[0]);
  }, [users, channels, activeUser, activeChannel]);

  useEffect(() => {
    initConversationValue();
  }, [initConversationValue]);

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>Anymind Group</h2>
      <div className={classes.content}>
        <Sidebar />
        <div className={classes.conversation}>
          {activeChannel ? (
            <h2 className={classes.conversationHeader}>{activeChannel.name}</h2>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(Main);
