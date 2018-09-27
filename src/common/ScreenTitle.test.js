import React from 'react';
import ScreenTitle from './ScreenTitle';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<ScreenTitle title="My screen" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without background text', () => {
    const tree = renderer.create(<ScreenTitle title="My screen" noBackgroundText />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  