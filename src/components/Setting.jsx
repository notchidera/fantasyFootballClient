import { useState, useContext } from 'react';
import { UsersContext } from '../context/UsersProvider';

///HANDLES A SINGLE SETTING UPDATE IN THE SETTINGS VIEW

function Setting({ setting, value }) {
	const [val, setVal] = useState(value);
	const { updateSetting } = useContext(UsersContext);
	const submitHandler = (e) => {
		e.preventDefault();
		updateSetting(setting, val);
	};
	return (
		<form onSubmit={submitHandler} className='flex gap-4 items-center'>
			<label>{setting[0].toUpperCase() + setting.slice(1)}</label>
			<input
				value={val}
				onChange={(e) => setVal(e.target.value)}
				className='bg-slate-100 w-16 text-slate-700 outline-none'
				type='number'
			/>
			<button className='font-semibold text-md text-blue-600 hover:text-blue-800 hover:underline'>
				Save
			</button>
		</form>
	);
}

export default Setting;
