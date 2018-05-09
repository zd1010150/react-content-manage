import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      intl, message, accountPermissions,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <Fragment>
        {
            _.isEmpty(accountPermissions) ? '' : <Panel >
              <div className={cx('error-anthentication')}>
                <h3 className={cx('error-anthentication-msg')}> <Icon type="exclamation-circle-o" /> { _.isEmpty(message) ? formatMessage({ id: 'global.error.NO_AUTHENTICATION' }) : message } </h3>
              </div>
            </Panel>
        }
      </Fragment>
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
const mapStateToProps = ({ global }) => ({
  accountPermissions: global.permissions,
});

export default connect(mapStateToProps)(injectIntl(Unauthentication));

