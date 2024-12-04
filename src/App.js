import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UsersContext } from './context/UsersProvider';
import StocksProvider from './context/StocksProvider';
import PortfoliosProvider from './context/PortfoliosProvider';
import LeaguesProvider from './context/LeaguesProvider';
import Home from './views/Home';
import Portfolios from './views/Portfolios';
import Login from './views/Login';
import Settings from './views/Settings';
import Leagues from './views/Leagues';
import LeagueDetails from './views/LeagueDetails'; // Added LeagueDetails view
import CreateLeague from './views/CreateLeague'; // Added CreateLeague view
import LoadingScreen from './components/LoadingScreen';

function App() {
	const { isLoading, isLoggedIn } = useContext(UsersContext);
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			console.log('Login state changed:', isLoggedIn);
		} else {
			isMounted.current = true;
		}
	}, [isLoggedIn]);

	return (
		<StocksProvider>
			<PortfoliosProvider>
				<LeaguesProvider>
					<ToastContainer
						position="top-right"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						draggable
						theme="colored"
					/>

					<div className="bg-slate-700 min-h-screen w-full">
						{isLoading ? (
							<LoadingScreen />
						) : (
							<Routes>
								<Route index element={<Home />} />
								<Route path="/login" element={<Login key="login" type="login" />} />
								<Route path="/signup" element={<Login key="signUp" type="signUp" />} />
								<Route
									path="/portfolios"
									element={isLoggedIn ? <Portfolios /> : <Navigate to="/login" />}
								/>
								<Route
									path="/leagues"
									element={isLoggedIn ? <Leagues /> : <Navigate to="/login" />}
								/>
								<Route
									path="/leagues/create"
									element={isLoggedIn ? <CreateLeague /> : <Navigate to="/login" />}
								/>
								<Route
									path="/leagues/:id"
									element={isLoggedIn ? <LeagueDetails /> : <Navigate to="/login" />}
								/>
								<Route
									path="/settings"
									element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
								/>
							</Routes>
						)}
					</div>
				</LeaguesProvider>
			</PortfoliosProvider>
		</StocksProvider>
	);
}

export default App;
