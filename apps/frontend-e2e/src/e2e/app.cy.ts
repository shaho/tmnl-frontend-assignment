import { getGreeting as getPageTitle } from '../support/app.po'

describe('frontend', () => {
  beforeEach(() => cy.visit('/'))

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getPageTitle().contains('Home Page')
  })
})
