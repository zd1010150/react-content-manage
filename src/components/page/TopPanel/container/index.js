import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { toggleLanguage, fetchGlobalSetting } from 'store/global/action';
import Language from '../component/language';
import TopStaticNav from '../component/topStaticNav';
import Welcome from '../component/welcomeMsg';
import styles from '../TopPanel.less';

const cx = classNames.bind(styles);

class topPanel extends React.Component {
  changeLanguage(language) {
    const { toggleLanguage, fetchGlobalSetting } = this.props;
    toggleLanguage(language);
    fetchGlobalSetting();
  }
  render() {
    const { language, account } = this.props;
    return (
      <div className={cx('panel', 'header')}>
        <Language language={language} onChange={(language) => this.changeLanguage(language) } />
        <TopStaticNav />
        <Welcome account={account} />
      </div>
    );
  }
}

topPanel.propTypes = {
  language: PropTypes.string.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
  fetchGlobalSetting: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
  account: global.account,
});
const mapDispatchToProp = {
  toggleLanguage,
  fetchGlobalSetting,
};

const TopPanel = connect(mapStateToProps, mapDispatchToProp)(topPanel);
export default TopPanel;

