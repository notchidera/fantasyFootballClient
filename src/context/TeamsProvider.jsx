import { createContext, useState, useContext, useEffect } from 'react';
import { UsersContext } from './UsersProvider';
import { toast } from 'react-toastify';
import apiCall from '../utils/api';

export const TeamsContext = createContext();

const TeamsProvider = ({ children }) => {
	/// A FLAG THAT TELLS IF THE USER IS CURRENTLY ADDING PLAYERS TO A TEAM OR EDITING A TEAM
	const [isAdding, setIsAdding] = useState(false);
	const { isLoggedIn, userSettings } = useContext(UsersContext);
	/// STATE VARIABLE THAT HOLDS ALL THE TEAMS BELONGING TO A USER
	const [allTeams, setAllTeams] = useState([]);
	/// KEEPS TRACK OF THE TEAM THAT THE USER IS CURRENTLY EDITING
	const [currentTeam, setCurrentTeam] = useState({
		name: '',
		players: [],
	});
	/// GETS ALL THE TEAMS AND ASSIGNS A VALUE TO THE STATE VARIABLE
	useEffect(() => {
		const getAllTeams = async () => {
			const respObj = await apiCall('get', '/api/teams');

			setAllTeams(
				respObj.data.data.map((team) => ({
					...team,
					players: team.players.map((player) => ({
						...player,
						pricePrediction: Math.round(
							player.pricePrediction * userSettings.budget
						),
					})),
				}))
			);
		};

		try {
			if (isLoggedIn) getAllTeams();
		} catch (err) {
			console.log(err);
		}
	}, [isLoggedIn, userSettings.budget]);
	///CREATES A NEW TEAM OBJECT WITH THE PLAYERS SPLIT BY POSITION (EG: {name: 'teamName', players: {P: [player 1, player2], D: [player1, player2, ...]}})
	const splitPlayersByPosition = (team) => {
		let newTeam = { name: team.name, _id: team._id };
		team.players.forEach(
			(player) =>
				(newTeam[player.position] = newTeam[player.position]
					? [...newTeam[player.position], player]
					: (newTeam[player.position] = [player]))
		);
		return newTeam;
	};
	/// ADDS A PLAYER TO THE CURRENT TEAM
	const addPlayer = (player) => {
		setCurrentTeam((prev) => ({
			...prev,
			players: [...prev.players, player],
		}));
	};

	/// REMOVES A PLAYER FROM THE CURRENT TEAM
	const removePlayer = (player) => {
		setCurrentTeam((prev) => ({
			...prev,
			players: prev.players.filter((plyr) => plyr._id !== player._id),
		}));
		const toastContent = (
			<div className='flex justify-between'>
				{player.name} rimosso{' '}
				<button
					className='underline font-semibold'
					onClick={() => addPlayer(player)}
				>
					Annulla
				</button>
			</div>
		);
		toast.success(toastContent);
	};
	/// DELETES A TEAM
	const deleteTeam = async (team) => {
		const toastContent = (
			<div className='flex justify-between'>
				{team.name} rimosso{' '}
				<button
					className='underline font-semibold'
					onClick={async () => {
						await apiCall('post', '/api/teams/', team);
						setAllTeams(allTeams);
					}}
				>
					Annulla
				</button>
			</div>
		);
		await toast.promise(apiCall('delete', '/api/teams/' + team._id), {
			pending: 'Sto cancellando il team',
			success: {
				render() {
					return toastContent;
				},
			},
			error: 'Qualcosa è andato storto, riprovare',
		});

		setAllTeams((prev) => prev.filter((oldTeam) => team._id !== oldTeam._id));
	};
	/// SAVES THE CURRENT TEAM SENDING THE DATA TO THE SERVER
	const saveTeam = async (id, reset) => {
		if (id) {
			try {
				const respObj = await toast.promise(
					apiCall('patch', '/api/teams/' + currentTeam._id, currentTeam),
					{
						pending: 'Salvataggio in corso',
						success: 'Salvataggio riuscito!',
						error: 'Qualcosa è andato storto, riprovare',
					}
				);
				setAllTeams((prev) =>
					prev.map((team) =>
						team._id === currentTeam._id ? currentTeam : team
					)
				);
			} catch (err) {
				console.log(err);
				toast.error('Salvataggio non riuscito, riprovare');
			}
		} else {
			try {
				const respObj = await toast.promise(
					apiCall('post', '/api/teams/', currentTeam),
					{
						pending: 'Salvataggio in corso',
						success: 'Salvataggio riuscito!',
						error: 'Qualcosa è andato storto, riprovare',
					}
				);
				const newTeam = { ...currentTeam, _id: respObj.data.data._id };
				setAllTeams((prev) => [...prev, newTeam]);
				setCurrentTeam(
					!reset
						? newTeam
						: {
								name: '',
								players: [],
						  }
				);
			} catch (err) {
				console.log(err);
				toast.error('Salvataggio non riuscito, riprovare');
			}
		}
	};
	/// CHANGES THE CURRENT TEAM WHEN THE USER CLICKS ON THE EDIT BUTTON
	const editTeam = (team) => {
		setCurrentTeam(team);
		setIsAdding(true);
	};
	/// CALCULATES THE OVERALL EXPENSE FOR A CERTAIN POSITION IN A TEAM
	const sumPrice = (position, team) => {
		if (team[position]?.length < 1 || !team[position]) return 0;
		return team[position]?.reduce((acc, cur) => acc + cur?.pricePrediction, 0);
	};

	return (
		<TeamsContext.Provider
			value={{
				isAdding,
				setIsAdding,
				currentTeam,
				addPlayer,
				removePlayer,
				saveTeam,
				setCurrentTeam,
				sumPrice,
				allTeams,
				deleteTeam,
				editTeam,
				splitPlayersByPosition,
			}}
		>
			{children}
		</TeamsContext.Provider>
	);
};

export default TeamsProvider;
