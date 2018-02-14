import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styles from './index.less';
import BoardSquare from './boardSquare';
import Knight from './knight';


const cx = classNames.bind(styles);
class Board extends React.Component{
    renderOneSquare(i){
        const row = Math.floor(i / 8);;
        const column = i%8;
        const knight = (!_.isEmpty(this.props.knightPosition)) && this.props.knightPosition.length ===2 && this.props.knightPosition[0] === row && this.props.knightPosition[1] === column;
        return (<BoardSquare row={row} column={column} key={i}>
                { knight? <Knight/> : ''}
            </BoardSquare>
        );
    }
    render(){
        const squares = [];
        for(let i=0;i<64;i++){
            squares.push(this.renderOneSquare(i));
        }
        return <div className={cx('board')}>
            { squares }
        </div>;
    }

}
Board.props = {
   knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};
export default DragDropContext(HTML5Backend)(Board);