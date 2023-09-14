import { render, screen } from '@testing-library/react';
import AccordionItem from './AccordionItem';

describe('AccordionItem component', () => {
	const children = 'Test content';
	const id = 'test1';
	const title = 'test';
	test('testing render of AccordionItem not active', () => {
		const active = 'test2';
		render(
			<AccordionItem id={id} activeElement={active} title={title}>
				{children}
			</AccordionItem>
		);
		const titleText = screen.getByText(title);
		expect(titleText).toBeInTheDocument();
		const button = screen.queryByRole('button');
		expect(button.classList.contains('false')).toBe(true);
	});
	test('testing render of AccordionItem active', () => {
		const active = 'test1';
		render(
			<AccordionItem id={id} activeElement={active} title={title}>
				{children}
			</AccordionItem>
		);
		const button = screen.queryByRole('button');
		expect(button.classList.contains('false')).toBe(false);
	});
});
