import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	useRef,
	useCallback,
	useMemo,
} from 'react';

import apiCall from '../utils/api';
import { UsersContext } from './UsersProvider';
import { toast } from 'react-toastify';
import { sanify } from '../utils/utilities';

export const PlayersContext = createContext();

function PlayersProvider({ children }) {
	// STATE VARIABLE USED TO RENDER ALL THE PLAYERS
	const [players, setPlayers] = useState([]);
	/// STATE VARIABLE THAT IS USED TO CHECK IF THERE ARE ANY FILTERS APPLIED
	const [filtered, setFiltered] = useState(false);
	// STATE VARIABLE THAT IS USED TO KEEP TRACK OF THE LOADING PHASE
	const [isLoading, setIsLoading] = useState(false);
	const { isLoggedIn, userSettings } = useContext(UsersContext);
	/// SETS ALLPLAYERS VARIABLE. WHILE THE PLAYERS VARIABLE MIGHT CHANGE WHEN FILTERING, THE ALLPLAYERS VARIABLE SHOULD KEEP ALL THE PLAYERS DATA WITHOUT GETTING THEM FROM THE DB EVERY TIME
	const allPlayers = useRef();

	/// ARRAY OF ALL THE ATTRIBUTES THAT A PLAYER CAN HAVE
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
	/// OPTIONS THAT CAN BE EDITED BY THE USER
	const editableOptions = ['pricePrevYear', 'pricePrediction', 'maxBidPrice'];

	/// AVAILABLE VALUES FOR THE POSITION OPTION - IT ALSO INCLUDES SOME STYLING INFO
	const positions = useMemo(
		() => [
			{ label: 'A', color: 'bg-red-400', active: 'bg-red-700', hex: '#fca5a5' },
			{
				label: 'C',
				color: 'bg-blue-400',
				active: 'bg-blue-700',
				hex: '#3b82f6',
			},
			{
				label: 'D',
				color: 'bg-green-400',
				active: 'bg-green-700',
				hex: '#22c55e',
			},
			{
				label: 'P',
				color: 'bg-amber-400',
				active: 'bg-amber-700',
				hex: '#fcd34d',
			},
		],
		[]
	);
	// JUST CONTAINS POSITION LABELS
	const positionsLabels = useMemo(
		() => positions.map((pos) => pos.label),
		[positions]
	);

	/// IT TAKES AN ARRAY OF PLAYERS AND A POSITION AND RETURNS AN ARRAY OF PLAYERS THAT BELONG TO THAT POSITION. IT ALSO: 1) EDITS THE PRICE PREDICTION VALUE (IT CALCULATES THE RELATIVE VALUE STARTING FROM THE ABSOLUTE VALUE OF PRICEPREDICTION AND THE USER'S BUDGET). 2) ADDS A PROPERTY CALLED SLOT THAT HOLDS THE VALUE OF THE PLAYER'S RANK BASED ON THE PRICEPREDICTION COMPARED TO THE OTHER PLAYERS AND THE NUMBER OF "HUMAN" PLAYERS THAT ARE TAKING PART TO THE AUCTION
	const getSlots = useCallback(
		(players, position) =>
			players
				.filter((player) => player.position === position)
				.toSorted((a, b) => b.pricePrediction - a.pricePrediction)
				.map((player, i) => ({
					...player,
					pricePrediction: Math.round(
						player.pricePrediction * userSettings.budget
					),
					slot: Math.ceil((i + 1) / userSettings.players),
				})),
		[userSettings.budget, userSettings.players]
	);

	// GETS ALL PLAYERS AND SETS THE VALUES OF PLAYERS AND ALLPLAYERS VARIABLES

	const getAllPlayers = useCallback(async () => {
		setIsLoading(true);
		try {
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

			allPlayers.current = positionsLabels
				.map((position) => getSlots(respObj.data, position))
				.flat();
			setPlayers(allPlayers.current);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
			setFiltered(false);
		}
	}, [positionsLabels, getSlots]);
	/// ON MOUNT AND IF THE USER IS LOGGED IN, RUNS THE GETALLPLAYERS FUNCTION
	useEffect(() => {
		if (isLoggedIn) getAllPlayers();
	}, [isLoggedIn, userSettings, getAllPlayers]);

	///USED TO UPDATE A PLAYER PROPERTY (ONLY EDITABLE PROPERTIES CAN BE CHANGED BY THE USER)

	const updatePlayer = async (_id, option) => {
		try {
			const respObj = await apiCall('patch', '/api/players/' + _id, option);

			setPlayers((prev) =>
				prev.map((player) =>
					player._id === _id ? { ...player, option } : player
				)
			);
			allPlayers.current = allPlayers.current.map((player) =>
				player._id === _id ? respObj.data.data : player
			);
		} catch (err) {
			toast.error(err);
		}
	};

	///SORTS THE PLAYERS BASED ON AN OPTION AND AN ORDER (DESCENDING OR ASCENDING)
	const sortPlayers = (option, isDescending) => {
		if (isDescending) {
			setPlayers((prev) =>
				prev.toSorted((a, b) => (b[option] || 0) - (a[option] || 0))
			);
			return;
		}
		setPlayers((prev) => prev.toSorted((a, b) => a[option] - b[option]));
	};
	/// FILTERS PLAYERS BASED ON A SEARCHTERM
	const searchPlayer = (searchTerm) => {
		setPlayers(
			allPlayers.current.filter((player) =>
				sanify(player.name).includes(sanify(searchTerm))
			)
		);
		setFiltered(true);
	};

	///FILTERS PLAYERS BASED ON THE VALUES INCLUDED IN THE FILTER FORM. 1) IT TAKES AN OBJECT WITH OPTION NAME AND VALUE PAIRS, THEN SEPARATES THE ROLES FILTERING OPTIONS BY THE OTHER FILTERING OPTIONS.
	const filterPlayers = (formData) => {
		const keys = Object.keys(formData);
		const roles = keys.filter((k) => positionsLabels.includes(k));
		const otherFilters = keys.filter((k) => !positionsLabels.includes(k));
		// 2)SET THE PLAYERS VALUE, BY ITERATING OVER ALL THE PLAYERS AND CHECKING IF THE CURRENT PLAYER BELONGS TO ONE OF THE SELECTED ROLES OR IF NO ROLES HAVE BEEN SELECTED, OTHERWISE IT RETURNS FALSE
		setPlayers(
			allPlayers.current.filter((player) => {
				if (roles.includes(player.position) || roles.length === 0)
					/// ITERATES OVER THE OTHERFILTERS, CHECKING IF FOR THAT SPECIFIC FILTER THERE IS ANY VALUE. IF THAT'S THE CASE, IT CHECKS IF THE PLAYERS HAS A VALUE THAT MATCHES THE CURRENT FILTER. IF THAT'S THE CASE IT RETURNS TRUE, OTHERWISE IT RETURNS FALSE. IF THERE ARE NO FALSE IN THE RESULTING ARRAY, THAT PLAYER MATCHES ALL THE REQUIREMENTS AND CAN BE PART OF THE FILTERED ARRAY
					return !otherFilters
						.map((k) => {
							if (!formData[k]) return true;
							return player[k] <= Number(formData[k]);
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
