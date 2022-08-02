import React from 'react'
import { useState, useEffect } from 'react'

export default function Timer(props) {
	const { seconds, bestTime } = props
	return (
		<div className='timer-container'>
			<p>
				<span>Timer: {seconds}</span>
			</p>
			<hr />
			<p>
				<span>Best Time: {bestTime}</span>
			</p>
		</div>
	)
}
