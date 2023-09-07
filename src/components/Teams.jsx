import { useContext, useState } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { UsersContext } from '../context/UsersProvider';
import { Link, Navigate } from 'react-router-dom';
import RoundedButton from './RoundedButton';
import NavigationFooter from './NavigationFooter';
import { home, close, edit, settings } from '../icons/icons';
import TeamView from './TeamView';
import Accordion from './Accordion';

function Teams() {
	const { allTeams, deleteTeam, editTeam } = useContext(TeamsContext);
	const { isLoggedIn } = useContext(UsersContext);
	const items = allTeams.map((team) => ({
		id: team._id,
		title: <div>{team.name}</div>,
		content: (
			<div
				key={team._id}
				className='overflow-scroll w-full relative p-1 bg-slate-100 md:px-4 md:py-8  rounded flex flex-col gap-4'
			>
				<div className='absolute right-1 top-1 flex gap-2'>
					<Link onClick={() => editTeam(team)} to='/'>
						<RoundedButton icon={edit} />
					</Link>
					<RoundedButton
						onClick={() => deleteTeam(team._id)}
						icon={close}
						color='red'
					/>
				</div>
				<TeamView team={team} />
			</div>
		),
	}));

	return (
		<div className='gap-10 flex min-h-screen items-start justify-center w-full lg:p-20 xl:p-32 p-3 '>
			{!isLoggedIn && <Navigate to='/login' replace={true} />}
			<div className='lg:w-2/3 w-full'>
				{allTeams.length > 0 && <Accordion items={items} />}
			</div>
			<NavigationFooter />
		</div>
	);
}

export default Teams;
