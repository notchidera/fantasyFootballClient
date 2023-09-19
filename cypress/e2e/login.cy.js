/* eslint-disable no-undef */
import { BASE_URL } from '../../src/utils/api';

describe('Login success', () => {
	it('Login Success - Players in DB', () => {
		cy.login();
	});
});

describe('Login failed - Missing credentials', () => {
	it('Login failed - No credentials', () => {
		cy.visit(BASE_URL);
		cy.url().should('include', 'login');
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
	it('Login failed - Email missing', () => {
		cy.visit(BASE_URL);
		cy.url().should('include', 'login');
		cy.get('[data-cy="password"]').type('pass1234');
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
	it('Login failed - Password missing', () => {
		cy.visit(BASE_URL);
		cy.url().should('include', 'login');
		cy.get('[data-cy="email"]').type('test21@gmail.com');
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
});

describe('Login failed - Wrong credentials', () => {
	it('Login failed - Wrong credentials', () => {
		cy.visit(BASE_URL);
		cy.url().should('include', 'login');
		cy.get('[data-cy="email"]').type('test21@gmail.com');
		cy.get('[data-cy="password"]').type('pass1234Treqreq');
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
});
