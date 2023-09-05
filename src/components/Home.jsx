import { useContext, useState } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { PlayersContext } from '../context/PlayersProvider';
import { Link } from 'react-router-dom';

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

	const [isTeamBuilderOpen, setIsTeamBuilderOpen] = useState(true);

	const saveAndClose = () => {
		setIsAdding(false);
		setIsTeamBuilderOpen(true);
		setCurrentTeam({});
	};

	return (
		<div>
			{players.length > 0 ? (
				<div className='relative w-screen flex items-center justify-center '>
					<Filter key={filtered} />
					{isAdding && isTeamBuilderOpen && (
						<NewTeamView saveAndClose={saveAndClose} />
					)}
					{isLoading ? <LoadingScreen /> : <Table isAdding={isAdding} />}
				</div>
			) : (
				<div className='w-full h-screen flex items-center justify-center'>
					{isLoading ? <LoadingScreen /> : <UploadForm />}
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
