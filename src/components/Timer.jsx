import React from 'react'
import { useState, useEffect } from 'react'

export default function Timer(props) {
	const { tenzies } = props
	const [time, setTime] = useState(0)

	const [bestTime, setbestTime] = useState(
		() => JSON.parse(localStorage.getItem('bestime')) || 0
	)

	useEffect(() => {
		localStorage.setItem('bestime', JSON.stringify(time))
	}, [bestTime])

	useEffect(() => {
		let interval = null
		if (!tenzies) {
			interval = setInterval(() => {
				setTime((prevTime) => (prevTime += 1))
			}, 1000)
		} else if (tenzies) {
			if (time < bestTime) {
				setbestTime(time)
			}
			setTime(0)
			clearInterval(interval)
		}

		return () => clearInterval(interval)
	}, [time])

	const minDisplay = ('0' + Math.floor(time / 60)).slice(-2)
	const secDisplay = ('0' + Math.floor((time * 60) / 60)).slice(-2)

	const bestMinDisplay = ('0' + Math.floor(bestTime / 60)).slice(-2)
	const bestSecDisplay = ('0' + Math.floor((bestTime * 60) / 60)).slice(-2)

	return (
		<h3>
			Current Run - {minDisplay} : {secDisplay}
			<hr />
			<span>
				Last Run - {bestMinDisplay} : {bestSecDisplay}
			</span>
		</h3>
	)
}
