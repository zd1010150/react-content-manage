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
					text: 'Write a cool JS library',
				},
				{
					id: 2,
					text: 'Make it generic enough',
				},
				{
					id: 3,
					text: 'Write README',
				},
				{
					id: 4,
					text: 'Create some examples',
				},
				{
					id: 5,
					text:
						'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
				},
				{
					id: 6,
					text: '???',
				},
				{
					id: 7,
					text: 'PROFIT',
				},
      ],
      selectStartIndex: -1,
      selectEndIndex: -1,
      isOtherDragging: false,
		};
	}

  onMultipleSelect = e => {
    const { id } = e.target.dataset;
    const { selectStartIndex, selectEndIndex } = this.state;

    if (!e.shiftKey) {
      return this.setState({
        selectStartIndex: id,
        selectEndIndex: id,
      }); 
    }

    if (id < selectStartIndex) {
      return this.setState({
        selectStartIndex: id,
        selectEndIndex: selectStartIndex,
      });
    } else {
      return this.setState({
        selectEndIndex: id,
      });
    }
  }

  clearDragging = () => {
    this.setState({
      isOtherDragging: false,
    });
  }

	moveCard = (dragIndex, hoverIndex, start, end) => {
    console.log('on move');
    // avoid selected cards switch position internally
    if (start !== end && dragIndex <= end && dragIndex >= start) {
      return this.setState({
        isOtherDragging: true,
      });
    }

    const { cards } = this.state;
    const length = end - start + 1;
    const dragCard = cards[dragIndex];
    // batch udpate positions

    const newCards = cards.filter((card, index) => index !== dragIndex);
    newCards.splice(hoverIndex, 0, dragCard);
    console.log('test');
    console.log(newCards);
		this.setState({
      cards: newCards,
      isOtherDragging: true,
		});
	}

	render() {
		const { cards, isOtherDragging, selectStartIndex, selectEndIndex } = this.state;

		return (
			<div style={style} onClick={this.onMultipleSelect}>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						index={i}
						id={card.id}
						text={card.text}
            moveCard={this.moveCard}
            startIndex={selectStartIndex}
            endIndex={selectEndIndex}
            isOtherDragging={isOtherDragging}
            clearDragging={this.clearDragging}
					/>
				))}
			</div>
		)
	}
}

export default Container;