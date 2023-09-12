function Button({ content, icon, color, ...rest }) {
	let styles;

	///CHANGES STYLE BASED ON THE COLOR PROP
	///CAN RECEIVE AN ICON AS A PROP, THAT CAN BE SHOWN NEXT TO THE CONTENT

	switch (color) {
		case 'green':
			styles = 'bg-emerald-600 hover:bg-emerald-800 text-slate-100';
			break;
		case 'light':
			styles = 'bg-slate-100 hover:bg-slate-300 text-slate-700';
			break;
		default:
			styles = 'bg-slate-700 text-slate-100 hover:bg-slate-500';
	}

	return (
		<button
			{...rest}
			className={`flex gap-2 items-center justify-center shadow transition-all duration-200 rounded-full p-2 px-6 md:w-40 ${styles}`}
		>
			{icon}
			{content}
		</button>
	);
}

export default Button;
