import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IChannel, IDraftMessage, IMessage, IUser } from "../models";

export interface IConversation {
  users: IUser[];
  channels: IChannel[];
  messages: IMessage[];
  draftMessage?: IDraftMessage;
  activeUser?: IUser;
  activeChannel?: IChannel;
  activeSidebar: boolean;
  setUsers: (users: IUser[]) => void;
  setChannels: (channels: IChannel[]) => void;
  setMessages: (messages: IMessage[]) => void;
  setActiveUser: (user: IUser) => void;
  setActiveChannel: (channel: IChannel) => void;
  setDraftMessage: (draftMessage: IDraftMessage) => void;
  setActiveSidebar: (active: boolean) => void;
}

export const defaultContextValue: IConversation = {
  users: [],
  channels: [],
  messages: [],
  draftMessage: undefined,
  activeUser: undefined,
  activeChannel: undefined,
  activeSidebar: false,
  setUsers: () => {},
  setChannels: () => {},
  setMessages: () => {},
  setDraftMessage: () => {},
  setActiveUser: () => {},
  setActiveChannel: () => {},
  setActiveSidebar: () => {},
};

export const ConversationContext = createContext<IConversation>(
  defaultContextValue
);

export const useConversationContext = () =>
  useContext<IConversation>(ConversationContext);

interface IProps {
  children: React.ReactNode;
}

const ConversationProvider: React.FC<IProps> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [draftMessage, setDraftMessage] = useState<IDraftMessage | undefined>(
    undefined
  );
  const [activeUser, setActiveUser] = useState<IUser | undefined>(undefined);
  const [activeChannel, setActiveChannel] = useState<IChannel | undefined>(
    undefined
  );
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

  const restoreData = useCallback((): void => {
    const data = localStorage.getItem("conversationContext");
    if (data) {
      const jsonData = JSON.parse(data) as IConversation;
      if (jsonData.users) setUsers(jsonData.users);
      if (jsonData.channels) setChannels(jsonData.channels);
      if (jsonData.draftMessage) setDraftMessage(jsonData.draftMessage);
      if (jsonData.activeUser) setActiveUser(jsonData.activeUser);
      if (jsonData.activeChannel) setActiveChannel(jsonData.activeChannel);
    }
  }, []);

  const persistData = useCallback((): void => {
    localStorage.setItem(
      "conversationContext",
      JSON.stringify({
        users,
        channels,
        draftMessage,
        activeUser,
        activeChannel,
      })
    );
  }, [users, channels, draftMessage, messages, activeUser, activeChannel]);

  useEffect(() => {
    restoreData();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", persistData);

    return () => {
      window.removeEventListener("beforeunload", persistData);
    };
  }, [persistData]);

  return (
    <ConversationContext.Provider
      value={{
        users,
        channels,
        messages,
        draftMessage,
        activeUser,
        activeChannel,
        activeSidebar,
        setUsers,
        setChannels,
        setMessages,
        setDraftMessage,
        setActiveUser,
        setActiveChannel,
        setActiveSidebar,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
