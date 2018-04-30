import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { Panel } from 'components/ui/index';
import classNames from 'classnames/bind';
import _ from 'lodash';
import styles from './index.less';

const cx = classNames.bind(styles);

class Unauthentication extends React.Component {
  render() {
    const {
      intl, message,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <Panel >
        <div className={cx('error-anthentication')}>
          <h3 className={cx('error-anthentication-msg')}> <Icon type="exclamation-circle-o" /> { _.isEmpty(message) ? formatMessage({ id: 'global.error.NO_AUTHENTICATION' }) : message } </h3>
        </div>
      </Panel>
    );
  }
}
Unauthentication.defaultProps = {
  message: '',
};
Unauthentication.propTypes = {
  intl: intlShape.isRequired,
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};


export default injectIntl(Unauthentication);

