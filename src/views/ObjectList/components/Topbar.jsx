import { Button, Col, Row } from 'antd';
import { StyledSelect } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { tryFetchViewsByType } from '../flow/actions';
const { ObjectTypes, ObjectTypesInArray } = Enums;
const { Leads } = ObjectTypes;


const defaultProps = {
  objectType: Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.oneOf(ObjectTypesInArray).isRequired,
};


class Topbar extends Component {
  componentDidMount() {
    const { objectType, tryFetchViewsByType } = this.props;
    tryFetchViewsByType(objectType);
  }

  render() {
    const { intl, objectType, viewId, views } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui';

    return (
      <Row className="mt-sm mb-sm">
        <Col sm={12}>
          <StyledSelect
            labelText={formatMessage({ id: `${i18n}.labels.viewName` })}
            options={views}
            valueField={'view_name'}
          />
        </Col>
        <Col sm={12} style={{ textAlign: 'right' }}>
          <Link to={`/${objectType}/views/${viewId}`}>
            <Button className="mr-sm" size="small" disabled={false} >
              {formatMessage({ id: `${i18n}.button.edit` })}
            </Button>
          </Link>
          <Link to={`/${objectType}/views/${Enums.PhantomId}`}>
            <Button size="small">
              {formatMessage({ id: `${i18n}.button.createNew` })}
            </Button>
          </Link>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = ({ global, objectList }) => ({
  language: global.language,
  views: objectList.views,
});
const mapDispatchToProps = {
  tryFetchViewsByType,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Topbar));