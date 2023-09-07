import { useContext, useState } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { PlayersContext } from '../context/PlayersProvider';
import { UsersContext } from '../context/UsersProvider';
import { Link, Navigate } from 'react-router-dom';

import Table from './Table';
import UploadForm from './UploadForm';
import RoundedButton from './RoundedButton';
import LoadingScreen from './LoadingScreen';
import NewTeamView from './NewTeamView';
import Filter from './Filter';
import { settings, home, openModal, list } from '../icons/icons';

function Home() {
	const { setIsAdding, isAdding, setCurrentTeam, inSettings } =
		useContext(TeamsContext);
	const { filtered, isLoading, players } = useContext(PlayersContext);
	const { isLoggedIn } = useContext(UsersContext);
	//if (!isLoggedIn) window.location.replace('/login');

	const [isTeamBuilderOpen, setIsTeamBuilderOpen] = useState(true);

	const saveAndClose = () => {
		setIsAdding(false);
		setIsTeamBuilderOpen(true);
		setCurrentTeam({});
	};

	return (
		<div>
			{!isLoggedIn && <Navigate to='/login' replace={true} />}
			{
				// CHECK IF A LIST OF PLAYERS EXISTS OR, IF FILTERS ARE APPLIED, TO
				//RENDER HOME SCREEN. OTHERWISE RENDERS FILE UPLOAD COMPONENT
			}
			{players.length > 0 || filtered === true ? (
				<div className='relative w-screen flex flex-col md:flex-row items-center justify-center text-slate-700'>
					<Filter key={filtered} />
					{isAdding && isTeamBuilderOpen && (
						<NewTeamView saveAndClose={saveAndClose} />
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
			<div className='fixed flex flex-col gap-4 top-1 left-1 md:top-auto md:left-auto md:bottom-6 md:right-6'>
				{!isAdding && !inSettings && (
					<RoundedButton
						color='green'
						onClick={() => setIsAdding(true)}
						size={'lg'}
					/>
				)}
				{isAdding && (
					<RoundedButton
						onClick={() => setIsTeamBuilderOpen((prev) => !prev)}
						color='green'
						size={'lg'}
						icon={openModal}
					/>
				)}
				<Link to='/teams'>
					<RoundedButton icon={list} size='lg' color='light' />
				</Link>
				<Link to='/settings'>
					<RoundedButton icon={settings} size='lg' color='light' />
				</Link>
			</div>
		</div>
	);
}

export default Home;
