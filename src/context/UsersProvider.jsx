import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import apiCall from '../utils/api';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
	///KEEPS TRACK OF THE LOGIN STATE
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	/// SAVES SOME USER SETTINGS
	const [userSettings, setUserSettings] = useState({
		budget: 500,
		players: 10,
	});
	const [isLoading, setIsLoading] = useState(false);
	/// ONMOUNT OR EVERYTIME THAT THE LOGIN STATE CHANGES, IT CHECKS IF THE USER HAS A VALID TOKEN
	useEffect(() => {
		const authenticate = async () => {
			setIsLoading(true);
			try {
				const respObj = await apiCall('get', '/api/users/login');

				const { budget, players } = respObj.data.data;
				setUserSettings({ budget, players });
				setIsLoggedIn(true);
			} catch (err) {
				console.log('here');
				//if (err.response.status === 401)
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		};
		authenticate();
	}, [isLoggedIn]);

	///UPDATES USER SETTINGS
	const updateSetting = async (setting, value) => {
		console.log({ setting }, { value });
		await toast.promise(
			apiCall('patch', '/api/users/', { [setting]: Number(value) }),
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
