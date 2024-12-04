import React, { useContext, useEffect } from 'react';
import { LeaguesContext } from '../context/LeaguesProvider';
import { useParams } from 'react-router-dom';
import Table from '../components/table/Table';
import { toast } from 'react-toastify';

const LeagueView = () => {
	const { id } = useParams();
	const { activeLeague, fetchLeagueDetails } = useContext(LeaguesContext);

	useEffect(() => {
		try {
			fetchLeagueDetails(id);
		} catch (error) {
			toast.error('Failed to fetch league details.');
		}
	}, [id]);

	if (!activeLeague) return <p>Loading league details...</p>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold text-white mb-4">{activeLeague.name}</h1>
			<p className="text-white mb-4">Prize Pool: ${activeLeague.prize}</p>
			<p className="text-white mb-4">Scoring Rule: {activeLeague.scoringRule}</p>

			<h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>
			<Table
				data={activeLeague.participants}
				columns={[
					{ key: 'name', label: 'Player Name' },
					{ key: 'score', label: 'Score' },
					{ key: 'rank', label: 'Rank' },
				]}
			/>
		</div>
	);
};

export default LeagueView;
