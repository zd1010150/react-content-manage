/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Field from './field';


class Section extends React.Component {
  buildTable(fields) {
    const allUngroupFields = [];
    let rows = 0;
    const trs = [];
    let tds = [];
    _.forEach(fields, (value, key) => {
      rows = fields[key].length > rows ? fields[key].length : rows;
      allUngroupFields.push(...fields[key]);
    });
    const rowedFields = _.groupBy(allUngroupFields, 'x');
    for (let i = 0; i < rows; i++) {
      tds = rowedFields[i].map(f => (<td key={f.id}><Field id={f.id} label={f.label} isLayoutRequired={f.is_layout_required} /></td>));
      trs.push(<tr key={i}>{tds}</tr>);
    }
    return <table><tbody>{trs}</tbody></table>;
  }
  render() {
    const {
      code, sequence, label, fields,
    } = this.props;
    const table = this.buildTable(fields);
    return (
      <Card title={label} style={{ width: '100%' }}>
        { table }
      </Card>
    );
  }
}

Section.defaultProps = {
  label: 'Default',
  fields: {},
};
Section.propTypes = {
  code: PropTypes.string.isRequired,
  sequence: PropTypes.number.isRequired,
  label: PropTypes.string,
  fields: PropTypes.object,
};


export default Section;
