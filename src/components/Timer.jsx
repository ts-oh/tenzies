import React from 'react'
import { useState, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'

export default function Timer() {
	const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
		autoStart: true,
	})

	let min = minutes
	let sec = seconds

	return (
		<h3>
			{min} : {sec}
		</h3>
	)
}
