import { render, screen } from '@testing-library/react';
import Table from './Table';

import { PlayersContext } from '../../context/PlayersProvider';
import { TeamsContext } from '../../context/TeamsProvider';
import { UsersContext } from '../../context/UsersProvider';
import { players, currentTeamEmpty } from '../../utils/mockedData';

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

describe('Table component', () => {
	// jest.mock('axios');
	test('renders players in the table', async () => {
		// axios.get = jest.fn(() => ({ data: [{ name: 'Prova' }] }));
		render(
			<UsersContext.Provider value={{ userSettings: { budget: 500 } }}>
				<TeamsContext.Provider
					value={{
						isAdding: false,
						addPlayer: null,
						currentTeam: currentTeamEmpty,
						removePlayer: null,
					}}
				>
					<PlayersContext.Provider
						value={{
							players,
							options: [
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
							],
							editableOptions,
							positions,
						}}
					>
						<Table />
					</PlayersContext.Provider>
				</TeamsContext.Provider>
			</UsersContext.Provider>
		);

		const rows = screen.getAllByRole('row');
		const playerName = screen.getByText('Martinez', { exact: false });
		expect(rows[0]).toBeInTheDocument();
		expect(playerName).toBeInTheDocument();
	});
});
