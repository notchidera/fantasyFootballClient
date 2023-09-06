import { useState, useContext } from 'react';
import { PlayersContext } from '../context/PlayersProvider';
import { UsersContext } from '../context/UsersProvider';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

import Button from './Button';

function UploadForm() {
	const [file, setFile] = useState(null);
	const { getAllPlayers } = useContext(PlayersContext);

	// const changeHandler = async (e) => {
	// 	setFile(e.target.files[0]);
	// 	toast.info('file inserito');
	// };

	const changeHandler = (file) => {
		setFile(file);
		toast.info(file.name + ' caricato con successo!');
	};

	const submitHandler = async (e) => {
		e.preventDefault();

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

			getAllPlayers();
		} catch (err) {
			console.log({ err });
			toast.error(
				'File non valido. Controlla che il file sia un xlsx e che abbia il formato utilizzato su fantacalcio.it',
				{ autoClose: 5000 }
			);
		}
	};
	return (
		<form
			className='bg-slate-100 rounded w-full flex items-center gap-4 text-center justify-center flex-col py-6'
			onSubmit={submitHandler}
		>
			{/* <label
				className=' cursor-pointer flex gap-2 items-center justify-center shadow transition-all duration-200 rounded-full p-2 px-6 md:w-40 text-center bg-violet-700 text-slate-100 hover:bg-violet-800 '
				htmlFor='fileUpload'
			>
				Scegli un file
			</label> */}

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
				{/* <input
					id='fileUpload'
					className='invisible'
					onChange={changeHandler}
					type='file'
					name='file'
				/> */}
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
