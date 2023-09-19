/* eslint-disable no-undef */
import { BASE_URL } from '../../src/utils/api';

Cypress.Commands.add(
	'login',
	(email = 'test21@gmail.com', password = 'pass1234') => {
		cy.visit(BASE_URL);
		cy.url().should('include', 'login');
		cy.get('[data-cy="email"]').type(email);
		cy.get('[data-cy="password"]').type(password);
		cy.get('form').submit();
		cy.url().should('equal', BASE_URL + '/');
	}
);
