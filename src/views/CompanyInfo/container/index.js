import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    } = this.props;

    return (
      <Fragment>
        <ComponanyInfoPanel {...this.props} />
        <CompaneyUserStatic userInfo={userInfo} />
        <Logo />
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
};
export default connect(mapStateToProps, mapDispatchToProps)(companyInfo);
