import { Col, Input, Row } from 'antd';
import { Section } from 'components/ui/index';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';


const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  loginAccount: PropTypes.string,
  portalPassword: PropTypes.string,
  onChange: PropTypes.func,
};


const fields = ['loginAccount', 'portalPassword'];
const labalCol = {
  sm: 3,
  xs: 24,
};
const valueCol = {
  sm: 6,
  xs: 24,
};
const PortalSettings = ({
  intl,  
  loginAccount,
  portalPassword,
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
      title={formatMessage({ id: `${i18n}.portal` })}
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
              {field === 'loginAccount' && <div>{loginAccount}</div>}
              {field === 'portalPassword' && <Input size="small" type="password" value={portalPassword} onChange={e => _onChange('portalPassword', e.target.value)} />}
            </Col>
          </Row>
        );
      })}
    </Section>
  );
};


PortalSettings.defaultProps = defaultProps;
PortalSettings.propTypes = propTypes;
export default injectIntl(PortalSettings);