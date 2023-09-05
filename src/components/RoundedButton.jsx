import { addLarge, addSmall } from '../icons/icons';

function RoundedButton({ size, color, icon, ...rest }) {
	let styles;
	switch (color) {
		case 'green':
			styles = 'bg-emerald-600 hover:bg-emerald-800 text-slate-100';
			break;
		case 'light':
			styles = 'bg-slate-100 hover:bg-slate-300 text-slate-700';
			break;
		case 'red':
			styles = 'bg-red-600 hover:bg-red-800 text-slate-100';
			break;
		default:
			styles = 'bg-slate-700 text-slate-100 hover:bg-slate-500';
	}
	return (
		<button
			{...rest}
			className={`${styles} flex items-center justify-center shadow text-slate-100 ${
				size === 'lg' ? 'h-12 w-12' : 'h-6 w-6 '
			} rounded-full`}
		>
			{icon ? icon : size === 'lg' ? addLarge : addSmall}
		</button>
	);
}

export default RoundedButton;
