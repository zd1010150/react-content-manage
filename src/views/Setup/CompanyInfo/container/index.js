import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import { setLogo, setTimeZone } from 'store/global/action';
import { settingPageloading } from 'components/page/PageLoading/flow/action';
import ComponanyInfoPanel from '../component/companyInfoPanel';
import CompaneyUserStatic from '../component/companyUserStatic';
import Logo from '../component/logo';
import { getCompanyInfo, updateCompanyInfo } from '../flow/action';



class companyInfo extends Component {
  componentDidMount() {
    this.props.getCompanyInfo();
  }
  render() {
    const {
      userInfo,
      companyLogo,
      setLogo,
      history,
      settingPageloading,
    } = this.props;

    return (
      <Fragment>
        <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION} errorComponent={<Unauthentication />}>
          <ComponanyInfoPanel {...this.props} />
          <CompaneyUserStatic userInfo={userInfo} history={history} />
          <Logo companyLogo={companyLogo} setLogo={setLogo} settingPageloading={settingPageloading} />
        </Permission>
      </Fragment>
    );
  }
}
companyInfo.propTypes = {
  getCompanyInfo: PropTypes.func.isRequired,
};
const mapStateToProps = ({ global, setup }) => {
  const {
    timeZones, languages, countries, moments, years,
  } = global.settings;
  return {
    companyLogo: global.companyLogo,
    timeZones,
    languages,
    countries,
    moments,
    years,
    ...setup.companyInfo.companyinfo,
  };
};
const mapDispatchToProps = {
  getCompanyInfo,
  updateCompanyInfo,
  setLogo,
  setTimeZone,
  settingPageloading,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(companyInfo));
