import React from 'react'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Counter from './components/Counter'
import RollButton from './components/Button'
import Timer from './components/Timer'
import Dice from './components/Dice'
import './index.css'

function App() {
	const [parent] = useAutoAnimate()
	const [dice, setDice] = useState(diceOnLoad())
	const [tenzies, setTenzies] = useState(false)
	const [rollCount, setrollCount] = useState(0)
	// Side effect for checking winning conidtion and keeping state synced
	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld)
		const firstValue = dice[0].value
		const allSameValue = dice.every((die) => die.value === firstValue)
		if (allHeld && allSameValue) {
			console.log('you won!')
			setTenzies(true)
		}
	}, [dice])

	// Create a dice object to be used for initial state and dice re-roll
	function generateDieObject() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		}
	}

	// Create zero value die object for diceOnLoad function
	function zeroValueDieObject() {
		return {
			id: nanoid(),
			value: 0,
			isHeld: false,
		}
	}

	// Create initial array of die objects before game starts
	function diceOnLoad() {
		let arrDice = []
		for (let i = 0; i < 10; i++) {
			arrDice.push(zeroValueDieObject())
		}
		return arrDice
	}

	// Create an array of die object when the game starts
	function allNewDice() {
		let arrDice = []
		for (let i = 0; i < 10; i++) {
			arrDice.push(generateDieObject())
		}
		return arrDice
	}

	// Dice roll function, checks for held die and also tracks state
	function rollDice() {
		// if tenzies state(win condition) is false roll dice
		if (!tenzies) {
			setDice((prevDice) =>
				prevDice.map((die) => {
					return die.isHeld === true ? die : generateDieObject()
				})
			)
			trackRollCount()
		} else {
			// if tenzies state(win condition) is true set tenzies to false and create all new dice roll state
			setTenzies(false)
			setDice(allNewDice())
			resetRollCount()
		}
	}

	// Function to hold die and track state
	function holdDice(id) {
		setDice((prevDice) =>
			prevDice.map((die) => {
				return die.id === id
					? {
							...die,
							isHeld: !die.isHeld,
					  }
					: die
			})
		)
	}

	// Function to track state(count) of dice roll
	function trackRollCount() {
		return setrollCount((prevRollCount) => (prevRollCount += 1))
	}

	// Resets the state(count) od dice roll
	function resetRollCount() {
		return setrollCount(0)
	}

	// Method to map die element to the container
	const diceElement = dice.map((die) => (
		<Dice
			key={die.id}
			className='die-display'
			value={die.value}
			isHeld={die.isHeld}
			hold={() => holdDice(die.id)}
		/>
	))

	// JSX to render DOM
	return (
		<div className='app-container'>
			{tenzies && <Confetti />}
			<h1>Tenzies 🎲</h1>
			<main className='dice-container' ref={parent}>
				{diceElement}
			</main>
			<div className='utilities'>
				<Counter counter={rollCount} />
				<Timer tenzies={tenzies} />
				<RollButton tenzies={tenzies} rollDice={rollDice} />
			</div>
		</div>
	)
}

export default App
