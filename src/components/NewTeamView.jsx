import { useContext } from 'react';
import { TeamsContext } from '../context/TeamsProvider';
import { toast } from 'react-toastify';
import RoundedButton from './buttons/RoundedButton';
import TeamView from './TeamView';
import Button from './buttons/Button';
import { hide } from '../icons/icons';

///HANDLES THE NEW TEAM VIEW AFTER USER CLICKS ON ADD BUTTON

function NewTeamView({ saveAndClose, setIsTeamBuilderOpen }) {
	const { currentTeam, saveTeam } = useContext(TeamsContext);

	///CHECKS IF A TEAM NAME EXISTS, THEN SAVES THE TEAM PASSING THE ID IF THE TEAM ALREADY EXISTS AND A BOOLEAN (RESET) SET TO TRUE IF THE USER CLICKS ON THE SAVE AND CLOSE BUTTON (THIS WAY THE CURRENT TEAM IS CLEARED)
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
	///CHECKS IF THE SAVETEAMHANDLER FUNCTION RETURNS TRUE (IT RETURNS FALSE IF THE TEAM NAME HASN'T BEEN INSERTED BY THE USER), THEN RUNS THE SAVEANDCLOSE FUNCTION
	const saveAndCloseHandler = () => {
		if (saveTeamHandler(true)) saveAndClose();
	};
	return (
		<div
			className={`w-full z-20 lg:z-10 lg:w-7/12 2xl:w-1/3 3xl:w-1/4 overflow-scroll fixed inset-0 lg:right-0 lg:left-auto lg:bottom-auto lg:top-24 2xl:top-36  bg-slate-100 p-2 text-sm md:rounded shadow flex flex-col gap-4`}
		>
			{/* SHOWS THE TEAMVIEW PASSING ISEDITING PROP AND CURRENTTEAM. ISEDITING TELLS THE TEAMVIEW COMPONENT TO SHOW THE PROPER TEAMVIEW */}
			<TeamView isEditing={true} team={currentTeam} />

			<div className='flex justify-center gap-10 mb-32 lg:mb-16 '>
				<Button onClick={saveTeamHandler} color='green' content='Save' />
				<Button
					onClick={() => saveAndCloseHandler()}
					content='Save and close'
				/>
			</div>
			{/* CHANGES THE HIDE ICON BASED ON SCREEN SIZE */}
			<div className='bg-slate-700 lg:bg-slate-100 fixed lg:absolute bottom-0 w-full left-0 p-2 flex items-center justify-center  flex-col text-slate-100 gap-2 overflow-y'>
				<div className='lg:hidden'>
					Nascondi l'overview del tuo team per aggiungere nuovi giocatori
				</div>
				{window.innerWidth < 768 ? (
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
