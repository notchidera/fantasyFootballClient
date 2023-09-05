import { useState, useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { UsersContext } from '../context/UsersProvider';
import LoadingScreen from './LoadingScreen';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

import Button from './Button';

function UploadForm() {
	const [file, setFile] = useState(null);
	const { getAllPlayers } = useContext(PlayersContext);
	const { isLoading, setIsLoading } = useContext(UsersContext);

	const changeHandler = async (e) => {
		setFile(e.target.files[0]);
		toast.info('file inserito', {
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const data = await file.arrayBuffer();
			const workbook = XLSX.readFile(data);
			console.log(workbook);
			if (!workbook.Directory)
				throw new Error('Il formato del file non è valido');
			const sheet_name_list = workbook.SheetNames;
			const jsonData = XLSX.utils.sheet_to_json(
				workbook.Sheets[sheet_name_list[0]],
				{ range: 1 }
			);
			console.log(jsonData);
			const respObj = await toast.promise(
				axios.post('http://localhost:8080/api/players', jsonData, {
					withCredentials: true,
				}),
				{
					pending: 'Sto caricando la lista',
					success: 'Lista caricata con successo!',
					error:
						'Formato lista non valido: caricare un xlsx preso da fantacalcio.it',
				}
			);
			//toast.success('Lista caricata con successo!');
			getAllPlayers();
		} catch (err) {
			console.log({ err });
			toast.error(
				'File non valido. Controlla che il file sia un xlsx e che abbia il formato utilizzato su fantacalcio.it'
			);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{isLoading && <LoadingScreen />}
			<form
				className='bg-slate-100 rounded w-80 flex items-center gap-4 text-center justify-center flex-col p-4'
				onSubmit={submitHandler}
			>
				<label
					className=' cursor-pointer flex gap-2 items-center justify-center shadow transition-all duration-200 rounded-full p-2 px-6 md:w-40 text-center bg-violet-700 text-slate-100 hover:bg-violet-800 '
					htmlFor='fileUpload'
				>
					Scegli un file
				</label>
				<p>{file && file.name}</p>

				<p>
					Seleziona un file xlsx per eseguire l'upload. Puoi scaricare un file
					aggiornato{' '}
					<a
						className='text-blue-700 cursor-pointer hover:underline'
						href='https://www.fantacalcio.it/quotazioni-fantacalcio'
						rel='noreferrer'
						target='_blank'
					>
						dal sito ufficiale di fantacalcio.it
					</a>
					<input
						id='fileUpload'
						className='invisible'
						onChange={changeHandler}
						type='file'
						name='file'
					/>
				</p>
				{file && <Button content='Upload' color='green' />}
			</form>
		</>
	);
}

export default UploadForm;
