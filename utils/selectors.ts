// import { title } from "process";

export const selectors = {
    homepage: {
      title: "Hudl • The leader in sports technology",  
      buttons: {
        loginSelect: "[data-qa-id='login-select']",
        loginHudl: "[data-qa-id='login-hudl']",
        loginHudlMobile: ".subnav__items > .subnavitem--icon > .subnavitem__label"
      },
      cookieBannerClose:".onetrust-close-btn-handler"
    },
    login: {
      inputs: {
        editUsername: "[data-link-name='edit-username']",
        username: "#username",
        password: "#password",
        showPassword: "[aria-label='Show password']"
      },
      buttons: {
        continue: "button[type='submit']"
      },
      validation: {
        emailRequired: "#error-cs-email-required",
        invalidEmail: "error-cs-email-invalid",
        incorrectEmailPassword: "#error-element-password"
      },
      linksText:{
        forgotPassword:"Forgot Password",
        forgotPasswordLanding:""
      }
    },
    app:{
        homeContent:{
            home: "#home-content"
        }
    }
  };