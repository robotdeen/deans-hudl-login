// /* global JQuery */

declare namespace Cypress {
	interface Chainable {
        checkEmailPasswordValidationError(): void;
        checkEmailExistsValidationError(): void;
        checksOnLoginPage(): void;
        clickEditEmail(): void
        clickLoginContinue(): void;
        enterEmail(email:string): void;
        enterPassword(password:string): void;
        loginByEmailPassword(email:string, password: string): void;
        showPassword(): void;
	}
}