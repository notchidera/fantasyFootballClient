import { useContext } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import RoundedButton from './RoundedButton';
import TeamView from './TeamView';
import Button from './Button';
import { hide } from '../icons/icons';

function NewTeamView({ saveAndClose, setIsTeamBuilderOpen }) {
	const { currentTeam, saveTeam } = useContext(TeamsContext);

	const saveTeamHandler = (reset) => {
		if (!currentTeam.name.trim()) {
			alert('Please insert a team name');
			return;
		}
		if (currentTeam._id) {
			saveTeam(currentTeam._id, reset);
		} else saveTeam(null, false);
	};

	const saveAndCloseHandler = () => {
		saveTeamHandler(true);
		saveAndClose();
	};
	return (
		<div
			className={`w-full z-20 md:w-2/3 2xl:w-1/3 3xl:w-1/4 overflow-scroll fixed inset-0 md:right-0 md:left-auto md:bottom-auto md:top-1/4 bg-slate-100 p-2 text-sm md:rounded shadow flex flex-col gap-4`}
		>
			<TeamView isEditing={true} team={currentTeam} />

			<div className='flex justify-center gap-10 mb-20'>
				<Button onClick={saveTeamHandler} color='green' content='Save' />
				<Button
					onClick={() => saveAndCloseHandler()}
					content='Save and close'
				/>
			</div>
			<div className='bg-slate-700 md:bg-slate-100 fixed md:absolute bottom-0 w-full left-0 p-2 flex items-center justify-center'>
				{window.innerWidth < 640 ? (
					<RoundedButton
						onClick={() => setIsTeamBuilderOpen(false)}
						icon={hide}
						color='light'
						size='lg'
					/>
				) : (
					<RoundedButton
						onClick={() => setIsTeamBuilderOpen(false)}
						icon={hide}
						color='red'
						size='lg'
					/>
				)}
			</div>
		</div>
	);
}

export default NewTeamView;
