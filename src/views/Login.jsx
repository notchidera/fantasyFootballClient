import { useState, useContext } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiCall from '../utils/api';
import Button from '../components/buttons/Button';

function Login({ type }) {
	const [form, setForm] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const { isLoggedIn, setIsLoggedIn } = useContext(UsersContext);
	///DETERMINES THE PAGE TITLE AND THE BUTTON CONTENT
	const title = type[0].toUpperCase() + type.slice(1);

	const changeHandler = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const throwError = (err) => {
		let msg = err;
		msg = msg
			.replace('user validation failed: ', '')
			.replace('password:', '')
			.replace('email:', '')
			.replace('passwordConfirm:', '');
		if (err.includes('duplicate key error'))
			msg = 'Indirizzo email già esistente ';
		return msg;
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		///ON SUBMISSION MAKES A POST REQUEST BASED ON TYPE PROP(SIGNUP OR LOGIN)
		try {
			await toast.promise(apiCall('post', `/api/users/${type}`, form), {
				pending: 'Verifica credenziali',
				success: `${type} effettuato con successo!`,
				error: {
					render({ data }) {
						return throwError(data.response.data.message);
					},
					autoClose: 5000,
					toastId: 'passErr',
				},
			});
			setIsLoggedIn(true);
		} catch (err) {
			toast.error(throwError(err.response.data.message), {
				autoClose: 5000,
				toastId: 'passErr',
			});
		}
	};

	///THIS COMPONENT SHOWS LOGIN OR SIGNUP FORM BASED ON THE TYPE PROP

	return (
		<div className='w-full flex items-center justify-center h-screen'>
			{/* IF THE USER IS LOGGEDIN, IT REDIRECTS TO HOMEPAGE */}
			{isLoggedIn && <Navigate to='/' replace={true} />}
			<form
				onSubmit={submitHandler}
				className='flex flex-col w-96 h-[500px] p-12 items-center justify-between shadow bg-slate-100 rounded'
			>
				<h2 className='text-xl font-semibold'>{title}</h2>
				<div className='flex items-center w-full flex-col justify-center gap-6'>
					<input
						data-cy='email'
						className='p-2 rounded-full bg-slate-200 text-center w-full border boder-slate-400 outline-none'
						placeholder='Email'
						name='email'
						type='email'
						onChange={changeHandler}
						value={form.email}
					/>

					<input
						data-cy='password'
						className='p-2 rounded-full bg-slate-200 text-center w-full border boder-slate-400 outline-none'
						placeholder='Password'
						type='password'
						name='password'
						minLength={8}
						onChange={changeHandler}
						value={form.password}
					/>

					{type === 'signUp' && (
						<input
							data-cy='passwordConfirm'
							className='p-2 rounded-full bg-slate-200 text-center w-full border boder-slate-400 outline-none mb-6'
							placeholder='Confirm Password'
							type='password'
							name='passwordConfirm'
							minLength={8}
							onChange={changeHandler}
							value={form.passwordConfirm}
						/>
					)}
				</div>
				<Button content={title} color='green' />
				{type !== 'signUp' ? (
					<Link to='/signup' className='text-blue-700'>
						Non hai un account? Registrati ora!
					</Link>
				) : (
					<Link className='text-blue-700' to='/login'>
						Hai già un account? Accedi ora!
					</Link>
				)}
			</form>
		</div>
	);
}

export default Login;
