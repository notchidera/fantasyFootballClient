import React, { useState } from 'react';
import apiCall from '../utils/api';
import { useNavigate } from 'react-router-dom';

const CreateLeague = () => {
	const [name, setName] = useState('');
	const [prize, setPrize] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await apiCall('post', '/api/leagues', { name, prize });
			navigate('/leagues');
		} catch (err) {
			setError('Failed to create league.');
			console.error(err);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold text-white mb-4">Create New League</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-white mb-2">League Name</label>
					<input
						type="text"
						className="p-2 rounded-md w-full"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-white mb-2">Prize Pool</label>
					<input
						type="number"
						className="p-2 rounded-md w-full"
						value={prize}
						onChange={(e) => setPrize(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
				>
					Create League
				</button>
				{error && <p className="text-red-500 mt-4">{error}</p>}
			</form>
		</div>
	);
};

export default CreateLeague;
