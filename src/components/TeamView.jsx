import { useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { TeamsContext } from '../context/TeamsProvider';
import { UsersContext } from '../context/UsersProvider';
import { users, money, wallet, help, pieChart } from '../icons/icons';

import SwipeToDelete from 'react-swipe-to-delete-ios';
import Chart from './Chart';
import RoundedButton from './buttons/RoundedButton';
import PositionIcon from './buttons/PositionButton';

function TeamView({ team, isEditing }) {
	const { positions } = useContext(PlayersContext);
	const { sumPrice, removePlayer, setCurrentTeam, splitPlayersByPosition } =
		useContext(TeamsContext);
	const {
		userSettings: { budget },
	} = useContext(UsersContext);

	///CREATES A NEW TEAM OBJECT WITH THE PLAYERS SPLIT BY POSITION (EG: {name: 'teamName', players: {P: [player 1, player2], D: [player1, player2, ...]}})
	const formattedTeam = splitPlayersByPosition(team);

	///CREATES AN EXPENSES OBJECT THAT CONTAINS INFORMATION ABOUT THE OVERALL MONEY SPENT ON THE DIFFERENT POSITION
	const expenses = {};
	positions.forEach(
		(position) =>
			(expenses[position.label] = sumPrice(position.label, formattedTeam))
	);
	///CALCULATES THE TOTAL EXPENSES FOR THE CURRENT TEAM
	const totalExpenses = expenses?.P + expenses?.A + expenses?.C + expenses?.D;

	return (
		<>
			<div className='flex relative items-center justify-center w-full'>
				<div className='flex flex-col w-full'>
					<div className='flex gap-4 w-full items-center justify-center  text-slate-700'>
						{/* IF ISEDITING (THEREFORE IN THE NEWTEAMVIEW), IT RENDERS A CHART ICON THAT SHOWS THE CHART ON HOVER INSTEAD OF SHOWING IT DIRECTLY - THERE'S NO ROOM TO SHOW DIRECTLY THE CHART IN THE NEWTEAMVIEW */}
						{isEditing ? (
							<>
								<div className='group'>
									<RoundedButton icon={pieChart}></RoundedButton>
									<div className=' hidden group-hover:block absolute left-32 top-10 z-50 bg-slate-700 p-20 rounded shadow-3xl shadow-slate-100 '>
										<Chart expenses={expenses} totalExpenses={totalExpenses} />
									</div>
								</div>
								<input
									required
									data-cy='teamName'
									value={team.name}
									onChange={(e) =>
										setCurrentTeam((prev) => ({
											...prev,
											name: e.target.value,
										}))
									}
									placeholder='Team name'
									className='p-2 text-center lg:p-1 2xl:p-2 rounded-full border border-slate-400 outline-none'
									type='text'
								/>
							</>
						) : (
							<h3 className='font-semibold text-lg'>Name: {team.name}</h3>
						)}
						<span className='p-2 flex items-center gap-2 font-semibold text-lg lg:text-sm 2xl:text-lg rounded'>
							{wallet}
							{budget - totalExpenses} $
						</span>
					</div>
					{!isEditing && (
						<div
							className={`w-full flex items-center bg-slate-700 p-6 h-72 justify-center`}
						>
							<Chart expenses={expenses} totalExpenses={totalExpenses} />
						</div>
					)}
					{isEditing && (
						<div className='text-center h-6 group underline transition-all duration-150 relative flex gap-2 items-center justify-center'>
							<p className='group-hover:blur-md flex text-sm items-center gap-2 transition-all duration-150'>
								Per rimuovere un giocatore trascinalo a sinistra {help}
							</p>
							<img
								className='w-32 absolute hidden group-hover:block transition-all duration-150'
								alt='remove player gif'
								src='./img/delete.gif'
							/>
						</div>
					)}
				</div>
			</div>
			<div className='flex flex-col md:flex-row w-full gap-2 '>
				{/* IT ITERATES OVER THE POSITIONS ARRAY IN ORDER TO SPLIT THE PLAYERS BY POSITION IN THE TEAM VIEW. FOR EACH POSITION IT ALSO SHOWS THE EXPENSE (ABSOLUTE AND RELATIVE VALUES) AND THE NUMBER OF PLAYERS */}
				{positions.map((pos) => (
					<div
						className='md:w-1/4 w-full bg-slate-200 rounded p-1'
						key={pos.label}
					>
						<div className='flex items-center justify-between gap-2 w-full p-2'>
							<PositionIcon key={pos.label} position={pos.label} />
							<div className='p-1 text-lg lg:text-sm 2xl:text-lg text-center flex items-center gap-2 justify-center'>
								{formattedTeam[pos.label]?.length || 0}
								{users}
							</div>
						</div>

						<div className='flex flex-col p-1 gap-2 flex-wrap flex-grow-1 '>
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
										<p data-cy={player.name}>{player.name.slice(0, 16)}</p>
										<p>{player.pricePrediction} </p>
									</div>
								</SwipeToDelete>
							))}
						</div>
						<p className='p-1 mb-2  text-center flex items-center gap-2 justify-center'>
							{money} {expenses[pos.label]}$/{' '}
							<span className='font-semibold'>
								{Math.round(expenses[pos.label] / (budget / 100)) || 0}%
							</span>
						</p>
					</div>
				))}
			</div>
		</>
	);
}

export default TeamView;
