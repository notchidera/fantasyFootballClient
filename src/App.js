import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useContext, useRef } from 'react';
import Home from './components/Home';
import { UsersContext } from './context/UsersProvider';
import PlayersProvider from './context/PlayersProvider';
import TeamsProvider from './context/TeamsProvider';
import Teams from './components/Teams';
import Login from './components/Login';
import LoadingScreen from './components/LoadingScreen';
import Settings from './components/Settings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isLoading, isLoggedIn } = useContext(UsersContext);

	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			if (isLoggedIn) {
				navigate(
					location.pathname === '/login' || location.pathname === '/signup'
						? '/'
						: -1
				);
			} else {
				navigate('/login');
			}
		} else isMounted.current = true;
	}, [isLoggedIn]);

	return (
		<PlayersProvider>
			<TeamsProvider>
				<ToastContainer
					position='top-center'
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable
					pauseOnHover
					theme='light'
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
