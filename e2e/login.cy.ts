import { selectors } from "../utils/selectors";

const VALID_EMAIL = Cypress.env('VALID_EMAIL');
const VALID_PASSWORD = Cypress.env('VALID_PASSWORD');
const UNKNOWN_EMAIL = 'awesome.smith@superdomain.com';
const UNSECURE_PASSOWRD = 'simpl3p4$$'

describe('Login scenarios', () => {
  beforeEach(() => {
    cy.setCookie('OptanonAlertBoxClosed', 'true');
    cy.setCookie('OptanonConsent', 'isIABGlobal=false&datestamp=2025-08-18T12:00:00&version=6.3.0&hosts=&consentId=12345'); 
  });

  it('visit homepage desktop', () => {
    cy.visit('/');              
    cy.title().should('include',selectors.homepage.title);
    cy.get(selectors.homepage.buttons.loginSelect).should('exist');
  });

  it('visit homepage mobile to login', () => {
    cy.viewport(360,800);
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudlMobile).click();
      cy.checksOnLoginPage();
    });
  });

  it('ensure email is present before continue', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.checkEmailExistsValidationError();
    });
  });

  it('Show password', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.enterEmail(VALID_EMAIL);
      cy.clickLoginContinue();
      cy.enterPassword(UNSECURE_PASSOWRD);
      cy.showPassword();
      cy.origin('https://identity.hudl.com',
        { args: { selectors, UNSECURE_PASSOWRD } }, 
        ({ selectors, UNSECURE_PASSOWRD } ) => {
        cy.get(selectors.login.inputs.password).should('have.value',UNSECURE_PASSOWRD)
      });
    });
  });

  it('Edit the email provided', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.enterEmail(UNKNOWN_EMAIL);
      cy.clickLoginContinue();
      cy.clickEditEmail();
      cy.enterEmail(VALID_EMAIL);
      cy.origin('https://identity.hudl.com',
        { args: { selectors, VALID_EMAIL } }, 
        ({ selectors, VALID_EMAIL } ) => { 
        cy.get(selectors.login.inputs.username).should('have.value',VALID_EMAIL)
      });
    });
  });

  it('Visit the forgot password page', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.enterEmail(UNKNOWN_EMAIL);
      cy.clickLoginContinue();
      cy.origin('https://identity.hudl.com',
        { args: { selectors } }, 
        ({ selectors } ) => { 
        cy.contains('Forgot Password').click();  
        cy.url().should('include', 'reset-password');
      });
    });
  });

  it('Visit the sign up page', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.enterEmail(UNKNOWN_EMAIL);
      cy.clickLoginContinue();
      cy.origin('https://identity.hudl.com',
        { args: { selectors } }, 
        ({ selectors } ) => { 
        cy.contains('Create Account').click();  
        cy.url().should('include', 'signup');
      });
    });
  });

  it('login with incorrect username and password', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.loginByEmailPassword(UNKNOWN_EMAIL, UNSECURE_PASSOWRD);
    });
    cy.origin('https://identity.hudl.com',
      { args: { selectors } }, 
      ({ selectors } ) => {
      cy.contains('button', 'Continue').click().then(() => {
       cy.get(selectors.login.validation.incorrectEmailPassword).should('exist');
      });
      });
  });

  it('login with incorrect username and password', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.enterEmail(UNKNOWN_EMAIL);
      cy.clickLoginContinue();
      cy.enterPassword(UNSECURE_PASSOWRD);
      cy.clickLoginContinue();
      cy.checkEmailPasswordValidationError();
    });
  });

  it.only('login with valid username and password', () => {
    cy.visit('/');
    cy.get(selectors.homepage.buttons.loginSelect).click().then(() => {
      cy.get(selectors.homepage.buttons.loginHudl).click();
      cy.checksOnLoginPage();
      cy.loginByEmailPassword(VALID_EMAIL, VALID_PASSWORD);
    });
    cy.get(selectors.app.homeContent.home).should('be.visible');
  });
});