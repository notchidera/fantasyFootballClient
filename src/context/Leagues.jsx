import React, { useContext } from 'react';
import { LeaguesContext } from '../context/LeaguesProvider';
import Accordion from '../components/accordion/Accordion';
import LoadingScreen from '../components/LoadingScreen';

const Leagues = () => {
	const { leagues, isLoading, error } = useContext(LeaguesContext);

	// Map leagues to accordion items
	const leagueItems = leagues.map((league) => ({
		id: league.id,
		title: league.name,
		content: (
			<div>
				<p>Prize Pool: ${league.prize}</p>
				<p>Total Players: {league.totalPlayers}</p>
				<a
					href={`/leagues/${league.id}`}
					className="text-blue-400 hover:underline"
				>
					View Details
				</a>
			</div>
		),
	}));

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold text-white mb-4">Leagues</h1>

			{isLoading && <LoadingScreen />}
			{error && <p className="text-red-500">{error}</p>}

			{!isLoading && !error && (
				<Accordion items={leagueItems} />
			)}

			{!isLoading && leagues.length === 0 && !error && (
				<p className="text-white">
					No active leagues available.{' '}
					<a href="/leagues/create" className="text-blue-400 hover:underline">
						Create one!
					</a>
				</p>
			)}
		</div>
	);
};

export default Leagues;
