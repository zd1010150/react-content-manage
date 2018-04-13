/* eslint-disable no-shadow */
import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import styles from '../../../index.less';

const cx = classNames.bind(styles);

class Tools extends React.Component {
  render() {
    const {
      tools,
      theme,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div className={classNames( tools.length > 0 ? 'pb-sm' : '', cx('tools-preview-wrapper'))}>
        {
                    tools.map(t =>
                      (<Button key={t} size="small" className="ml-sm">
                        {formatMessage({ id: `global.ui.detailTools.${t}` })}
                      </Button>))
                }
      </div>
    );
  }
}
Tools.propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.string.isRequired,
  tools: PropTypes.array.isRequired,
};


export default injectIntl(Tools);
