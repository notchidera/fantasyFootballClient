import { useState, useContext, useEffect } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from './Button';

function Login({ type }) {
	const [form, setForm] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const [errMsg, setErrMsg] = useState('');
	const { setIsLoggedIn } = useContext(UsersContext);

	const title = type[0].toUpperCase() + type.slice(1);

	const changeHandler = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const respObj = await toast.promise(
				axios.post(`http://localhost:8080/api/users/${type}`, form, {
					withCredentials: true,
				}),
				{
					pending: 'Verifica credenziali',
					success: `${type} effettuato con successo!`,
					error: {
						render({ data }) {
							console.log(data);
							return data.response.data.message;
						},
					},
				}
			);
			setIsLoggedIn(true);
			console.log(respObj);
		} catch (err) {
			toast.error(err);
			setErrMsg(err.response.data.message);
		}
	};

	return (
		<div className='w-full flex items-center justify-center h-screen'>
			<form
				onSubmit={submitHandler}
				className='flex flex-col w-96 h-1/3 p-12 items-center justify-between shadow bg-slate-100 rounded'
			>
				<h2 className='text-xl font-semibold'>{title}</h2>
				<div className='flex items-center w-full flex-col justify-center gap-6'>
					<input
						className='p-2 rounded-full bg-slate-200 text-center w-full border boder-slate-400 outline-none'
						placeholder='Email'
						name='email'
						type='email'
						onChange={changeHandler}
						value={form.email}
					/>

					<input
						className='p-2 rounded-full bg-slate-200 text-center w-full border boder-slate-400 outline-none'
						placeholder='Password'
						type='password'
						name='password'
						onChange={changeHandler}
						value={form.password}
					/>

					{type === 'signUp' && (
						<input
							className='p-2 rounded-full bg-slate-200 text-center w-full border boder-slate-400 outline-none mb-6'
							placeholder='Confirm Password'
							type='password'
							name='passwordConfirm'
							onChange={changeHandler}
							value={form.passwordConfirm}
						/>
					)}
					<p className='text-red-600'>{errMsg}</p>
				</div>
				<Button content={title} color='green' />
				{type !== 'signUp' ? (
					<Link to='/signup' className='text-blue-700'>
						Not registered? Sign up now!
					</Link>
				) : (
					<Link className='text-blue-700' to='/login'>
						Already registered? Login now!
					</Link>
				)}
			</form>
		</div>
	);
}

export default Login;
