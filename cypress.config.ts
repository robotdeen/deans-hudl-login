import { defineConfig } from 'cypress'

module.exports = defineConfig({
  e2e: {
    projectId: "zqg8on",
    experimentalStudio: true,
    downloadsFolder: 'downloads',
    baseUrl: 'http://www.hudl.com',
    screenshotsFolder: 'screenshots',
    screenshotOnRunFailure: true,
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/e2e.ts',
    video: true,
    videosFolder: 'videos',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});