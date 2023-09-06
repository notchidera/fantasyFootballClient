import { useContext, useState } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { Link } from 'react-router-dom';
import RoundedButton from './RoundedButton';
import { home, close, edit } from '../icons/icons';
import TeamView from './TeamView';
import Accordion from './Accordion';

function Teams() {
	const { allTeams, deleteTeam, editTeam } = useContext(TeamsContext);
	console.log(allTeams);
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
		<div className='gap-10 flex items-center justify-center w-full lg:p-10 p-3 '>
			<div className='lg:w-2/3 w-full'>
				{allTeams.length > 0 && <Accordion items={items} />}
				<div className='fixed flex flex-col gap-4 top-1 left-1 md:top-auto md:left-auto md:bottom-6 md:right-6'>
					<Link to='/'>
						<RoundedButton icon={home} size='lg' color='light' />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Teams;
