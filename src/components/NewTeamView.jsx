import { useContext } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import TeamView from './TeamView';
import Button from './Button';

function NewTeamView({ saveAndClose }) {
	const { currentTeam, saveTeam } = useContext(TeamsContext);

	const saveTeamHandler = () => {
		if (!currentTeam.name.trim()) {
			alert('Please insert a team name');
			return;
		}
		if (currentTeam._id) {
			saveTeam(currentTeam._id);
		} else saveTeam();
	};

	const saveAndCloseHandler = () => {
		saveTeamHandler();
		saveAndClose();
	};
	return (
		<div
			className={`w-full z-20 md:w-1/2 2xl:w-1/3 3xl:w-1/4 overflow-scroll md:fixed right-0 md:top-40 bg-slate-100 p-2 text-sm rounded shadow flex flex-col gap-4`}
		>
			<TeamView isEditing={true} team={currentTeam} />

			<div className='flex justify-center gap-10'>
				<Button onClick={saveTeamHandler} color='green' content='Save' />
				<Button
					onClick={() => saveAndCloseHandler()}
					content='Save and close'
				/>
			</div>
		</div>
	);
}

export default NewTeamView;
