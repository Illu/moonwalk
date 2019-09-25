import React from 'react';

import { NextLaunchCard } from '../';
import { renderWithTheme } from '../../helpers/testHelpers';

const props = {
  lspName: 'lspName',
  lspAbbrev: 'lspAbbrev',
  wsstamp: '123456'
}

describe("NextLaunchCard", () => {
  it("renders correctly with an image", () => {
    const tree = renderWithTheme(<NextLaunchCard {...props} imgUrl="https://example.com/img.jpg" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without an image", () => {
    const tree = renderWithTheme(<NextLaunchCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
