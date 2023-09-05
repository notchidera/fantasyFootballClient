import { useContext, useState } from 'react';
import { PlayersContext } from '../context/PlayersProvider';

function PositionIcon({ position, btn }) {
	const { positions } = useContext(PlayersContext);
	const [selected, setSelected] = useState(false);
	let { color, active } = positions.find((pos) => pos.label === position);
	color += ' text-slate-100';
	active += ' text-slate-300';

	const Element = btn ? 'button' : 'div';

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

export default PositionIcon;
