import { useContext } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { toast } from 'react-toastify';
import RoundedButton from './RoundedButton';
import TeamView from './TeamView';
import Button from './Button';
import { hide } from '../icons/icons';

function NewTeamView({ saveAndClose, setIsTeamBuilderOpen }) {
	const { currentTeam, saveTeam } = useContext(TeamsContext);

	const saveTeamHandler = (reset) => {
		if (!currentTeam.name.trim()) {
			toast.error('Inserisci un nome per il tuo team prima di salvare!');
			return false;
		}
		if (currentTeam._id) {
			saveTeam(currentTeam._id, reset);
			return true;
		} else {
			saveTeam(null, false);
			return true;
		}
	};

	const saveAndCloseHandler = () => {
		if (saveTeamHandler(true)) saveAndClose();
	};
	return (
		<div
			className={`w-full z-20 lg:z-10 lg:w-7/12 2xl:w-1/3 3xl:w-1/4 overflow-scroll fixed inset-0 lg:right-0 lg:left-auto lg:bottom-auto lg:top-24 2xl:top-36  bg-slate-100 p-2 text-sm md:rounded shadow flex flex-col gap-4`}
		>
			<TeamView isEditing={true} team={currentTeam} />

			<div className='flex justify-center gap-10 mb-32 lg:mb-16 '>
				<Button onClick={saveTeamHandler} color='green' content='Save' />
				<Button
					onClick={() => saveAndCloseHandler()}
					content='Save and close'
				/>
			</div>

			<div className='bg-slate-700 lg:bg-slate-100 fixed lg:absolute bottom-0 w-full left-0 p-2 flex items-center justify-center  flex-col text-slate-100 gap-2 overflow-y'>
				<div className='lg:hidden'>
					Nascondi l'overview del tuo team per aggiungere nuovi giocatori
				</div>
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
