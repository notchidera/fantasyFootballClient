import { useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { TeamsContext } from '../context/TeamsProvider';
import EditableCell from './EditableCell';
import RoundedButton from './RoundedButton';
import { remove } from '../icons/icons';

function Player({ player }) {
	const { options, positions, editableOptions } = useContext(PlayersContext);
	const { isAdding, addPlayer, currentTeam, removePlayer } =
		useContext(TeamsContext);

	const managePlayerButton = currentTeam.players.find(
		(pl) => player._id === pl._id
	) ? (
		<RoundedButton
			color={'red'}
			onClick={() => removePlayer(player)}
			size='sm'
			icon={remove}
		/>
	) : (
		<RoundedButton
			color={'green'}
			onClick={() => addPlayer(player)}
			size='sm'
		/>
	);

	return (
		<tr>
			{options.map((option) => (
				<td
					key={option.value}
					className={`p-2  border-b whitespace-nowrap border-slate-700 space-2  ${
						option.value === 'name'
							? 'sticky left-0 z-1 bg-slate-700 text-left'
							: 'text-center'
					}`}
				>
					{option.value === 'position' ? (
						<div className='flex items-center justify-center w-full'>
							<p
								className={`w-6 h-6 flex items-center justify-center rounded ${
									option.value === 'position' &&
									positions.find((pos) => pos.label === player.position)?.color
								}`}
							>
								{player[option.value]}
							</p>
						</div>
					) : editableOptions.includes(option.value) ? (
						<EditableCell option={option.value} player={player} />
					) : option.value === 'name' && isAdding ? (
						<span className='flex gap-2 items-center'>
							{managePlayerButton} {player[option.value]}
						</span>
					) : (
						player[option.value]
					)}
				</td>
			))}
		</tr>
	);
}

export default Player;
