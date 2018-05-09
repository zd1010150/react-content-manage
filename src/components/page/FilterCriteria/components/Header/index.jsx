import { Col, Icon, Row, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import styles from './index.less';

const cx = classNames.bind(styles);

const colLayout = {
  xs: 24,
  sm: 7,
  push: 1,
};
const criteriaColumns = ['field', 'condition', 'value'];

const propTypes = {
  intl: intlShape.isRequired,
};

const Header = ({ intl }) => {
  const i18nPrefix = 'page.filterCriteria';
  const { formatMessage } = intl;
  return (
    <Row gutter={16}>
      {criteriaColumns.map((col, i) => (
        <Col
          key={i}
          className={col === 'value' ? '' : 'required'}
          {...colLayout}
        >
          {formatMessage({ id: `${i18nPrefix}.columns.${col}` })}
          {col === 'value' && (
            <Tooltip placement="right" title={formatMessage({ id: `${i18nPrefix}.columns.tip` })}>
              <Icon className={cx('columnTip')} type="info-circle-o" />
            </Tooltip>
          )}
        </Col>
      ))}
    </Row>
  );
};

Header.propTypes = propTypes;
export default injectIntl(Header);
