import { useContext, useState } from 'react';
import { PlayersContext } from '../context/PlayersProvider';

function Input({ option }) {
	const { maxOptions } = useContext(PlayersContext);
	const [iptVal, setIptValue] = useState('');
	return (
		<div className='flex gap-2 items-center justify-between w-64 border-r border-slate-100 p-6 text-xs'>
			<label className=' text-slate-100 outline-none'>{option.label}</label>
			<input
				type='number'
				value={iptVal}
				onChange={(e) => setIptValue(e.target.value)}
				step='0.1'
				className='rounded-full p-1 w-12 outline-none'
				placeholder={`${maxOptions.includes(option.value) ? 'Max' : 'Min'}`}
				name={option.value}
			/>
		</div>
	);
}

export default Input;
