import { useContext, useState } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { Link } from 'react-router-dom';

import axios from 'axios';

import UploadForm from './UploadForm';
import RoundedButton from './RoundedButton';
import { home } from '../icons/icons';

function Settings() {
	const { setIsLoggedIn, budget, updateBudget } = useContext(UsersContext);
	const [val, setVal] = useState(budget);

	const logoutHandler = async () => {
		console.log('logout');
		try {
			const respObj = await axios.get(
				'http://localhost:8080/api/users/logout',
				{ withCredentials: true }
			);
			setIsLoggedIn(false);
		} catch (err) {
			alert(err.message);
		}
		const blurHandler = () => {};
	};
	return (
		<div className='w-full h-screen flex items-center justify-center gap-2 flex-col text-slate-700'>
			<div className='p-10 bg-slate-100 rounded flex items-center flex-col justify-center gap-10'>
				<button
					onClick={logoutHandler}
					className='font-semibold text-lg text-blue-600 hover:text-blue-800 hover:underline'
				>
					Logout
				</button>
				<div className='flex gap-4'>
					<label>Budget</label>
					<input
						value={val}
						onChange={(e) => setVal(e.target.value)}
						className='bg-slate-100 text-slate-700 outline-none'
						type='number'
					/>
				</div>
				<div>
					<h2 className='text-center text-lg font-semibold'>
						Aggiorna lista calciatori
					</h2>
					<UploadForm />
				</div>
			</div>
			<div className='fixed flex flex-col gap-4 top-1 left-1 md:top-auto md:left-auto md:bottom-6 md:right-6'>
				<Link to='/'>
					<RoundedButton icon={home} size='lg' color='light' />
				</Link>
			</div>
		</div>
	);
}

export default Settings;
