import React, { useState } from 'react';

const Accordion = ({ items }) => {
	const [activeElement, setActiveElement] = useState(null);

	const toggleActive = (id) => {
		setActiveElement((prev) => (prev === id ? null : id));
	};

	return (
		<div className="accordion bg-slate-700 text-white rounded-md">
			{items.map((item) => (
				<div key={item.id} className="border-b border-gray-600">
					<button
						className={`w-full text-left p-4 font-bold ${
							activeElement === item.id ? 'bg-slate-600' : 'bg-slate-700'
						}`}
						onClick={() => toggleActive(item.id)}
					>
						{item.title}
					</button>
					{activeElement === item.id && (
						<div className="p-4 bg-slate-800">
							{item.content}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Accordion;
