import { useState } from 'react';

function Accordion({ children, title }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='flex flex-col gap-4 p-2'>
			<h2 className='p-2 text-lg' onClick={() => setIsOpen((prev) => !prev)}>
				{title}
			</h2>
			<p className={`${!isOpen && 'h-0'}`}>{children}</p>
		</div>
	);
}

export default Accordion;
