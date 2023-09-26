import { useState, useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';

import apiCall from '../utils/api';

import { FileUploader } from 'react-drag-drop-files';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

import Button from './buttons/Button';

///HANDLES THE UPLOAD OF A FILE AND PASSES THE EXTRACTED VALUE TO THE SERVER IN ORDER TO UPDATE THE PLAYERS LIST

function UploadForm() {
	const [file, setFile] = useState(null);
	const { getAllPlayers } = useContext(PlayersContext);

	const changeHandler = (file) => {
		setFile(file);
		toast.info(file.name + ' caricato con successo!');
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		///IT GETS THE XLSX FILE, PARSES IT AND SPLITS IT BY THE HEADERS OF THE SECOND ROW OF THE TABLE (RANGE 1) - THEN IT SENDS IT TO THE BACKEND
		try {
			const data = await file.arrayBuffer();
			const workbook = XLSX.readFile(data);
			console.log(workbook);
			if (!workbook.Directory)
				throw new Error('Il formato del file non è valido');
			const sheet_name_list = workbook.SheetNames;
			const jsonData = XLSX.utils
				.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { range: 1 })
				.map((player) => ({
					...player,
					currentQuote: player['Qt.A'],
					initialQuote: player['Qt.I'],
				}));
			await toast.promise(apiCall('post', '/api/players', jsonData), {
				pending: 'Sto caricando la lista',
				success: 'Lista caricata con successo!',
				error:
					'Formato lista non valido: caricare un xlsx preso da fantacalcio.it',
			});

			getAllPlayers();
		} catch (err) {
			toast.error(
				'File non valido. Controlla che il file sia un xlsx e che abbia il formato utilizzato su fantacalcio.it',
				{ autoClose: 5000 }
			);
		}
	};
	return (
		<form
			data-cy='upload-form'
			className='bg-slate-100 rounded w-full flex items-center gap-4 text-center justify-center flex-col'
			onSubmit={submitHandler}
		>
			<p>
				Seleziona un file xlsx o trascinalo nell'area sottostante per eseguire
				l'upload. Puoi scaricare un file aggiornato{' '}
				<a
					className='text-blue-700 cursor-pointer hover:underline'
					href='https://www.fantacalcio.it/quotazioni-fantacalcio'
					rel='noreferrer'
					target='_blank'
				>
					dal sito ufficiale di fantacalcio.it
				</a>
			</p>
			<FileUploader
				onTypeError={() => toast.error('Tipo di file non supportato')}
				handleChange={changeHandler}
				name='file'
				types={['XLSX']}
			>
				<div className='flex items-center justify-center w-80'>
					<label
						htmlFor='dropzone-file'
						className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
					>
						<div className='flex flex-col items-center justify-center pt-5 pb-6'>
							<svg
								className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 20 16'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
								/>
							</svg>
							<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
								<span className='font-semibold'>
									Clicca per eseguire l'upload
								</span>{' '}
							</p>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								o trascina un file XLSX
							</p>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								{file && file.name}
							</p>
						</div>
						<input id='dropzone-file' type='file' className='hidden' />
					</label>
				</div>
			</FileUploader>
			{file ? (
				<Button content='Upload' color='green' />
			) : (
				<div className='h-16'></div>
			)}
		</form>
	);
}

export default UploadForm;
