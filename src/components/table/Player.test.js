import { render, screen } from '@testing-library/react';

import { PlayersContext } from '../../context/PlayersProvider';
import { TeamsContext } from '../../context/TeamsProvider';
import { players, currentTeamEmpty } from '../../utils/mockedData';
import Player from './Player';
import { UsersContext } from '../../context/UsersProvider';

const options = [
	{ value: 'name', label: 'Nome' },
	{ value: 'position', label: 'Ruolo' },
	{ value: 'team', label: 'Squadra' },
	{ value: 'slot', label: 'Slot' },
	{ value: 'pricePrediction', label: 'Prezzo previsto' },
	{ value: 'pricePrevYear', label: 'Prezzo anno precedente' },
	{ value: 'maxBidPrice', label: 'Prezzo massimo' },
	{ value: 'initialQuote', label: 'Valutazione iniziale' },
	{ value: 'currentQuote', label: 'Valutazione attuale' },
	{ value: 'value', label: 'Valore di mercato' },
];
/// OPTIONS THAT CAN BE EDITED BY THE USER
const editableOptions = ['pricePrevYear', 'pricePrediction', 'maxBidPrice'];

/// AVAILABLE VALUES FOR THE POSITION OPTION - IT ALSO INCLUDES SOME STYLING INFO
const positions = [
	{ label: 'A', color: 'bg-red-400', active: 'bg-red-700', hex: '#fca5a5' },
	{
		label: 'C',
		color: 'bg-blue-400',
		active: 'bg-blue-700',
		hex: '#3b82f6',
	},
	{
		label: 'D',
		color: 'bg-green-400',
		active: 'bg-green-700',
		hex: '#22c55e',
	},
	{
		label: 'P',
		color: 'bg-amber-400',
		active: 'bg-amber-700',
		hex: '#fcd34d',
	},
];

describe('Player component', () => {
	test('testing render of player component', () => {
		render(
			<UsersContext.Provider value={{ userSettings: { budget: 500 } }}>
				<PlayersContext.Provider
					value={{ options, positions, editableOptions }}
				>
					<TeamsContext.Provider
						value={{ isAdding: false, currentTeam: currentTeamEmpty }}
					>
						<table>
							<tbody>
								<Player player={players[0]} />
							</tbody>
						</table>
					</TeamsContext.Provider>
				</PlayersContext.Provider>
			</UsersContext.Provider>
		);
		const cell = screen.getAllByRole('cell');
		const playerName = screen.getByText(players[0].name);
		expect(cell[0]).toBeInTheDocument();
		expect(playerName).toBeInTheDocument();
	});
});
