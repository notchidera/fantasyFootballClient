import React from 'react';

const AccordionItem = ({ isActive, title, content, onClick }) => (
	<div className="accordion-item border-b border-gray-600">
		<button
			className={`w-full text-left p-4 font-bold ${
				isActive ? 'bg-slate-600' : 'bg-slate-700'
			}`}
			onClick={onClick}
		>
			{title}
		</button>
		{isActive && <div className="p-4 bg-slate-800">{content}</div>}
	</div>
);

export default AccordionItem;
