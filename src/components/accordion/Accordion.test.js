import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Accordion from './Accordion';

test('renders Accordion with stock-related data', () => {
	const items = [
		{ id: '1', title: 'Pro Traders League', content: <p>Prize: $10,000</p> },
		{ id: '2', title: 'Beginner Stock League', content: <p>Prize: $500</p> },
	];

	render(<Accordion items={items} />);

	// Check that titles are rendered
	expect(screen.getByText('Pro Traders League')).toBeInTheDocument();
	expect(screen.getByText('Beginner Stock League')).toBeInTheDocument();

	// Expand an accordion item
	fireEvent.click(screen.getByText('Pro Traders League'));
	expect(screen.getByText('Prize: $10,000')).toBeInTheDocument();

	// Collapse the item
	fireEvent.click(screen.getByText('Pro Traders League'));
	expect(screen.queryByText('Prize: $10,000')).toBeNull();
});
