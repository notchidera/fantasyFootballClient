import { useContext, useState, useEffect } from 'react';
import { PlayersContext } from '../context/PlayersProvider';

function Input({ option }) {
	const { maxOptions, filtered } = useContext(PlayersContext);
	const [val, setVal] = useState('');

	useEffect(() => {
		if (filtered === false) setVal('');
	}, [filtered]);

	return (
		<div className='flex gap-2 items-center text-slate-100 justify-between w-64  md:border-r border-slate-100 p-3 md:p-6 text-xs md:text-sm  appearance-none'>
			<label className=' text-slate-100 outline-none'>{option.label}</label>
			<input
				style={{ appearance: 'none' }}
				type='number'
				value={val}
				onChange={(e) => setVal(e.target.value)}
				step='0.1'
				className='rounded-full appearance-none p-2 w-16 outline-none text-center bg-slate-700 border border-slate-400'
				placeholder={`${maxOptions.includes(option.value) ? 'Max' : 'Min'}`}
				name={option.value}
			/>
		</div>
	);
}

export default Input;
