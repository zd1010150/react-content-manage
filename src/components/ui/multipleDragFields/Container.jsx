import React, { Component } from 'react'
// import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'

const style = {
	width: 400,
}

class Container extends Component {
	constructor(props) {
		super(props)
		this.moveCard = this.moveCard.bind(this)
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
		}
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state
		const dragCard = cards[dragIndex]
    debugger;
    const newCards = cards.filter((card, index) => index !== dragIndex);
    newCards.splice(hoverIndex, 0, dragCard);
    
		this.setState({
      cards: newCards,
		});
	}

	render() {
		const { cards } = this.state

		return (
			<div style={style}>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						index={i}
						id={card.id}
						text={card.text}
						moveCard={this.moveCard}
					/>
				))}
			</div>
		)
	}
}

// export default DragDropContext(HTML5Backend)(Container);
export default Container;