import { useContext, useState, useEffect } from 'react';
import { PlayersContext } from '../../context/PlayersProvider';

function PositionButton({ position, btn }) {
	const { positions, filtered } = useContext(PlayersContext);
	///THE SELECTED STATE VARIABLE IS USED WHEN FILTERING PLAYERS BY POSITION - USED TO CONTROL THE CHECKBOX INPUT
	const [selected, setSelected] = useState(false);
	useEffect(() => {
		if (filtered === false) setSelected('');
	}, [filtered]);

	let { color, active } = positions.find((pos) => pos.label === position);
	color += ' text-slate-100';
	active += ' text-slate-300';
	//CHECKS IF THE POSITION ICON SHOULD BE A BUTTON OR A DIV
	const Element = btn ? 'button' : 'div';
	///IF THE ELEMENT IS A BUTTON, IT HIDES A CHECKBOX THAT IS CHECKED WHEN THE USER CLICKS ON THE BUTTON
	return (
		<Element
			onClick={() => setSelected((prev) => !prev)}
			type='button'
			className={`${
				!selected ? color : active
			} flex items-center justify-center w-8 h-8 rounded `}
		>
			{position}
			{btn && (
				<input
					name={position}
					className='hidden'
					type='checkbox'
					value={true}
					checked={selected}
					onChange={() => console.log('changed')}
				/>
			)}
		</Element>
	);
}

export default PositionButton;
