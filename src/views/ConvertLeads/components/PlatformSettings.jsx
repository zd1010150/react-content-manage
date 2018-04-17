import { Col, Input, Row, Select } from 'antd';
import { Section } from 'components/ui/index';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
const { Option } = Select;


const defaultProps = {
  types: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  accountNum: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
  types: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};


const fields = ['type', 'accountNum', 'password'];
const labalCol = {
  sm: 3,
  xs: 24,
};
const valueCol = {
  sm: 6,
  xs: 24,
};
const PlatformSettings = ({
  intl,  
  accountNum,
  password,
  type,
  types,
  onChange,
}) => {

  const { formatMessage } = intl;
  const i18n = 'page.convertLeads';

  const _onChange = (field, value) => {
    if (_.isFunction(onChange)) {
      onChange(field, value);
    }
  };

  return (
    <Section
      style={{background: '#fff'}}
      title={formatMessage({ id: `${i18n}.platform` })}
    >
      {fields.map(field => {
        return (
          <Row
            key={field}
            className="mb-md"
            type="flex"
            justify="center"
            align="middle"
          >
            <Col {...labalCol}>{formatMessage({ id: `${i18n}.${field}` })}</Col>
            <Col {...valueCol}>
              {field === 'type' && (
                <Select
                  size="small"
                  style={{ width: '100%' }}
                  value={type}
                  onChange={value => _onChange('type', value)}
                >
                  {types.map(option => <Option>{'123'}</Option>)}
                </Select>
              )}
              {field === 'accountNum' && <Input size="small" value={accountNum} onChange={e => _onChange('accountNum', e.target.value)} />}
              {field === 'password' && <Input size="small" value={password} onChange={e => _onChange('password', e.target.value)} type="password" />}
            </Col>
          </Row>
        );
      })}
    </Section>
  );
};


PlatformSettings.defaultProps = defaultProps;
PlatformSettings.propTypes = propTypes;
export default injectIntl(PlatformSettings);