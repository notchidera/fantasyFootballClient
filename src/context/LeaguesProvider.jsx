import React, { createContext, useState, useEffect } from 'react';
import apiCall from '../utils/api';

export const LeaguesContext = createContext();

const LeaguesProvider = ({ children }) => {
	const [leagues, setLeagues] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch leagues from the backend
	const fetchLeagues = async () => {
		setIsLoading(true);
		try {
			const { data } = await apiCall('get', '/api/leagues');
			setLeagues(data);
		} catch (error) {
			setError('Failed to fetch leagues. Please try again later.');
			console.error('Error fetching leagues:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch leagues on mount
	useEffect(() => {
		fetchLeagues();
	}, []);

	return (
		<LeaguesContext.Provider value={{ leagues, isLoading, error, fetchLeagues }}>
			{children}
		</LeaguesContext.Provider>
	);
};

export default LeaguesProvider;
