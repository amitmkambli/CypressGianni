const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  // const pathToConfigFile = path.resolve('CypressGianni\\config', `${file}.json`);
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`);

  if(!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found.");
    return {};
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  projectId: 'kimw3v',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // accept a configFile value or use nothing
      const file = config.env.configFile || ''

      return getConfigurationByFile(file)
    },
    specPattern:"cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    // exclude 'other' folder scripts
    excludeSpecPattern:"cypress/e2e/other/*.{js,jsx,ts,tsx,feature}",
    chromeWebSecurity: false,
    // original defaultCommandTimeout : 4000
    defaultCommandTimeout: 4000,
    // original pageLoadTimeout: 6000
    pageLoadTimeout: 6000,
    baseUrl: 'https://webdriveruniversity.com/',
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video:false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    retries:{
      runMode: 0,
      openMode: 0
    },
    env:{
      first_name:'Sarah',
      webdriveruni_homepage:'https://webdriveruniversity.com'
    }
  },
});
