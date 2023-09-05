import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [budget, setBudget] = useState(500);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const authenticate = async () => {
			setIsLoading(true);
			try {
				const respObj = await axios.get(
					'http://localhost:8080/api/users/login',
					{ withCredentials: true }
				);
				setBudget(respObj.data.data.budget);
				setIsLoggedIn(true);
			} catch (err) {
				if (err.response.status === 401) setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		};
		authenticate();
	}, [isLoggedIn]);

	const updateBudget = async (budget) => {
		await toast.promise(
			axios.patch(
				'http://localhost:8080/api/users/',
				{ budget },
				{ withCredentials: true }
			),
			{
				pending: 'Aggiornamento in corso',
				success: 'Budget aggiornato!',
				error: 'Qualcosa è andato storto',
			}
		);
	};
	return (
		<UsersContext.Provider
			value={{
				isLoading,
				setIsLoading,
				isLoggedIn,
				setIsLoggedIn,
				budget,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};

export default UsersProvider;
