import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import classNames from 'classnames/bind';
import styles from '../index.less';
const cx = classNames.bind(styles);

import Card from './Card';

const defaultProps = {
  data: [],
  theme: 'lead',
  cardDisplayField: 'id',
};
const propTypes = {
  data: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
  cardDisplayField: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onIconClick: PropTypes.func,
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.data,
      startIndex: -1,
      endIndex: -1,
      isOtherDragging: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { cards } = this.state;
    if (nextProps.data.length === this.props.data.length + 1) {
      const last = nextProps.data[nextProps.data.length - 1];
      return this.setState({
        cards: [...cards, last],
      });
    }
    return this.setState({
      cards: [...nextProps.data],
    });
  }
	
  setSelectedCards = (start, end) => {
    const { cards } = this.state;
    const selectedCards = cards.map((card, i) => {
      card.selected = i >= start && i <= end;
      return card;
    });

    const { onSelect } = this.props;
    if (onSelect && typeof onSelect === 'function') {
      onSelect(selectedCards.filter(card => card.selected));
    }
    return selectedCards;
  }

  handleItemSelection = e => {
    const { index } = e.target.dataset;
    const { startIndex } = this.state;

    if (!e.shiftKey) {
      return this.setState({
        cards: this.setSelectedCards(index, index),
        startIndex: index,
        endIndex: index,
      });
    }

    if (index < startIndex) {
      return this.setState({
        cards: this.setSelectedCards(index, startIndex),
        startIndex: index,
        endIndex: startIndex,
      });
    } else {
      return this.setState({
        cards: this.setSelectedCards(startIndex, index),
        endIndex: index,
      });
    }
  }

  setDragging = () => {
    const { startIndex, endIndex } = this.state;
    this.setState({
      isOtherDragging: true,
      cards: this.setSelectedCards(startIndex, endIndex),
    });
  }

  clearDragging = () => {
    this.props.onDrop(this.state.cards);
    this.setState({ isOtherDragging: false });
  }
	
  // Swap algorithm
  // According to how the drag function is worked (in other words, when moveCard is being called), we only swap with one adjacent card every time,
  // either drag upwords or downwords.
  swapCards = (cards, start, length, newStart) => {
    const cardsCopy = _.cloneDeep(cards);
    const dragCards = cardsCopy.splice(start, length);
    // Insert all dragged cards into new positions
    dragCards.forEach((dragCard, i) => cardsCopy.splice(newStart + i, 0, dragCard));
    return cardsCopy;
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { startIndex, endIndex, cards } = this.state;
    // Don't replace items with other selected items
    if (hoverIndex >= startIndex && hoverIndex <= endIndex) {
      return;
    }

    const dragLength = endIndex - startIndex + 1;
    const newStartIndex = startIndex > hoverIndex ? hoverIndex : Number(startIndex) + 1;
    const newCards = this.swapCards(cards, startIndex, dragLength, newStartIndex);

    this.setState({
      startIndex: newStartIndex,
      endIndex: newStartIndex + dragLength - 1,
      cards: newCards,
      isOtherDragging: true,
    });
  }

  render() {
    const { data, cardDisplayField, title, ...others } = this.props;
    const { cards, isOtherDragging, startIndex, endIndex } = this.state;
    return (
      <Fragment>
        <h3 className={cx('title')}>{title}</h3>
        <div
          className={cx('cardContainer')}
          onClick={this.handleItemSelection}
        >
          {cards && cards.map((card, i) => (
            <Card
              key={card.id}
              id={card.id}
              index={i}
              text={card[cardDisplayField]}
              moveCard={this.moveCard}
              isSelected={card.selected}
              isOtherDragging={isOtherDragging}
              clearDragging={this.clearDragging}
              setDragging={this.setDragging}
              {...others}
            />
          ))}
        </div>
      </Fragment>
    )
  }
}

Container.defaultProps = defaultProps;
Container.propTypes = propTypes;
export default Container;