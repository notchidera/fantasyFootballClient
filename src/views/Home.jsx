import { useContext, useState } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { PlayersContext } from '../context/PlayersProvider';
import { UsersContext } from '../context/UsersProvider';
import { Navigate } from 'react-router-dom';

import Table from '../components/table/Table';
import UploadForm from '../components/UploadForm';
import RoundedButton from '../components/buttons/RoundedButton';
import LoadingScreen from '../components/LoadingScreen';
import NewTeamView from '../components/NewTeamView';
import Filter from '../components/Filter';
import { show, hide } from '../icons/icons';
import NavigationFooter from '../components/NavigationFooter';

function Home() {
	const { setIsAdding, isAdding, setCurrentTeam, inSettings } =
		useContext(TeamsContext);
	const { filtered, isLoading, players } = useContext(PlayersContext);
	const { isLoggedIn } = useContext(UsersContext);
	const [isTeamBuilderOpen, setIsTeamBuilderOpen] = useState(false);
	console.log(isTeamBuilderOpen);

	const saveAndClose = () => {
		setIsAdding(false);
		setIsTeamBuilderOpen(true);
		setCurrentTeam({ name: '', players: [] });
	};

	return (
		<div>
			{/* IF THE USER ISN'T LOGGED IN, IT REDIRECTS TO THE LOGIN PAGE */}
			{!isLoggedIn && <Navigate to='/login' replace={true} />}
			{
				// CHECK IF A LIST OF PLAYERS EXISTS OR, IF FILTERS ARE APPLIED, TO
				//RENDER HOME SCREEN. OTHERWISE RENDERS FILE UPLOAD COMPONENT. IF STILL LOADING, SHOWS THE LOADING COMPONENT
			}
			{players.length > 0 || filtered === true ? (
				<div className='relative w-full flex flex-col  items-center justify-center text-slate-700'>
					<Filter />
					{isAdding && isTeamBuilderOpen && (
						<NewTeamView
							setIsTeamBuilderOpen={setIsTeamBuilderOpen}
							saveAndClose={saveAndClose}
						/>
					)}
					{isLoading ? <LoadingScreen /> : <Table isAdding={isAdding} />}
				</div>
			) : (
				<div className='w-full h-screen flex items-center justify-center'>
					{isLoading ? (
						<LoadingScreen />
					) : (
						<div className='w-96 bg-slate-100 rounded p-10 text-center'>
							<h2 className='text-lg'>
								Benvenuto! Per iniziare occorre caricare una lista di giocatori
							</h2>
							<UploadForm />
						</div>
					)}
				</div>
			)}
			<NavigationFooter>
				{!isAdding && !inSettings && (
					<RoundedButton
						color='green'
						data-cy='add'
						onClick={() => {
							setIsAdding(true);
							setIsTeamBuilderOpen(true);
						}}
						size={'lg'}
					/>
				)}
				{isAdding && (
					<RoundedButton
						onClick={() => setIsTeamBuilderOpen((prev) => !prev)}
						data-cy='hideShow'
						color={isTeamBuilderOpen ? 'red' : 'green'}
						size={'lg'}
						icon={isTeamBuilderOpen ? hide : show}
					/>
				)}
			</NavigationFooter>
		</div>
	);
}

export default Home;
