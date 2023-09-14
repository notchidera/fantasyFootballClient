import { useContext } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { UsersContext } from '../context/UsersProvider';
import { Link, Navigate } from 'react-router-dom';
import RoundedButton from '../components/buttons/RoundedButton';
import NavigationFooter from '../components/NavigationFooter';
import { close, edit, users } from '../icons/icons';
import TeamView from '../components/TeamView';
import Accordion from '../components/accordion/Accordion';

function Teams() {
	const { allTeams, deleteTeam, editTeam } = useContext(TeamsContext);
	const { isLoggedIn } = useContext(UsersContext);

	const deleteHandler = (team) => {
		if (window.confirm('Confermi di voler rimuovere il team?'))
			deleteTeam(team);
	};
	///CREATES AN ITEM ARRAY WITH OBJECTS CONTAINING TEAM INFORMATION, DELETE AND EDIT BUTTONS, TEAMVIEW COMPONENT. THIS ARRAY IS THEN PASSED TO THE ACCORDION COMPONENT
	const items = allTeams.map((team) => ({
		id: team._id,
		title: (
			<div className='flex w-full justify-between'>
				<p className='text-lg font-semibold'>{team.name}</p>
				<p className='flex gap-2 items-center mr-10'>
					{' '}
					{team.players.length} {users}
				</p>
			</div>
		),
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
						onClick={() => deleteHandler(team)}
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
			<div className='xl:w-3/4 2xl:w-2/3 w-full mb-20 lg:mb-0'>
				{allTeams.length > 0 && <Accordion items={items} />}
			</div>
			<NavigationFooter />
		</div>
	);
}

export default Teams;
