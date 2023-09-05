import { useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import Player from './Player';
import UploadForm from './UploadForm';
import TableColumnHeader from './TableColumnHeader';

function Table() {
	const { players, options } = useContext(PlayersContext);

	return (
		<table className='overflow-x-scroll md:mt-40  bg-slate-700 text-slate-100'>
			<tbody>
				<tr>
					{options.map((option) => (
						<TableColumnHeader key={option.value} option={option} />
					))}
				</tr>
				{players.map((player) => (
					<Player key={player.Id} player={player} />
				))}
			</tbody>
		</table>
	);
}

export default Table;
