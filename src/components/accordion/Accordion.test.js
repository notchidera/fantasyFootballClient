/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import Accordion from './Accordion';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Accordion component', () => {
	const items = [
		{
			title: 'Modifica budget',
			id: 'budget',
			content: <div role='item1'>Item1</div>,
		},
		{
			title: 'Modifica numero giocatori',
			id: 'Giocatori',
			content: <div role='item2'>Item2</div>,
		},
		{
			title: 'Aggiorna lista',
			id: 'update',
			content: <div role='item3'>Item3</div>,
		},
	];

	test('testing render of AccordionComponent all closed', () => {
		render(<Accordion items={items} />);
		const title = screen.getByText(items[0].title);
		expect(title).toBeInTheDocument();
		const buttons = screen.getAllByRole('button');
		buttons.forEach((btn) =>
			expect(btn.classList.contains('false')).toBe(true)
		);
	});
	test('testing render of AccordionComponent with click', () => {
		render(<Accordion items={items} />);
		const title = screen.getByText(items[0].title);
		expect(title).toBeInTheDocument();
		const buttons = screen.getAllByRole('button');

		buttons.forEach(async (btn, i) => {
			act(() => userEvent.click(btn));
			const updatedBtn = screen.getByRole('button', { name: items[i].title });
			expect(updatedBtn.classList.contains('false')).toBe(false);
		});
	});
});
