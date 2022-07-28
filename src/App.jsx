import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import './index.css';
import Dice from './components/Dice';

function App() {
	const [dice, setDice] = React.useState(allNewDice());
	const [tenzies, setTenzies] = React.useState(false);

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);
		if (allHeld && allSameValue) {
			console.log('you won!');
			setTenzies(true);
		}
	}, [dice]);

	function generateDieObject() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
	}

	function allNewDice() {
		let arrDice = [];
		for (let i = 0; i < 10; i++) {
			arrDice.push(generateDieObject());
		}
		return arrDice;
	}

	function rollDice() {
		setDice((prevDice) =>
			prevDice.map((die) => {
				return die.isHeld === true ? die : generateDieObject();
			})
		);
	}

	function holdDice(id) {
		setDice((prevDice) =>
			prevDice.map((die) => {
				return die.id === id
					? {
							...die,
							isHeld: !die.isHeld,
					  }
					: die;
			})
		);
	}

	const diceElement = dice.map((die) => (
		<Dice
			key={die.id}
			className='die-display'
			value={die.value}
			isHeld={die.isHeld}
			hold={() => holdDice(die.id)}
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
