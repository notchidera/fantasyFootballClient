import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AccordionItem from './AccordionItem';

test('renders AccordionItem and toggles content', () => {
	const onClick = jest.fn();
	const content = <p>Prize: $10,000</p>;

	render(
		<AccordionItem
			isActive={false}
			title="Pro Traders League"
			content={content}
			onClick={onClick}
		/>
	);

	// Check that the title is rendered
	expect(screen.getByText('Pro Traders League')).toBeInTheDocument();

	// Simulate clicking the item
	fireEvent.click(screen.getByText('Pro Traders League'));
	expect(onClick).toHaveBeenCalled();
});
