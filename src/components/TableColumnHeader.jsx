import { useState, useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';

function TableColumnHaeader({ option }) {
	const [isDescending, setIsDescending] = useState(true);

	const { sortPlayers } = useContext(PlayersContext);

	const sortingHandler = () => {
		sortPlayers(option.value, isDescending);
		setIsDescending((prev) => !prev);
		console.log(option.label);
	};
	return (
		<th
			className={`p-2 text-center border-b border-slate-100 ${
				option.value === 'name' && 'sticky left-0 z-1 bg-slate-700'
			}`}
		>
			<button
				onClick={sortingHandler}
				className='flex gap-2 items-center justify-center whitespace-nowrap'
			>
				{option.label}
				<span onClick={sortingHandler} className='hover:text-white'>
					{isDescending ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className={`w-3 h-3 ${
								(option.value === 'position' ||
									option.value === 'name' ||
									option.value === 'team') &&
								'hidden'
							}`}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19.5 8.25l-7.5 7.5-7.5-7.5'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-3 h-3'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4.5 15.75l7.5-7.5 7.5 7.5'
							/>
						</svg>
					)}
				</span>
			</button>
		</th>
	);
}

export default TableColumnHaeader;
