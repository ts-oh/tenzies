export default function Dice(props) {
	const { className, value, isHeld, hold } = props;
	const heldStyles = {
		backgroundColor: isHeld ? '#00c675' : 'whitesmoke',
	};

	return (
		<div>
			<h2 className={className} style={heldStyles} onClick={hold}>
				{value}
			</h2>
		</div>
	);
}
