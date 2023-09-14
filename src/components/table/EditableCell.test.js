import { render, screen } from '@testing-library/react';

import { PlayersContext } from '../../context/PlayersProvider';
import { TeamsContext } from '../../context/TeamsProvider';
import { players, currentTeamEmpty } from '../../utils/mockedData';
import { UsersContext } from '../../context/UsersProvider';
import EditableCell from './EditableCell';

/// OPTIONS THAT CAN BE EDITED BY THE USER
const editableOptions = ['pricePrevYear', 'pricePrediction', 'maxBidPrice'];

/// AVAILABLE VALUES FOR THE POSITION OPTION - IT ALSO INCLUDES SOME STYLING INFO

describe('EditableCell component', () => {
	test('testing render of editable cell component', () => {
		render(
			<UsersContext.Provider value={{ userSettings: { budget: 500 } }}>
				<PlayersContext.Provider value={{ editableOptions }}>
					<TeamsContext.Provider
						value={{ isAdding: false, currentTeam: currentTeamEmpty }}
					>
						<EditableCell player={players[0]} option={editableOptions[0]} />
					</TeamsContext.Provider>
				</PlayersContext.Provider>
			</UsersContext.Provider>
		);
		const cell = screen.getByRole('cell');
		expect(cell).toBeInTheDocument();
	});
});
