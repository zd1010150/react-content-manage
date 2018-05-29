/* eslint-disable function-paren-newline */
import { IntlWrapper } from 'components/tests/index';
import React, { Fragment } from 'react';
import renderer from 'react-test-renderer';
import ErrorText from './index';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Fragment>
        <IntlWrapper locale="zh">
          <ErrorText />
        </IntlWrapper>
        <IntlWrapper locale="en">
          <ErrorText />
        </IntlWrapper>
      </Fragment>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
