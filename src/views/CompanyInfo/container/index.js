import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ComponanyInfoPanel from '../component/companyInfoPanel';
import CompaneyUserStatic from '../component/companyUserStatic';
import Logo from '../component/logo';
import { getCompanyInfo, updateCompanyInfo } from '../flow/action';
import { setLogo } from 'store/global/action';

class companyInfo extends Component {
  componentDidMount() {
    this.props.getCompanyInfo();
  }
  render() {
    const {
      userInfo, companyLogo, setLogo,
    } = this.props;

    return (
      <Fragment>
        <ComponanyInfoPanel {...this.props} />
        <CompaneyUserStatic userInfo={userInfo} />
        <Logo companyLogo={companyLogo} setLogo={setLogo} />
      </Fragment>
    );
  }
}
companyInfo.propTypes = {
  getCompanyInfo: PropTypes.func.isRequired,
};
const mapStateToProps = ({ global, setupCompanyInfo }) => {
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
    ...setupCompanyInfo.companyinfo,
  };
};
const mapDispatchToProps = {
  getCompanyInfo,
  updateCompanyInfo,
  setLogo,
};
export default connect(mapStateToProps, mapDispatchToProps)(companyInfo);
