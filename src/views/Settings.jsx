import { useContext } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiCall from '../utils/api';

import UploadForm from '../components/UploadForm';
import NavigationFooter from '../components/NavigationFooter';
import Setting from '../components/Setting';
import Accordion from '../components/accordion/Accordion';

function Settings() {
	const { isLoggedIn, setIsLoggedIn, userSettings } = useContext(UsersContext);

	/// SENDS A REQUEST TO THE SERVER, UPDATING THE JWT TOKEN WITH AN INVALID ONE, THEN REDIRECT THE USER TO THE HOMEPAGE

	const logoutHandler = async () => {
		console.log('logout');
		try {
			await toast.promise(apiCall('get', '/api/users/logout'), {
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
	/// LIST OF OPTIONS TO SHOW IN THE SETTINGS PAGE
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
	///RENDERS THE ACCORDION COMPONENT PASSING THE ITEMS ARRAY
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
