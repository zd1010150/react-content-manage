import { Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const { OptGroup, Option } = Select;


const defaultProps = {
  accountGroupLabel: 'Accounts',
  opportunityGroupLabel: 'Opportunities',
  onChange: null,
};
const propTypes = {
  accountGroupLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  opportunityGroupLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  opportunities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func,
};

const RelatedToSelection = ({
  accountGroupLabel,
  opportunityGroupLabel,
  accounts,
  opportunities,
  onChange,
}) => (
  <Select
    className="full-width"
    size="small"
    onChange={onChange}
  >
    <OptGroup label={accountGroupLabel}>
      {accounts.map(a => <Option key={a.id} value={a.id}>{a.name}</Option>)}
    </OptGroup>
    <OptGroup label={opportunityGroupLabel}>
      {opportunities.map(o => <Option key={o.id} value={o.id}>{o.name}</Option>)}
    </OptGroup>
  </Select>
);

RelatedToSelection.defaultProps = defaultProps;
RelatedToSelection.propTypes = propTypes;
export default RelatedToSelection;
