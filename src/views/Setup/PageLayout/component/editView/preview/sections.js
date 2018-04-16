/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';

import styles from '../../../index.less';

const cx = classNames.bind(styles);

class Sections extends React.Component {
  buildTable(section, theme) {
    const {
      rows,
      cols,
      fields,
    } = section;
    const trs = [];
    const table = [];
    let tds = [];
    const _rows = rows <= 0 ? 1 : rows + 1;
    for (let i = 0; i < _rows; i++) {
      tds = [];
      for (let j = 0; j < cols; j++) {
        tds.push(<td className={cx(`section-table-col-${cols}`)} key={j}/>);
      }
      table.push(tds);
    }
    _.forEach(fields, (value, key) => {
      const columnIndex = Number(key);
      const rowLenght = value.length;
      for (let i = 0; i < rowLenght; i++) {
        const f = value[i];
        table[i][columnIndex] = (
          <td className={cx(`section-table-col-${cols}`)} key={f.id}>
            <div className={classNames(cx('field'))} id={f.id} >
              <span className={classNames(cx('field-label'))}>
                { f.isSystem ? <Icon type="star-o" className={`${theme}-theme-icon pr-sm`} /> : ''}
                { f.pageReadonly ? <Icon type="lock" className="read-only pr-sm" /> : '' }
                {f.pageRequired ? <span className="error-msg pr-sm">*</span> : '' }
                { f.label} :
              </span>
              <span className={classNames(cx('field-sample-value'), 'pl-sm')}>Sample {f.label}</span>
            </div>
          </td>
        );
      }
    });
    for (let i = 0; i < _rows; i++) {
      trs.push(<tr key={i} className={i === _rows - 1 ? cx('section-table-last-tr') : ''}>{ table[i] }</tr>);
    }
    return <table className={cx(`section-table-cols-${cols}`)}><tbody>{trs}</tbody></table>;
  }

  render() {
    const {
      sections,
      theme,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <Panel panelClasses={classNames(`${theme}-theme-panel`)} panelTitle="Lead detail" >
        { sections.map(section =>
          (<div className="panel-section pb-none" key={section.code}>
            <div className="section-header">
              <span className={cx('section-header-title')}>{section.label}</span>
            </div>
            <div className="section-content">
              { this.buildTable(section, theme) }
            </div>
          </div>))
            }
      </Panel>
    );
  }
}
Sections.propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
};


export default injectIntl(Sections);
