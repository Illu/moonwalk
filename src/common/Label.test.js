import React from 'react';
import Label from './Label';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Label />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with text correctly', () => {
    const tree = renderer.create(<Label text="Label text" />).toJSON();
    expect(tree).toMatchSnapshot();
});