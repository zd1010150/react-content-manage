import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { DropTarget } from 'react-dnd';
import styles from './index.less';
import { ItemTypes } from './itemType';
import { changePosition, checkCanmove } from './game';

const squareTarget = {
  canDrop(props) {
    const { row, column } = props;
    return checkCanmove(row, column);
  },
  drop(props) {
    const { row, column } = props;
    changePosition([row, column]);
  },
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});
const cx = classNames.bind(styles);
class BoardSquare extends React.Component {
  renderOverLay() {
    const { isOver, canDrop } = this.props;
    const maskClasses = classNames(
      cx('square-over-mask'),
      (!isOver) && canDrop ? cx('square-unover-mask') : '',
      isOver && canDrop ? cx('square-over-mask-overing-ok') : '',
      isOver && (!canDrop) ? cx('square-over-mask-overing-error') : '',
    );
    console.log(isOver, canDrop, '====');
    if (isOver) {
      return <div className={maskClasses} />;
    }
    if ((!isOver) && canDrop) {
      return <div className={maskClasses} />;
    }
    return '';
  }
  render() {
    const { row, column, connectDropTarget } = this.props;
    const black = (row + column) % 2 === 0;
    const style = {
      backgroundColor: black ? 'black' : 'white',
      color: black ? 'white' : 'color',
    };

    return connectDropTarget(<div style={style} className={cx('square')} >
      <div>
        { this.props.children }
      </div>
      { this.renderOverLay() }

    </div>);
  }
}
BoardSquare.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};
export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
