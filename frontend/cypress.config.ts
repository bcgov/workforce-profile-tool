import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.specPattern = ['./cypress/tests/*.ts']
      return config
    },
    baseUrl: 'http://localhost:8080',
    specPattern: './cypress/tests/*.cy.ts',
    env: {
      GIT_DEPLOY_DIR: 'build',
      GIT_DEPLOY_BRANCH: 'gh-pages',
      GIT_DEPLOY_REPO:
        'https://github.com/plot-and-scatter/wes-workforce-profiles.git',
      SKIP_PREFLIGHT_CHECK: true,
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
})
