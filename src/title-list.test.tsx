import React from 'react';
import { TitleList } from './title-list';
import renderer from 'react-test-renderer';
import Title from './title';



it('renders correctly', () => {
  const titles: Title[] = [{title: 'Title2', _id: '1'}];
  const tree = renderer
    .create(<TitleList titles={titles} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});