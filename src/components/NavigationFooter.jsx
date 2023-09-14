import { Link } from 'react-router-dom';
import RoundedButton from './buttons/RoundedButton';
import { home, list, settings } from '../icons/icons';
function NavigationFooter({ children }) {
	return (
		<div className='fixed bg-slate-700 flex w-full items-center justify-center gap-4 bottom-0 p-4'>
			{children}
			<Link to='/'>
				<RoundedButton icon={home} size='lg' color='light' />
			</Link>
			<Link to='/teams'>
				<RoundedButton icon={list} size='lg' color='light' />
			</Link>
			<Link to='/settings'>
				<RoundedButton icon={settings} size='lg' color='light' />
			</Link>
		</div>
	);
}

export default NavigationFooter;
