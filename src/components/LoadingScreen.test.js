import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('Loading screen component', () => {
	test('renders Loading screen', () => {
		render(<LoadingScreen />);
		const loadingSpinner = screen.getByRole('status');
		expect(loadingSpinner).toBeInTheDocument();
	});
});
