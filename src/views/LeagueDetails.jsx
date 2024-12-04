import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiCall from '../utils/api';
import LoadingScreen from '../components/LoadingScreen';

const LeagueDetails = () => {
	const { id } = useParams();
	const [league, setLeague] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLeagueDetails = async () => {
			try {
				const { data } = await apiCall('get', `/api/leagues/${id}`);
				setLeague(data);
			} catch (err) {
				setError('Failed to fetch league details.');
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLeagueDetails();
	}, [id]);

	if (isLoading) return <LoadingScreen />;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold text-white mb-4">{league.name}</h1>
			<p className="text-white mb-2">Prize Pool: ${league.prize}</p>
			<p className="text-white mb-4">Participants: {league.totalPlayers}</p>
			<h2 className="text-xl font-bold text-white mb-4">Participants</h2>
			<ul className="text-white">
				{league.participants.map((participant) => (
					<li key={participant.id}>{participant.name} - Score: {participant.score}</li>
				))}
			</ul>
		</div>
	);
};

export default LeagueDetails;
