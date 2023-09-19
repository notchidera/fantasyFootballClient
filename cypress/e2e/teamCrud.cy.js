/* eslint-disable no-undef */
import { BASE_URL } from '../../src/utils/api';

describe('Team CRUD', () => {
	const teamName = 'Test Team ' + Math.ceil(Math.random() * 1000);
	it('Creates a new team', () => {
		cy.login();
		cy.get('[data-cy="add"]').click();
		cy.get('[data-cy="newTeamView"]').should('be.visible');
		cy.get('[data-cy="hideBtn"]').click();
		///ADDS A PLAYER TO THE TEAM
		cy.get('[data-cy="playerName"] > button').eq(2).click();
		/// CHECKS IF THE PLAYER HAS BEEN ADDED, THEN ADDS MORE PLAYERS
		cy.get('[data-cy="playerName"]')
			.eq(2)
			.then(($player) => {
				const text = $player.text().trim();
				cy.get('[data-cy="hideShow"]').click();
				cy.get(`[data-cy="${text}"]`).should('be.visible');
				cy.get('[data-cy="hideBtn"]').click();
				cy.get('[data-cy="playerName"] > button').eq(120).click();
				cy.get('[data-cy="playerName"] > button').eq(140).click();
				cy.get('[data-cy="playerName"] > button').eq(180).click();
				cy.get('[data-cy="playerName"] > button').eq(280).click();
				cy.get('[data-cy="hideShow"]').click();
				// ADDS A NAME AND SAVES IT
				cy.get('[data-cy="teamName"]').type(teamName);
				cy.contains('Save').click();
				cy.contains('Save and close').click();
			});
	});
	it('Edits a team', () => {
		cy.login();
		cy.get('[data-cy="teams"]').click();
		cy.contains(teamName).click();
		cy.get(`[data-cy="edit-${teamName}"]`).should('be.visible').click();
		cy.url().should('eq', BASE_URL + '/');
		cy.get('[data-cy="playerName"] > button').eq(22).click();
		cy.get('[data-cy="playerName"]')
			.eq(22)
			.then(($player) => {
				const text = $player.text().trim();
				cy.get('[data-cy="hideShow"]').click();
				cy.get(`[data-cy="${text}"]`).should('be.visible');
				cy.contains('Save and close').click({ multiple: true });
			});
	});
	it('Deletes a team', () => {
		cy.login();
		cy.get('[data-cy="teams"]').click();
		cy.contains(teamName).click();
		cy.get(`[data-cy="delete-${teamName}"]`)
			.should('be.visible')
			.click({ multiple: true });
	});
});
