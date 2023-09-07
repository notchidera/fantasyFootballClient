import { useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { TeamsContext } from '../context/TeamsProvider';
import { UsersContext } from '../context/UsersProvider';
import { users, money, wallet } from '../icons/icons';

import PositionIcon from './PositionIcon';

function TeamView({ team, isEditing }) {
	const { positions } = useContext(PlayersContext);
	const { sumPrice, removePlayer, setCurrentTeam, splitPlayersByPosition } =
		useContext(TeamsContext);
	const {
		userSettings: { budget },
	} = useContext(UsersContext);

	const formattedTeam = splitPlayersByPosition(team);

	const expenses = {};
	positions.forEach(
		(position) =>
			(expenses[position.label] = sumPrice(position.label, formattedTeam))
	);

	const totalExpenses = expenses?.P + expenses?.A + expenses?.C + expenses?.D;
	return (
		<>
			<div className='flex gap-4 items-center justify-center  text-slate-700'>
				{isEditing ? (
					<input
						required
						value={team.name}
						onChange={(e) =>
							setCurrentTeam((prev) => ({ ...prev, name: e.target.value }))
						}
						placeholder='Team name'
						className='p-2 rounded-full border border-slate-400 outline-none'
						type='text'
					/>
				) : (
					<h3 className='font-semibold text-lg'>Name: {team.name}</h3>
				)}
				<span className='p-2 flex items-center gap-2 font-semibold text-lg rounded'>
					{wallet}
					{budget - totalExpenses} $
				</span>
			</div>
			<div className='flex flex-col md:flex-row w-full gap-2 '>
				{/* <div className='flex items-center justify-start gap-6 w-full p-2'>
					Ruolo
					<div className='p-1 border-b w-12 md:w-20  border-slate-700/50 text-center'>
						N
					</div>
					<div className='p-1 border-b w-12 md:w-20  border-slate-700/50 text-center'>
						Costo
					</div>
					<div className='p-1 border-b w-12 md:w-20  border-slate-700/50 text-center'>
						% Budget
					</div>
				</div> */}

				{positions.map((pos) => (
					<div
						className='md:w-1/4 w-full bg-slate-200 rounded p-1'
						key={pos.label}
					>
						<div className='flex items-center justify-between gap-2 w-full p-2'>
							<PositionIcon key={pos.label} position={pos.label} />
							<div className='p-1 text-lg text-center flex items-center gap-2 justify-center'>
								{formattedTeam[pos.label]?.length || 0}
								{users}
							</div>
						</div>

						<p className='p-1 mb-2  text-center flex items-center gap-2 justify-center'>
							{money} {expenses[pos.label]}$/{' '}
							<span className='font-semibold'>
								{Math.round(expenses[pos.label] / (budget / 100)) || 0}%
							</span>
						</p>

						<div className='flex flex-col p-1 gap-2 flex-wrap'>
							{formattedTeam[pos.label]?.map((player) => (
								<div
									key={player._id}
									className='p-2 bg-slate-700 w-full gap-1 flex justify-between text-slate-100 rounded relative'
								>
									<p>{player.name.slice(0, 16)}</p>
									<p> {player.pricePrediction}</p>
									{isEditing && (
										<button
											onClick={() => removePlayer(player)}
											className='w-3 h-3 bg-red-500 flex items-center justify-center absolute -top-2 right-0 text-xs text-slate-100 rounded'
										>
											X
										</button>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default TeamView;
