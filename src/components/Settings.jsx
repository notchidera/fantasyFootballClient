import { useContext, useState } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiCall from '../api';

import UploadForm from './UploadForm';
import NavigationFooter from './NavigationFooter';
import RoundedButton from './RoundedButton';
import Setting from './Setting';
import { home, list } from '../icons/icons';
import Accordion from './Accordion';

function Settings() {
	const { isLoggedIn, setIsLoggedIn, userSettings } = useContext(UsersContext);

	const logoutHandler = async () => {
		console.log('logout');
		try {
			const respObj = await toast.promise(apiCall('get', '/api/users/logout'), {
				pending: 'Logout in corso',
				success: `Logout effettuato con successo!`,
				error: {
					render({ data }) {
						return;
					},
				},
			});
			setIsLoggedIn(false);
			window.location.replace('/');
		} catch (err) {
			alert(err.message);
		}
	};

	const items = [
		{
			title: 'Modifica budget',
			id: 'budget',
			content: <Setting setting={'budget'} value={userSettings.budget} />,
		},
		{
			title: 'Modifica numero giocatori',
			id: 'Giocatori',
			content: <Setting setting={'players'} value={userSettings.players} />,
		},
		{ title: 'Aggiorna lista', id: 'update', content: <UploadForm /> },
		{
			title: 'Logout',
			id: 'logout',
			content: (
				<button
					onClick={logoutHandler}
					className='font-semibold text-md text-blue-600 hover:text-blue-800 hover:underline'
				>
					Esegui logout
				</button>
			),
		},
	];
	return (
		<div className='w-full h-screen flex items-center justify-center gap-2 flex-col text-slate-700'>
			{!isLoggedIn && <Navigate to='/login' replace={true} />}
			<div className='p-10 w-96  bg-slate-100 rounded flex items-center flex-col justify-center gap-10'>
				<Accordion items={items} />
			</div>
			<NavigationFooter />
		</div>
	);
}

export default Settings;
