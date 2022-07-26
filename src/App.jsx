import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';

import './index.css';
import Dice from './components/Dice';

function App() {
	const [dice, setDice] = React.useState(allNewDice());

	function allNewDice() {
		let arrDice = [];
		for (let i = 0; i < 10; i++) {
			arrDice.push({
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false
			});
		}
		return arrDice;
	}

	function rollDice() {
		return setDice(allNewDice());
	}

	const diceElement = dice.map((die) => (
		<Dice
			key={die.id}
			className='die-display'
			value={die.value}
			isHeld={die.isHeld}
		/>
	));

	return (
		<div className='app-container'>
			<h1>Tenzies</h1>
			<main className='dice-container'>{diceElement}</main>
			<button className='roll-dice' onClick={rollDice}>
				Roll
			</button>
		</div>
	);
}

export default App;
