import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { IMessage, IUser } from "../../../../../../models";
import Message from "../Message";

interface IProps extends IMessage {
  user?: IUser;
  isSender: boolean;
}

describe("Testing Main > Conversation > Messages > Message", (): void => {
  let wrapper: any;
  const props: IProps = {
    messageId: "7619097256175680316",
    text: "Text from Sam",
    datetime: "2021-09-29T03:51:06.783Z",
    userId: "Sam",
    isSender: true,
    user: { id: "Sam", name: "Sam", avatar: "" },
  };

  beforeAll((): void => {
    wrapper = mount(<Message {...props} />);
  });

  it("should render match snapshot", (): void => {
    const wrapper = shallow(<Message {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show user avatar", (): void => {
    expect(wrapper.find('[data-test="message-user-avatar"]')).toHaveLength(1);
  });

  it("should show user name", (): void => {
    expect(wrapper.find('[data-test="message-user-name"]')).toHaveLength(1);
  });
});
