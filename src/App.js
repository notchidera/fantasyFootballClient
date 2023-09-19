import { Routes, Route } from 'react-router-dom';
import { useEffect, useContext, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UsersContext } from './context/UsersProvider';
import PlayersProvider from './context/PlayersProvider';
import TeamsProvider from './context/TeamsProvider';
import Home from './views/Home';
import Teams from './views/Teams';
import Login from './views/Login';
import Settings from './views/Settings';
import LoadingScreen from './components/LoadingScreen';

function App() {
	const { isLoading, isLoggedIn } = useContext(UsersContext);
	const isMounted = useRef(false);
	useEffect(() => {
		if (isMounted.current) {
		} else isMounted.current = true;
	}, [isLoggedIn]);

	return (
		<PlayersProvider>
			<TeamsProvider>
				<ToastContainer
					position='top-right'
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable
					theme='colored'
				/>

				<div className=' bg-slate-700 min-h-screen w-full'>
					{isLoading ? (
						<LoadingScreen />
					) : (
						<Routes>
							<Route index element={<Home />} />
							<Route
								path='/login'
								element={<Login key='login' type='login' />}
							/>
							<Route
								path='/signup'
								element={<Login key='signUp' type='signUp' />}
							/>
							<Route path='/teams' element={<Teams />} />
							<Route path='/settings' element={<Settings />} />
						</Routes>
					)}
				</div>
			</TeamsProvider>
		</PlayersProvider>
	);
}

export default App;
