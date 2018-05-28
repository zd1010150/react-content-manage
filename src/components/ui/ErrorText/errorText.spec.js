import React from 'react';
import ErrorText from './index';
import renderer from 'react-test-renderer';
import { IntlWrapper } from 'components/tests/index';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <IntlWrapper locale={'zh'}>
        <ErrorText />
      </IntlWrapper>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
