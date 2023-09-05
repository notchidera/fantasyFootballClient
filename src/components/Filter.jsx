import { useContext, useState } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import Input from './Input';
import PositionIcon from './PositionIcon';
import Search from './Search';
import Button from './Button';
import { filter, removeRound } from '../icons/icons';

function Filter() {
	const { options, positions, filterPlayers, clearFiltersHandler } =
		useContext(PlayersContext);
	const [isOpen, setIsOpen] = useState(false);
	const sumbitHandler = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		filterPlayers(Object.fromEntries(form));
	};
	const advancedFiltersHandler = () => {
		setIsOpen((prev) => !prev);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	return (
		<div
			className={`bg-slate-700 overflow-auto p-6 md:fixed w-full top-0 z-20 shadow-xl ${
				!isOpen && 'md:h-40'
			}`}
		>
			<form
				className='flex flex-col gap-4 items-center'
				onSubmit={sumbitHandler}
				autoFocus={isOpen}
			>
				<div className='flex gap-4'>
					{positions.map((pos) => (
						<PositionIcon btn={true} key={pos.label} position={pos.label} />
					))}
				</div>
				{isOpen && (
					<div className='flex items-start justify-start sticky left-0 flex-wrap'>
						{options.map(
							(option) =>
								option.value !== 'name' &&
								option.value !== 'team' &&
								option.value !== 'position' && (
									<Input key={option.value} option={option} />
								)
						)}
					</div>
				)}
				<div className='flex flex-col md:flex-row gap-10'>
					<Search />
					<Button color={'green'} content={'Filter'} icon={filter} />
					<Button
						color={'light'}
						content={'Clear filters'}
						icon={removeRound}
						onClick={clearFiltersHandler}
						type='button'
					/>
				</div>
				<button
					type='button'
					onClick={advancedFiltersHandler}
					className='text-xs flex gap-2 items-center text-slate-100'
				>
					Advanced filters{' '}
					{isOpen ? (
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
								d='M4.5 15.75l7.5-7.5 7.5 7.5'
							/>
						</svg>
					) : (
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
								d='M19.5 8.25l-7.5 7.5-7.5-7.5'
							/>
						</svg>
					)}
				</button>
			</form>
		</div>
	);
}

export default Filter;
