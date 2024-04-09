const path = require('path')
const downloadsFolder = Cypress.config('downloadsFolder')

describe('test indicators of progress page', () => {
  it('clicking "Indicators of Progress" navigates to a new url', () => {
    cy.visit('/')

    // Click Indicators of Progress tab at the top
    // Verify you are on the correct page
    // Verify url includes /indicators-of-progress
  })

  it('verify downloading a PDF', () => {
    cy.visit('/#/indicators-of-progress')

    // Save a PNG, and verify existance
  })

  it('verify downloading a CSV', () => {
    cy.visit('/#/indicators-of-progress')

    // Save a CSV, and verify existance
  })
})
