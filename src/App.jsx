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
	const [rollCount, setrollCount] = useState(null)

	const [seconds, setSeconds] = useState(null)
	const [timer, setTimer] = useState(false)
	const [bestTime, setBestTime] = useState(
		() => JSON.parse(localStorage.getItem('bestTime')) || null
	)

	useEffect(() => {
		let interval = null
		if (timer) {
			interval = setInterval(() => {
				setSeconds((prevTime) => prevTime + 1)
			}, 1000)
		} else if (!timer) {
			clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [timer])

	// Side effect for checking winning conidtion and keeping state synced
	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld)
		const firstValue = dice[0].value
		const allSameValue = dice.every((die) => die.value === firstValue)
		if (allHeld && allSameValue) {
			setTenzies(true)
		}
	}, [dice])

	useEffect(() => {
		if (tenzies) {
			setTimer(false)
			if (!bestTime) {
				setBestTime(seconds)
				JSON.stringify(localStorage.setItem('bestTime', seconds))
			} else if (bestTime && seconds < bestTime) {
				setBestTime(seconds)
				JSON.stringify(localStorage.setItem('bestTime', seconds))
			}
		}
	}, [tenzies])

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
		if (!tenzies) {
			setTimer(true)
			setDice((prevDice) =>
				prevDice.map((die) => {
					return die.isHeld === true ? die : generateDieObject()
				})
			)
			trackRollCount()
		} else {
			setTenzies(false)
			setSeconds(null)
			setDice(diceOnLoad())
			resetRollCount()
		}
	}

	// Function to hold die and track state
	function holdDice(id) {
		if (!tenzies) {
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
	}

	// Function to track state(count) of dice roll
	function trackRollCount() {
		return setrollCount((prevRollCount) => (prevRollCount += 1))
	}

	// Resets the state(count) of dice roll
	function resetRollCount() {
		return setrollCount(null)
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
				<Timer seconds={seconds} bestTime={bestTime} />
				<RollButton tenzies={tenzies} rollDice={rollDice} />
			</div>
		</div>
	)
}

export default App
