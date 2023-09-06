import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userSettings, setUserSettings] = useState({
		budget: 500,
		players: 10,
	});

	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const authenticate = async () => {
			setIsLoading(true);
			try {
				const respObj = await axios.get(
					'http://localhost:8080/api/users/login',
					{ withCredentials: true }
				);
				const { budget, players } = respObj.data.data;
				setUserSettings({ budget, players });
				setIsLoggedIn(true);
			} catch (err) {
				if (err.response.status === 401) setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		};
		authenticate();
	}, [isLoggedIn]);

	const updateSetting = async (setting, value) => {
		console.log({ setting }, { value });
		await toast.promise(
			axios.patch(
				'http://localhost:8080/api/users/',
				{ [setting]: Number(value) },
				{ withCredentials: true }
			),
			{
				pending: 'Aggiornamento in corso',
				success: 'Aggiornamento eseguito!',
				error: 'Qualcosa è andato storto',
			}
		);
		setUserSettings((prev) => ({ ...prev, [setting]: value }));
	};
	return (
		<UsersContext.Provider
			value={{
				isLoading,
				setIsLoading,
				isLoggedIn,
				setIsLoggedIn,
				userSettings,
				updateSetting,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};

export default UsersProvider;
