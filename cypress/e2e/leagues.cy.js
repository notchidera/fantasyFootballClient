describe('Leagues API Integration', () => {
	it('Loads leagues list from API', () => {
		cy.visit('/leagues');
		cy.contains('Pro Traders League'); // Verify league name
		cy.contains('Beginner Stock League');
	});

	it('Displays league details', () => {
		cy.visit('/leagues/1'); // Use a valid league ID
		cy.contains('Pro Traders League');
		cy.contains('Prize Pool: $10,000');
	});

	it('Creates a new league', () => {
		cy.visit('/leagues/create');
		cy.get('input[placeholder="League Name"]').type('Test League');
		cy.get('input[placeholder="Prize Pool"]').type('5000');
		cy.get('button').contains('Create League').click();
		cy.url().should('include', '/leagues');
		cy.contains('Test League');
	});
});
