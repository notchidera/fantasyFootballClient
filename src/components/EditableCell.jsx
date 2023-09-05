import { useState, useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { UsersContext } from '../context/UsersProvider';

function EditableCell({ option, player }) {
	const [val, setVal] = useState(player[option] || '');
	const { updatePlayer } = useContext(PlayersContext);
	const { budget } = useContext(UsersContext);

	const updateHandler = () => {
		const value = option === 'pricePrediction' ? val / budget : val;
		updatePlayer(player._id, { [option]: value });
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
			/>
		</form>
	);
}

export default EditableCell;
