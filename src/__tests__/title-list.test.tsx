import React from "react";
import { TitleList } from "../title-list";
import renderer from "react-test-renderer";
import Title from "../title";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const titles: Title[] = [{ title: "Title2", _id: "1" }];
  const tree = renderer
    .create(<TitleList titles={titles} onClick={jest.fn()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("onClick is called when title is clicked", () => {
  const titles: Title[] = [{ title: "Title2", _id: "1" }];
  const onClick = () => {};
  const mockOnClick = jest.fn(onClick);
  const titleList = shallow(
    <TitleList titles={titles} onClick={mockOnClick} />
  );

  titleList.find("a").simulate("click");

  expect(mockOnClick.mock.calls.length).toBe(1);
});
