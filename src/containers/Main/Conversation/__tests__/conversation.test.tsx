import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  IConversation,
  ConversationContext,
  defaultContextValue,
} from "../../../../providers/ConversationProvider";
import { apiUtil } from "../../../../utils";
import Empty from "../Empty";
import Messages from "../Messages";
import Conversation from "../Conversation";

const waitForComponentUpdate = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 20));
    wrapper.update();
  });
};

describe("Testing Main > Conversation", (): void => {
  let wrapper: any;
  const mockContextValue: IConversation = {
    ...defaultContextValue,
    users: [{ id: "1", name: "User 1", avatar: "" }],
    channels: [{ id: "1", name: "Channel 1" }],
    activeUser: { id: "1", name: "User 1", avatar: "" },
    activeChannel: { id: "1", name: "Channel 1" },
    messages: [],
    setMessages: jest.fn(),
  };
  const mocks = [
    {
      request: {
        query: apiUtil.FETCH_LATEST_MESSAGES,
        variables: { channelId: "1" },
      },
      result: {
        data: {
          fetchLatestMessages: [
            {
              messageId: "1687680749017235835",
              text: "<p>done</p>",
              datetime: "2021-09-30T02:30:00Z",
              userId: "Joyse",
              __typename: "Message",
            },
          ],
        },
      },
    },
    {
      request: {
        query: apiUtil.FETCH_MORE_MESSAGES,
        variables: {
          channelId: "1",
          messageId: "5728579392774769867",
          old: false,
        },
      },
      result: {
        data: {
          fetchMoreMessages: [
            {
              messageId: "1687680749017235835",
              text: "<p>done</p>",
              datetime: "2021-09-30T02:30:00Z",
              userId: "Joyse",
              __typename: "Message",
            },
          ],
        },
      },
    },
    {
      request: {
        query: apiUtil.POST_MESSAGE,
        variables: {
          channelId: "1",
          userId: "Russell",
          text: "Text from Russell",
        },
      },
      result: {
        data: {
          postMessage: [
            {
              messageId: "1687680749017235835",
              text: "Text from Russell",
              datetime: "2021-09-30T02:30:00Z",
              userId: "Russell",
              __typename: "Message",
            },
          ],
        },
      },
    },
  ];

  beforeAll(
    async (): Promise<void> => {
      wrapper = mount(
        <ConversationContext.Provider value={mockContextValue}>
          <MockedProvider mocks={mocks}>
            <Conversation />
          </MockedProvider>
        </ConversationContext.Provider>
      );
      await waitForComponentUpdate(wrapper);
    }
  );

  it("should render match snapshot", (): void => {
    const wrapper = shallow(
      <ConversationContext.Provider value={mockContextValue}>
        <MockedProvider mocks={mocks}>
          <Conversation />
        </MockedProvider>
      </ConversationContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show current active channel name", (): void => {
    expect(
      wrapper.find('[data-test="conversation-channel-name"]')
    ).toHaveLength(1);
  });

  it("should show Empty component when messages empty", async (): Promise<void> => {
    const wrapper = mount(
      <ConversationContext.Provider
        value={{ ...mockContextValue, messages: [] }}
      >
        <MockedProvider mocks={mocks}>
          <Conversation />
        </MockedProvider>
      </ConversationContext.Provider>
    );
    await waitForComponentUpdate(wrapper);
    expect(wrapper.find(Empty)).toHaveLength(1);
    expect(wrapper.find(Messages)).toHaveLength(0);
  });

  it("should show Conversation component when messages exists", async (): Promise<void> => {
    const wrapper = mount(
      <ConversationContext.Provider
        value={{
          ...mockContextValue,
          messages: [
            {
              messageId: "1",
              text: "The first message",
              datetime: "2021-09-29T01:39:08.665Z",
              userId: "Sam",
            },
          ],
        }}
      >
        <MockedProvider mocks={mocks}>
          <Conversation />
        </MockedProvider>
      </ConversationContext.Provider>
    );
    await waitForComponentUpdate(wrapper);
    expect(wrapper.find(Empty)).toHaveLength(0);
    expect(wrapper.find(Messages)).toHaveLength(1);
  });

  it("should have a n Editor", (): void => {
    expect(wrapper.find(CKEditor)).toHaveLength(1);
  });

  it("should have a submit button", (): void => {
    expect(
      wrapper.find('[data-test="conversation-submit-button"]')
    ).toHaveLength(1);
  });
});
