import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'

const style = {
	width: 400,
}

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [
				{
					id: 1,
					text: 'A',
				},
				{
					id: 2,
					text: 'B',
				},
				{
					id: 3,
					text: 'C',
				},
				{
					id: 4,
					text: 'D',
				},
				{
					id: 5,
					text: 'E',
				},
				{
					id: 6,
					text: 'F',
				},
				{
					id: 7,
					text: 'G',
				},
      ],
      startIndex: -1,
      endIndex: -1,
      isOtherDragging: false,
		};
	}

	// 提权func到这层而不直接使用startindex, endindex来判断isselected状态的原因是让cards component更干净，使用container的状态来作为single source of truth
	// reset all select to false
	clearSelectedCards = () => {
		const { cards } = this.state;
		return cards.map(card => card.selected = false);
	}

	// set record selected status
	setSelectedCards = (start, end) => {
		const { cards } = this.state;
		return cards.map((card, i) => {
			card.selected = i >= start && i <= end;
			return card;
		});
	}

  handleItemSelection = e => {
    const { index } = e.target.dataset;
    const { startIndex, endIndex } = this.state;

    if (!e.shiftKey) {
			const newCards = this.setSelectedCards(index, index);
      return this.setState({
				cards: newCards,
        startIndex: index,
        endIndex: index,
      });
    }

    if (index < startIndex) {
			const newCards = this.setSelectedCards(index, startIndex);
      return this.setState({
				cards: newCards,
        startIndex: index,
        endIndex: startIndex,
      });
    } else {
			const newCards = this.setSelectedCards(startIndex, index);
      return this.setState({
				cards: newCards,
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
    this.setState({ isOtherDragging: false });
	}
	
	moveCard = (dragIndex, hoverIndex) => {
		const { startIndex, endIndex, cards } = this.state;
    // avoid selected cards switch position internally
    // if (hoverIndex <= endIndex && hoverIndex >= startIndex) {
    //   return this.setState({
    //     isOtherDragging: true,
    //   });
    // }

		// 1. 以start, end为界分为三部分
		const frontArray = cards.filter((card, i) => i < startIndex);
		const backArray = cards.filter((card, i) => i > endIndex);
		const dragLength = endIndex - startIndex + 1;
		const dragCards = [...cards].splice(startIndex, dragLength);
		// 2. if hoverIndex == 0, dragcards, front, back
		// 3. if hoverIndex == last, front, back, dragcards
		// 4.1 if hoverIndex in front, then insert dragcards in hoverindex and move hoverindex to back
		// 4.2 if hoverIndex in back, then push dragcards in hoverindex and move hoverindex in front
		let newCards;
		if (hoverIndex == 0) {
			newCards = [...dragCards, ...frontArray, ...backArray];
		} else if (hoverIndex == cards.length - 1) {
			newCards = [...frontArray, ...backArray, ...dragCards];
		} else {
			const hoverCard = cards[hoverIndex];
			console.log('===hovercard===');
			console.log(hoverCard);
			const isInFront = !!frontArray.find(elem => elem.id === hoverCard.id);
			if (isInFront) {
				const newFront = frontArray.filter(elem => elem.id !== hoverCard.id);
				newCards = [...newFront, ...dragCards, hoverCard, ...backArray];
			} else {
				const newBack = backArray.filter(elem => elem.id !== hoverCard.id);
				newCards = [...frontArray, hoverCard, ...dragCards, ...newBack];
			}
		}
		
		// update startIndex and endIndex
		console.log('---after moving cards----');
		console.dir(newCards);
		const newStartIndex = newCards.findIndex(card => card.id === dragCards[0].id);
		const newEndIndex = newCards.findIndex(card => card.id === dragCards[dragCards.length - 1].id);
		console.log(`new start: ${newStartIndex} and new end: ${newEndIndex}`);
		this.setState({
			startIndex: newStartIndex,
      endIndex: newEndIndex,
      cards: newCards,
      isOtherDragging: true,
		});
	}

	render() {
		const { cards, isOtherDragging, startIndex, endIndex } = this.state;
		return (
			<div style={style} onClick={this.handleItemSelection}>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						index={i}
						id={card.id}
						text={card.text}
						moveCard={this.moveCard}
						startIndex={startIndex}
						endIndex={endIndex}
						isSelected={card.selected}
            isOtherDragging={isOtherDragging}
						clearDragging={this.clearDragging}
						setDragging={this.setDragging}
					/>
				))}
			</div>
		)
	}
}

export default Container;