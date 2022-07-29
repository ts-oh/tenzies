export default function Dice(props) {
	const { className, value, isHeld, hold } = props
	const heldStyles = {
		backgroundColor: isHeld ? '#00c675' : 'whitesmoke',
	}

	function diceValue() {
		if (value === 1) {
			return '⚀'
		} else if (value === 2) {
			return '⚁'
		} else if (value === 3) {
			return '⚂'
		} else if (value === 4) {
			return '⚃'
		} else if (value === 5) {
			return '⚄'
		} else if (value === 6) {
			return '⚅'
		}
	}

	return (
		<div>
			<h2 className={className} style={heldStyles} onClick={hold}>
				{diceValue()}
			</h2>
		</div>
	)
}
