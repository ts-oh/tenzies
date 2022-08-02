import React from 'react'

export default function RollButton(props) {
	const { tenzies, rollDice } = props

	return (
		<button className='roll-dice' onClick={() => rollDice()}>
			{tenzies === true ? 'New Game' : 'Roll!'}
		</button>
	)
}
