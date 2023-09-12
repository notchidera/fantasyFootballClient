import { useState, useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { UsersContext } from '../context/UsersProvider';
import { toast } from 'react-toastify';

///SOME OPTIONS CAN BE EDITED BY THE USER, THIS COMPONENT MANAGES HOW THESE FIELDS SHOULD BEHAVE INSIDE THE MAIN TABLE

function EditableCell({ option, player }) {
	const [val, setVal] = useState(player[option] || '');
	const { updatePlayer } = useContext(PlayersContext);
	const { userSettings } = useContext(UsersContext);

	const updateHandler = () => {
		try {
			///CHECHS IF THE VALUE IS A NUMBER
			if (Number.isNaN(Number(val))) throw new Error('Inserire un numero');
			///FOR THE PRICEPREDICTION PROPERTY WE WANT TO SAVE AN ABSOLUTE VALUE (%)
			const value = Number(
				option === 'pricePrediction' ? val / userSettings.budget : val
			);
			updatePlayer(player._id, { [option]: value });
		} catch (err) {
			toast.error(err);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		updateHandler();
	};

	return (
		<form className='w-full ' onSubmit={submitHandler}>
			<input
				onBlur={updateHandler}
				className='p-2 w-full bg-slate-700 text-center outline-none'
				onChange={(e) => setVal(e.target.value)}
				value={val}
				type='number'
			/>
		</form>
	);
}

export default EditableCell;
