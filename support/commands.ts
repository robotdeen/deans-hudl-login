import { selectors } from "../utils/selectors";

Cypress.Commands.add('loginByEmailPassword', (email, password) => {
	/**
	 * This command provides the ability for the calling function to login the user with
	 * username and password supplied
     * 
	 * @param {string} email This param provides an expected valid email address
	 * @value {"name@emailDomain.com"}
	 * @param {string} password This param provides an expected valid password
	 * @value {"sup4S3cr3tP4$$w@d!"}
	 *
	 * @example
	 * cy.loginByEmailPassword('name@emailDomain.com','sup4S3cr3tP4$$w@d!');
	 */
	cy.origin('https://identity.hudl.com', 
		{ args: { selectors, email, password } },
		({ selectors, email, password  }) => {
		cy.get(selectors.login.inputs.username).type(email);
		cy.contains('button', 'Continue').click();
		cy.get(selectors.login.inputs.password).type(password, { log: false });
		cy.contains('button', 'Continue').click()
	});
});

Cypress.Commands.add('enterEmail', (email) => {
	/**
	 * This command provides the ability for the calling function to enter
	 * an email supplied
     * 
	 * @param {string} email This param provides an expected valid email address
	 * @value {"name@emailDomain.com"}
	 *
	 * @example
	 * cy.login('name@emailDomain.com','sup4S3cr3tP4$$w@d!');
	 */
	cy.origin('https://identity.hudl.com', 
		{ args: { selectors, email } },
		({ selectors, email  }) => {
		// cy.get(selectors.login.inputs.username).clear();
		cy.get(selectors.login.inputs.username).clear().type(email);
	});
});

Cypress.Commands.add('enterPassword', (password) => {
	/**
	 * This command provides the ability for the calling function to enter a password supplied
     * 
	 * @param {string} password This param provides an expected valid email address
	 * @value {"sup4S3cr3tP4$$w@d"}
	 *
	 * @example
	 * cy.enterPassword('sup4S3cr3tP4$$w@d!');
	 */
	cy.origin('https://identity.hudl.com', 
		{ args: { selectors, password } },
		({ selectors, password  }) => {
		cy.get(selectors.login.inputs.password).clear().type(password, { log: false });
	});
});

Cypress.Commands.add('checksOnLoginPage', () => {
	/**
	 * This command checks that the login form email element is visible
	 *
	 * @example
	 * cy.gotoLoginPage();
	 */
	// cy.get(selectors.homepage.buttons.loginHudl).click();
	cy.origin('https://identity.hudl.com',
		{ args: { selectors } }, 
		({ selectors}) => {
		cy.get(selectors.login.inputs.username).should('be.visible');
	});
});

Cypress.Commands.add('clickLoginContinue', () => {
	/**
	 * This command clicks on the 'continue' button on the login page
	 *
	 * @example
	 * cy.clickLoginContinue();
	 */
	cy.origin('https://identity.hudl.com',
		{ args: { selectors } }, 
		({ selectors}) => {
		cy.contains('button', 'Continue').click();
	});
});

Cypress.Commands.add('checkEmailExistsValidationError', () => {
	/**
	 * This command checks that the validation error is caused
	 * when no email is provided when clicking continue
	 * 
	 * @example
	 * cy.checkEmailExistsValidationError();
	 */
	cy.origin('https://identity.hudl.com',
        { args: { selectors } }, 
        ({ selectors } ) => {
        cy.contains('button', 'Continue').click();
        cy.get(selectors.login.validation.emailRequired).should('exist');
    });
});

Cypress.Commands.add('showPassword', () => {
	/**
	 * This command toggles the showing of the password
	 *
	 * @example
	 * cy.showPassword();
	 */
	cy.origin('https://identity.hudl.com',
        { args: { selectors } }, 
        ({ selectors } ) => {
        cy.get(selectors.login.inputs.showPassword).click();
    });
});

Cypress.Commands.add('clickEditEmail', () => {
	/**
	 * This command cclick on edit to allow the changing of email
	 *
	 * @example
	 * cy.clickEditEmail();
	 */
	cy.origin('https://identity.hudl.com',
        { args: { selectors } }, 
        ({ selectors } ) => {
        cy.get(selectors.login.inputs.editUsername).click();
    });
});

Cypress.Commands.add('checkEmailPasswordValidationError', () => {
	/**
	 * This command checks that the validation error is caused
	 * when no email is provided when clicking continue
	 * 
	 * @example
	 * cy.checkEmailExistsValidationError();
	 */
	cy.origin('https://identity.hudl.com',
        { args: { selectors } }, 
        ({ selectors } ) => {
        cy.get(selectors.login.validation.incorrectEmailPassword)
		.should('contain.text', 'Incorrect');
    });
});