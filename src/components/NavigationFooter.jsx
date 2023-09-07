import { Link } from 'react-router-dom';
import RoundedButton from './RoundedButton';
function NavigationFooter({ items }) {
	return (
		<div className='fixed bg-slate-700 flex w-full items-center justify-center gap-4 bottom-0 p-4'>
			{items.map((item) => (
				<Link to={item.path}>
					<RoundedButton
						icon={item.icon}
						size='lg'
						color={item.color || 'light'}
					/>
				</Link>
			))}
		</div>
	);
}

export default NavigationFooter;
