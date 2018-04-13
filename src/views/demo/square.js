import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);
class Square extends React.Component {
  render() {
    const { black } = this.props;
    const style = {
      backgroundColor: black ? 'black' : 'white',
      color: black ? 'white' : 'color',
    };
    return (
      <div style={style} className={cx('square')} >
        { this.props.children }
      </div>
    );
  }
}
Square.propTypes = {
  black: PropTypes.bool,
};
export default Square;
