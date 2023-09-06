import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

export default function Accordion({ items }) {
	///ITEMS SHOULD BE AN ARRAY OF OBJECTS WITH ID, TITLE AND CONTENT KEYS
	const [activeElement, setActiveElement] = useState('');

	const handleClick = (value) => {
		if (value === activeElement) {
			setActiveElement('');
		} else {
			setActiveElement(value);
		}
	};
	return (
		<>
			<div className='rounded w-full border border-l-0 border-r-0 border-t-0  border-neutral-200 bg-slate-100 dark:border-neutral-600 dark:bg-neutral-800'>
				{items.map((item) => (
					<AccordionItem
						key={item.id}
						activeElement={activeElement}
						handleClick={handleClick}
						id={item.id}
						title={item.title}
					>
						{item.content}
					</AccordionItem>
				))}
			</div>
		</>
	);
}
