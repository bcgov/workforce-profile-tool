describe('Test app root', () => {
    it('Visits the root page', () => {
      cy.visit('/')
      cy.contains('Workforce Profiles Report')
    })

    it('clicking "Indicators of Progress" navigates to a new url', () => {
      cy.visit('/')
      cy.contains('Indicators of Progress').click()
      cy.contains('Indicators of Progress — By Designated Group')
      cy.url().should('include', '/indicators-of-progress')
    })

    it('clicking "2018" shows Historical data message', () => {
      cy.visit('/')
      cy.contains('Indicators of Progress').click()
      cy.contains('2018').click()
      cy.contains('Historical data')
      cy.url().should('include', '&Year=2018')
    })
/*
      additional tests might be:
      - verify organizations are locked or not depending on the tab selected
      - save as png downloads an image
      - export to csv downloads a csv file
      - . . .
    */
  })
