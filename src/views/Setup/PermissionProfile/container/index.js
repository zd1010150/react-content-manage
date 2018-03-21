

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Panel, EditBox } from 'components/ui/index';
import Logo from '../component/logo';
import { getCompanyInfo, updateCompanyInfo } from '../flow/action';
import { setLogo } from 'store/global/action';

class companyInfo extends Component {
    componentDidMount() {
        this.props.getCompanyInfo();
    }
    render() {
        const {
            userInfo, companyLogo, setLogo, history
        } = this.props;

        return (
            <Fragment>
                <ComponanyInfoPanel {...this.props} />
                <CompaneyUserStatic userInfo={userInfo} history={history} />
                <Logo companyLogo={companyLogo} setLogo={setLogo} />
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
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(companyInfo));
