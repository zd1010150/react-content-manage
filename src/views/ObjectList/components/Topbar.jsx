import { Button, Col, Icon, Row } from 'antd';
import { Permission } from 'components/page/index';
import { StyledSelect } from 'components/ui/index';
import PERMISSIONS from 'config/app-permission.config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { setActiveView, tryFetchDataByView, tryFetchViewsByType } from '../flow/actions';

const { DefaultPageConfigs, PhantomId, ObjectTypes, ObjectTypesInArray } = Enums;
const { Leads } = ObjectTypes;
const { PageSize } = DefaultPageConfigs;


const defaultProps = {
  activeViewId: PhantomId,
  objectType: Leads,  
  views: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  activeViewId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  objectType: PropTypes.oneOf(ObjectTypesInArray).isRequired,
  setActiveView: PropTypes.func,
  tryFetchViewsByType: PropTypes.func,
  views: PropTypes.array.isRequired,
};


class Topbar extends Component {
  componentDidMount() {
    const { objectType, tryFetchViewsByType } = this.props;
    tryFetchViewsByType(objectType);
  }

  handleViewChange = (value) => {
    const {
      objectType,
      setActiveView,
      tryFetchDataByView,
    } = this.props;
    setActiveView(value);
    // change view will reset table params
    tryFetchDataByView(objectType, value, { per_page: PageSize });
  }

  render() {
    const {
      intl,
      activeViewId,
      objectType,
      views,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui';

    return (
      <Row className="mt-sm mb-sm">
        <Col sm={12}>
          <StyledSelect
            displayField={'view_name'}
            labelText={formatMessage({ id: `${i18n}.select.label` })}
            options={views}
            onChange={this.handleViewChange}
            value={activeViewId}
          />
        </Col>
        <Col sm={12} style={{ textAlign: 'right' }}>
          <Permission permission={PERMISSIONS[`${objectType.toUpperCase()}_EDITVIEWLIST`]}>
            <Link to={`/${objectType}/views/${activeViewId}`}>
              <Button className="mr-sm" size="small" disabled={activeViewId === PhantomId} >
                <Icon className="font-sm" type="edit" size="small" />
                {formatMessage({ id: `${i18n}.button.edit` })}
                {formatMessage({ id: 'global.properNouns.view' })}
              </Button>
            </Link>
          </Permission>
          <Permission permission={PERMISSIONS[`${objectType.toUpperCase()}_CREATEVIEWLIST`]}>
            <Link to={`/${objectType}/views/${Enums.PhantomId}`}>
              <Button size="small">
                <Icon className="font-sm" type="plus" size="small" />
                {formatMessage({ id: `${i18n}.button.new` })}
                {formatMessage({ id: 'global.properNouns.view' })}
              </Button>
            </Link>
          </Permission>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = ({ global, objectList }) => ({
  language: global.language,
  activeViewId: objectList.activeViewId,
  views: objectList.views,
});
const mapDispatchToProps = {
  setActiveView,
  tryFetchDataByView,
  tryFetchViewsByType,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Topbar));