import React, { Component, Fragment } from 'react';

import ComponanyInfoPanel from '../component/companyInfoPanel';
import CompaneyUserStatic from '../component/companyUserStatic';
import Logo from '../component/logo';


class companyInfo extends Component {
  render() {
    return (
      <Fragment>
        <ComponanyInfoPanel />
        {/*<CompaneyUserStatic />*/}
        {/*<Logo />*/}
      </Fragment>
    );
  }
}

export default companyInfo;
