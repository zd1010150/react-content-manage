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

  clearDragging = () => {
    this.setState({
			// startIndex: -1,
      // endIndex: -1,
      isOtherDragging: false,
    });
	}
	
	// test algorithm 1
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

	// moveCard = (dragIndex, hoverIndex) => {		
	// 	const start = Number(this.state.startIndex);
	// 	const end = Number(this.state.endIndex);
  //   // avoid selected cards switch position internally
  //   if (start !== end && dragIndex <= end && dragIndex >= start) {
  //     return this.setState({
  //       isOtherDragging: true,
  //     });
  //   }

  //   const { cards } = this.state;
	// 	const length = end - start + 1;
    
  //   // batch udpate positions
	// 	// remove and get all dragging cards
	// 	const hoverCard = cards[hoverIndex];
	// 	const dragCards = cards.splice(start, length);
	// 	console.log(dragCards);
	// 	// insert all drag cards into hoverIndex
	// 	// 1. 在remove后的原数组中找到hoverindex元素现在的index
	// 	let newHoverIndex = -1;
	// 	cards.forEach((card, i) => {
	// 		if (card.id === hoverCard.id) {
	// 			newHoverIndex = i;
	// 		}
	// 	});
	// 	// 2. 将remove后的原数组以当前hoverindex的new index为界拆分为两部分
	// 	if (newHoverIndex === -1) {
	// 		return console.log('error');
	// 	}
	// 	const frontArray = cards.filter((card, i) => i < newHoverIndex);
	// 	const backArray = cards.filter((card, i) => i > newHoverIndex);
	// 	// 3. 组合前，removed，后三部分为一个新数组
		
	// 	const newCards = [...frontArray, hoverCard, ...dragCards, ...backArray];
	// 	// const dragCard = cards[dragIndex];
  //   // const newCards = cards.filter((card, index) => index !== dragIndex);
  //   // newCards.splice(hoverIndex, 0, dragCard);
	// 	this.setState({
  //     cards: newCards,
  //     isOtherDragging: true,
	// 	});
	// }

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
					/>
				))}
			</div>
		)
	}
}

export default Container;