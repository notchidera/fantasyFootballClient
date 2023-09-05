import { createContext, useState, useContext, useEffect } from 'react';
import { PlayersContext } from './PlayersProvider';
import { UsersContext } from './UsersProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

export const TeamsContext = createContext();

const TeamsProvider = ({ children }) => {
	const [isAdding, setIsAdding] = useState(false);
	const [inSettings, setInSettings] = useState(false);
	const { allPlayers } = useContext(PlayersContext);
	const { isLoggedIn, budget } = useContext(UsersContext);
	const [allTeams, setAllTeams] = useState([]);
	const [currentTeam, setCurrentTeam] = useState({
		name: '',
		players: [],
	});

	useEffect(() => {
		const getAllTeams = async () => {
			const respObj = await axios.get('http://localhost:8080/api/teams', {
				withCredentials: true,
			});
			console.log(respObj);

			setAllTeams(
				respObj.data.data.map((team) => ({
					...team,
					players: team.players.map((player) => ({
						...player,
						pricePrediction: player.pricePrediction * budget,
					})),
				}))
			);
		};

		try {
			if (isLoggedIn) getAllTeams();
		} catch (err) {
			console.log(err);
		}
	}, [isLoggedIn]);

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

	const addPlayer = (player) => {
		setCurrentTeam((prev) => ({
			...prev,
			players: [...prev.players, player],
		}));
	};
	const removePlayer = (player) => {
		setCurrentTeam((prev) => ({
			...prev,
			players: prev.players.filter((plyr) => plyr._id !== player._id),
		}));
	};

	const deleteTeam = async (teamId) => {
		await toast.promise(
			axios.delete('http://localhost:8080/api/teams/' + teamId, {
				withCredentials: true,
			}),
			{
				pending: 'Sto cancellando il team',
				success: 'Team cancellato!',
				error: 'Qualcosa è andato storto, riprovare',
			}
		);
		setAllTeams((prev) => prev.filter((team) => team._id !== teamId));
	};

	const saveTeam = async (id) => {
		if (id) {
			try {
				const respObj = await toast.promise(
					axios.patch(
						'http://localhost:8080/api/teams/' + currentTeam._id,
						currentTeam,
						{ withCredentials: true }
					),
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
					axios.post('http://localhost:8080/api/teams/', currentTeam, {
						withCredentials: true,
					}),
					{
						pending: 'Salvataggio in corso',
						success: 'Salvataggio riuscito!',
						error: 'Qualcosa è andato storto, riprovare',
					}
				);
				const newTeam = { ...currentTeam, _id: respObj.data.data._id };
				setAllTeams((prev) => [...prev, newTeam]);
				setCurrentTeam(newTeam);
			} catch (err) {
				console.log(err);
				toast.error('Salvataggio non riuscito, riprovare');
			}
		}
	};

	const editTeam = (team) => {
		setCurrentTeam(team);
		setIsAdding(true);
	};

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
				inSettings,
				setInSettings,
				splitPlayersByPosition,
			}}
		>
			{children}
		</TeamsContext.Provider>
	);
};

export default TeamsProvider;
