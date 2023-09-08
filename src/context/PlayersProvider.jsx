import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	useRef,
} from 'react';

import axios from 'axios';
import apiCall from '../api';
import { UsersContext } from './UsersProvider';
import { toast } from 'react-toastify';
import { sanify } from '../utilities';

export const PlayersContext = createContext();

function PlayersProvider({ children }) {
	const [players, setPlayers] = useState([]);
	const [filtered, setFiltered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isLoggedIn, userSettings } = useContext(UsersContext);
	const allPlayers = useRef();

	const options = [
		{ value: 'name', label: 'Nome' },
		{ value: 'position', label: 'Ruolo' },
		{ value: 'team', label: 'Squadra' },
		{ value: 'slot', label: 'Slot' },
		{ value: 'pricePrediction', label: 'Prezzo previsto' },
		{ value: 'pricePrevYear', label: 'Prezzo anno precedente' },
		{ value: 'maxBidPrice', label: 'Prezzo massimo' },
		{ value: 'initialQuote', label: 'Valutazione iniziale' },
		{ value: 'currentQuote', label: 'Valutazione attuale' },
		{ value: 'value', label: 'Valore di mercato' },
	];
	const editableOptions = ['pricePrevYear', 'pricePrediction', 'maxBidPrice'];
	const maxOptions = [
		'slot',
		'value',
		'currentQuote',
		'initialQuote',
		'pricePrediction',
		...editableOptions,
	];

	const positions = [
		{ label: 'A', color: 'bg-red-400', active: 'bg-red-700' },
		{ label: 'C', color: 'bg-blue-400', active: 'bg-blue-700' },
		{ label: 'D', color: 'bg-green-400', active: 'bg-green-700' },
		{ label: 'P', color: 'bg-amber-400', active: 'bg-amber-700' },
	];
	const positionsLabels = positions.map((pos) => pos.label);

	const getSlots = (players, position) =>
		players
			.filter((player) => player.position === position)
			.toSorted((a, b) => b.pricePrediction - a.pricePrediction)
			.map((player, i) => ({
				...player,
				pricePrediction: Math.round(
					player.pricePrediction * userSettings.budget
				),
				slot: Math.ceil((i + 1) / userSettings.players),
			}));

	const getAllPlayers = async () => {
		setIsLoading(true);
		try {
			// const respObj = await toast.promise(
			// 	axios.get('http://localhost:8080/api/players', {
			// 		withCredentials: true,
			// 	}),
			// 	{
			// 		pending: {
			// 			render() {
			// 				return 'Recupero la lista';
			// 			},
			// 			toastId: 'gettingPlayers',
			// 		},
			// 		success: {
			// 			render({ data }) {
			// 				if (data.data.length > 0) return 'Lista caricata con successo';
			// 				else return 'Benvenuto';
			// 			},
			// 			toastId: 'getAllPlayers',
			// 		},
			// 		error: 'Qualcosa è andato storto, riprovare',
			// 	}
			// );
			const respObj = await toast.promise(apiCall('get', '/api/players'), {
				pending: {
					render() {
						return 'Recupero la lista';
					},
					toastId: 'gettingPlayers',
				},
				success: {
					render({ data }) {
						if (data.data.length > 0) return 'Lista caricata con successo';
						else return 'Benvenuto';
					},
					toastId: 'getAllPlayers',
				},
				error: 'Qualcosa è andato storto, riprovare',
			});
			console.log(respObj.data);

			allPlayers.current = positionsLabels
				.map((position) => getSlots(respObj.data, position))
				.flat();
			console.log(allPlayers.current);
			setPlayers(allPlayers.current);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
			setFiltered(false);
		}
	};

	useEffect(() => {
		if (isLoggedIn) getAllPlayers();
	}, [isLoggedIn, userSettings]);

	const updatePlayer = async (_id, option) => {
		const respObj = await apiCall('patch', '/api/players/' + _id, option);

		// const respObj = await axios.patch(
		// 	'http://localhost:8080/api/players/' + _id,
		// 	option,
		// 	{ withCredentials: true }
		// );
		setPlayers((prev) =>
			prev.map((player) =>
				player._id === _id ? { ...player, option } : player
			)
		);
		allPlayers.current = allPlayers.current.map((player) =>
			player._id === _id ? respObj.data.data : player
		);
	};

	const sortPlayers = (option, isDescending) => {
		if (isDescending) {
			setPlayers((prev) =>
				prev.toSorted((a, b) => (b[option] || 0) - (a[option] || 0))
			);
			return;
		}
		setPlayers((prev) => prev.toSorted((a, b) => a[option] - b[option]));
	};

	const searchPlayer = (searchTerm) => {
		setPlayers(
			allPlayers.current.filter((player) =>
				sanify(player.name).includes(sanify(searchTerm))
			)
		);
		setFiltered(true);
	};

	const filterPlayers = (formData) => {
		const keys = Object.keys(formData);
		const roles = keys.filter((k) => positionsLabels.includes(k));
		const otherFilters = keys.filter((k) => !positionsLabels.includes(k));

		setPlayers(
			allPlayers.current.filter((player) => {
				if (roles.includes(player.position) || roles.length === 0)
					return !otherFilters
						.map((k) => {
							if (!formData[k]) return true;
							if (formData[k] === true) return true;
							if (maxOptions.includes(k))
								return player[k] <= Number(formData[k]);
							return player[k] >= Number(formData[k]);
						})
						.includes(false);
				else return false;
			})
		);
		setFiltered(true);
		toast.success('Filtri applicati', { autoClose: 1000 });
	};

	const clearFiltersHandler = () => {
		setPlayers(allPlayers.current);
		setFiltered(false);
		toast.success('Filtri rimossi', { autoClose: 1000 });
	};

	return (
		<PlayersContext.Provider
			value={{
				players,
				allPlayers,
				setPlayers,
				sortPlayers,
				options,
				maxOptions,
				positions,
				filterPlayers,
				filtered,
				clearFiltersHandler,
				updatePlayer,
				editableOptions,
				searchPlayer,
				isLoading,
				getAllPlayers,
			}}
		>
			{children}
		</PlayersContext.Provider>
	);
}

export default PlayersProvider;
