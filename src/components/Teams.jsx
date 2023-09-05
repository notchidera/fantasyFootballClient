import { useContext, useState } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { Link } from 'react-router-dom';
import RoundedButton from './RoundedButton';
import { home, close, edit } from '../icons/icons';
import TeamView from './TeamView';

function Teams() {
	const { allTeams, deleteTeam, editTeam } = useContext(TeamsContext);
	console.log(allTeams);

	return (
		<div className='flex gap-10 flex-col lg:flex-row flex-wrap justify-around items-start md:p-10 '>
			{allTeams.length > 0 &&
				allTeams.map((team) => (
					<div
						key={team._id}
						className=' overflow-scroll w-full md:w-1/3 relative p-1   bg-slate-100 md:px-4 md:py-8 text-sm rounded shadow flex flex-col gap-4'
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
				))}
			<div className='fixed flex flex-col gap-4 top-1 left-1 md:top-auto md:left-auto md:bottom-6 md:right-6'>
				<Link to='/'>
					<RoundedButton icon={home} size='lg' color='light' />
				</Link>
			</div>
		</div>
	);
}

export default Teams;
