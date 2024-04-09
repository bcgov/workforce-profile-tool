const path = require('path')
const downloadsFolder = Cypress.config('downloadsFolder')

describe('test indicators of progress page', () => {
  it('clicking "Indicators of Progress" navigates to a new url', () => {
    cy.visit('/')
    cy.contains('Indicators of Progress').click()
    cy.contains('Indicators of Progress — By Designated Group')
    cy.url().should('include', '/indicators-of-progress')
  })

  it('verify downloading a PNG', () => {
    cy.visit('/#/indicators-of-progress')
    cy.contains('Save as PNG').click()
    cy.readFile(path.join(downloadsFolder, 'Progress.png'))
  })

  it('verify downloading a CSV', () => {
    cy.visit('/#/indicators-of-progress')
    cy.contains('Export data to CSV').click()
    cy.readFile(path.join(downloadsFolder, 'progress.csv'))
  })

  it('verify items are not clickable', () => {
    cy.visit('/#/organizations')
    cy.get('div')
      .should('have.class', 'Ministry_Key')
      .children()
      .find('li')
      .contains('BC Public Service')
      .nextAll()
      .should('have.class', 'locked')
  })
})
