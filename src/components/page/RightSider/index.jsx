import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { toggleRightSider } from './flow/action';
import styles from './index.less';


const cx = classNames.bind(styles);

let ticking = false;


/* if you want to using this component and recustomize the width ,Please using add  this.props.settingRightSider({ width: 300 }); in your componentDidMount method */
class RightSider extends React.Component {
  state={
    marginTop: 0,
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    this.props.toggleRightSider(true);
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        this.setState({
          marginTop: `-${window.scrollY}px`,
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  render() {
    const {
      collapsed, width,
    } = this.props;
    return (
      <div style={{ width: collapsed ? 0 : width, marginTop: this.state.marginTop }} className={classNames(cx('right-sider'), collapsed ? cx('right-sider-collapsed') : cx('right-sider-open'))} >
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => {
  const { rightSider } = ui;
  const {
    collapsed, width,
  } = rightSider;
  return {
    collapsed,
    width,
  };
};
const mapDispatchToProps = {
  toggleRightSider,
};
export default connect(mapStateToProps, mapDispatchToProps)(RightSider);

