export default function Dice(props) {
	const { className, value, isHeld } = props;

	const heldStyles = {
		backgroundColor: isHeld ? '#00c675' : 'whitesmoke'
	};

	return (
		<div>
			<h2 className={className} style={heldStyles}>
				{value}
			</h2>
		</div>
	);
}
