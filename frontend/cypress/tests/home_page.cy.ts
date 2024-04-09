describe('test home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('home page content displayed', () => {
    cy.contains('Workforce Profiles Report')
    cy.contains('please visit the BC Stats website.')
    cy.contains('Hiring and Flow data:')
    cy.contains('Caveats')
    cy.contains('Contact')
  })

  it('sidebar loaded correctly', () => {
    cy.contains('Data Year')
    cy.url().should('include', 'Year=2022')
    cy.contains('Auxiliary')
    cy.contains('Designated Group')
    cy.contains('Organization')
  })

  it('clicking "2018" shows Historical data message', () => {
    cy.visit('/')
    cy.contains('Indicators of Progress').click()
    cy.contains('2018').click()
    cy.contains('Historical data')
    cy.url().should('include', 'Year=2018')
  })
  /*
      additional tests might be:
      - verify organizations are locked or not depending on the tab selected
      - save as png downloads an image
      - export to csv downloads a csv file
      - . . .
    */
})
