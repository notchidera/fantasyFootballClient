import { useState, useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';

function Search() {
	const { searchPlayer } = useContext(PlayersContext);

	const searchHandler = (e) => {
		searchPlayer(e.target.value);
	};
	return (
		<div className='flex w-40 bg-slate-100 p-2 rounded-full gap-1 items-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-4 h-4'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
				/>
			</svg>

			<input
				onChange={searchHandler}
				className='outline-none bg-slate-100 w-full'
			></input>
		</div>
	);
}

export default Search;
