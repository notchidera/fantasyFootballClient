import { useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { TeamsContext } from '../context/TeamsProvider';
import { UsersContext } from '../context/UsersProvider';
import { users, money, wallet, help } from '../icons/icons';
import SwipeToDelete from 'react-swipe-to-delete-ios';

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
			{isEditing && (
				<div className='text-center h-6 group underline transition-all duration-150 relative flex gap-2 items-center justify-center'>
					<p className='group-hover:blur-md flex items-center gap-2 transition-all duration-150'>
						Per rimuovere un giocatore trascinalo a sinistra {help}
					</p>
					<img
						className='w-32 absolute hidden group-hover:block transition-all duration-150'
						alt='remove player gif'
						src='./img/delete.gif'
					/>
				</div>
			)}
			<div className='flex flex-col md:flex-row w-full gap-2 '>
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
								<SwipeToDelete
									key={player._id}
									className='rounded'
									height={isEditing ? 35 : 40}
									deleteWidth={60}
									disabled={!isEditing}
									onDelete={() => removePlayer(player)}
									onDeleteConfirm={(onSuccess, onCancel) => {
										if (
											window.confirm(
												'Confermi di voler rimuovere il calciatore?'
											)
										)
											onSuccess();
										else onCancel();
									}}
								>
									<div
										className={` p-2 bg-slate-700 ${
											isEditing && 'hover:bg-slate-800 cursor-pointer'
										} w-full gap-1 flex justify-between text-slate-100 relative`}
									>
										<p>{player.name.slice(0, 16)}</p>
										<p>{player.pricePrediction} </p>
									</div>
								</SwipeToDelete>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default TeamView;
