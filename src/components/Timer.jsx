import React from 'react'
import { useState, useEffect } from 'react'

export default function Timer(props) {
	const { seconds, bestTime } = props
	return (
		<div className='timer-container'>
			<p>
				<span>
					Timer: {Math.floor(seconds / 60)}:
					{Math.round(((seconds / 60) % 1) * 60)}
				</span>
			</p>
			<hr />
			<p>
				<span>
					Best Time: {Math.floor(bestTime / 60)}:
					{Math.round(((bestTime / 60) % 1) * 60)}
				</span>
			</p>
		</div>
	)
}
