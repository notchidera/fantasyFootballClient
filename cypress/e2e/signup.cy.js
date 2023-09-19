/* eslint-disable no-undef */
import { BASE_URL, BASE_URL_API } from '../../src/utils/api';
const validEmail = `test${Math.ceil(Math.random() * 1000)}@gmail.com`;
const invalidEmail = 'test12@com';
const validPass = 'Pass1234!!';
const shortPass = validPass.slice(0, 4);
const lowercasePass = validPass.toLowerCase();
const uppercasePass = validPass.toUpperCase();
const noNumbersPass = 'Pass!!!!!';
const noSymbolsPass = validPass.replace('!', 'A');

const signupAttempt = (email, password, passwordConfirm) => {
	cy.visit(BASE_URL + '/signup');
	cy.get('[data-cy="email"]').type(email);
	cy.get('[data-cy="password"]').type(password);
	cy.get('[data-cy="passwordConfirm"]').type(passwordConfirm);
	cy.get('form').submit();
};

describe('User signup - missing credentials', () => {
	it('fails signup - No credentials', () => {
		cy.visit(BASE_URL + '/signup');
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - Email missing', () => {
		cy.visit(BASE_URL + '/signup');
		cy.get('[data-cy="password"]').type(validPass);
		cy.get('[data-cy="passwordConfirm"]').type(validPass);
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - Password missing', () => {
		cy.visit(BASE_URL + '/signup');
		cy.get('[data-cy="email"]').type(validEmail);
		cy.get('[data-cy="passwordConfirm"]').type(validPass);
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - PasswordConfirm missing', () => {
		cy.visit(BASE_URL + '/signup');
		cy.get('[data-cy="email"]').type(validEmail);
		cy.get('[data-cy="password"]').type(validPass);
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
});

describe('User signup - invalid credentials', () => {
	it('fails signup - invalid email', () => {
		signupAttempt(invalidEmail, validPass, validPass);
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - invalid password - Short Password', () => {
		signupAttempt(validEmail, shortPass, validPass);
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - invalid password - no Uperrcase Password', () => {
		signupAttempt(validEmail, lowercasePass, validPass);
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - invalid password - no lowerCase Password', () => {
		signupAttempt(validEmail, uppercasePass, validPass);
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - invalid password - missing numbers Password', () => {
		signupAttempt(validEmail, noNumbersPass, validPass);
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - invalid password - missing symbols Password', () => {
		signupAttempt(validEmail, noSymbolsPass, validPass);
		cy.get('#passErr').should('be.visible');
	});
	it('fails signup - invalid password - passwords not matching', () => {
		signupAttempt(validEmail, validPass, validPass + '6');
		cy.get('#passErr').should('be.visible');
	});
});

describe('User creation and deletion', () => {
	it('creates a new user', () => {
		signupAttempt(validEmail, validPass, validPass);
		cy.get('[data-cy="upload-form"]').should('be.visible');
		cy.request('DELETE', BASE_URL_API + '/api/users');
	});
	it('checks if deletion was successful', () => {
		cy.visit(BASE_URL);
		cy.url().should('include', 'login');
		cy.get('[data-cy="email"]').type(validEmail);
		cy.get('[data-cy="password"]').type(validPass);
		cy.get('form').submit();
		cy.get('#passErr').should('be.visible');
	});
});
