describe('Orange HRM Tests', () => {

  const selectorList = {  
      usernameField: "[name='username']",
      passwordField: "[placeholder='Password']",  
      loginButton: "[type='submit']",
      sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",  
      wrongCredentialAlert: '.oxd-alert-content'
  }

  it('Login - Sucess', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorList.usernameField).type('Admin')
    cy.get(selectorList.passwordField).type('admin123')
    cy.get(selectorList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorList.sectionTitleTopBar).contains('Dashboard')
  }) 
  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorList.usernameField).type('Test')
    cy.get(selectorList.passwordField).type('Test')
    cy.get(selectorList.loginButton).click()
    cy.get(selectorList.wrongCredentialAlert).should('be.visible')
  })
})