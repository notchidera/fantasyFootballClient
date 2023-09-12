import { useContext } from 'react';

import { UsersContext } from '../context/UsersProvider';
import { PlayersContext } from '../context/PlayersProvider';
import { PieChart } from 'react-minimal-pie-chart';

///SHOWS A PIECHART WITH THE TEAM DATA

function Chart({ expenses, totalExpenses }) {
	const {
		userSettings: { budget },
	} = useContext(UsersContext);
	const { positions } = useContext(PlayersContext);

	const data = [
		...positions.map((pos) => ({
			title: pos.label,
			value: expenses[pos.label],
			color: pos.hex,
		})),
		{
			title: 'Budget residuo',
			value: budget - totalExpenses,
			color: 'lightgray',
		},
	];
	return (
		<PieChart
			lineWidth={15}
			paddingAngle={5}
			label={({ dataEntry }) =>
				dataEntry.value > 0 &&
				Math.round((dataEntry.value / budget) * 100) + '%'
			}
			labelStyle={(index) => ({
				fill: data[index].color,
				fontSize: '8px',
				fontFamily: 'sans-serif',
			})}
			labelPosition={60}
			data={data}
		/>
	);
}

export default Chart;
