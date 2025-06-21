/* 
    Iniciar o gitbash e rodar o comando:
    npx cypress open      ou        npx cypress run --spec cypress/e2e/login.spec.cy.js
    Para rodar o teste de login do Orange HRM.
    O Cypress deve estar instalado na pasta do projeto.
    O Cypress é uma ferramenta de teste de front-end para aplicações web.
    Mais informações em: https://docs.cypress.io/guides/getting-started/writing-your-first-test
    O Orange HRM é uma aplicação de gerenciamento de recursos humanos de código aberto.
    Mais informações em: https://www.orangehrm.com/
    Este teste verifica o login com credenciais corretas e incorretas.
    O teste de login com credenciais corretas deve redirecionar para a página de dashboard.
    O teste de login com credenciais incorretas deve exibir uma mensagem de erro.
    O teste utiliza o Cypress para automatizar o navegador e verificar os elementos da página.
*/

import userData from '../fixtures/user-data.json'

describe('Orange HRM Tests', () => {

  const selectorList = {  
      usernameField: "[name='username']",
      passwordField: "[placeholder='Password']",  
      loginButton: "[type='submit']",
      sectionTitle: ".oxd-topbar-header-breadcrumb-module",
      dashboardGrid: ".orangehrm-dashboard-grid",  
      wrongCredentialAlert: '[role="alert"]',
      myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
      firstNameField: "[name='firstName']",
      lastNameField: "[name='lastName']",
      genericField: ".oxd-input--active",
      genericDateField: "[placeholder='yyyy-dd-mm']",
      dateCloseButton: ".--close",
      submitButton: "[type='submit']"
  }

  it.only('User Info Update - Sucess', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type(userData.userSucess.username)
    cy.get(selectorList.passwordField).type(userData.userSucess.password)
    cy.get(selectorList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorList.dashboardGrid)
    cy.get(selectorList.myInfoButton).click() 
    cy.get(selectorList.firstNameField).clear().type('FirstNametest')
    cy.get(selectorList.lastNameField).clear().type('LastNametest')
    cy.get(selectorList.genericField).eq(3).clear().type('EmployTest')
    cy.get(selectorList.genericField).eq(4).clear().type('OtherIdTest')
    cy.get(selectorList.genericField).eq(5).clear().type('DriverLicenseTest')
    cy.get(selectorList.genericDateField).eq(0).clear().type('2025-12-31')
    cy.get(selectorList.dateCloseButton).click()
    cy.get(selectorList.genericDateField).eq(1).clear().type('2023-12-31')
    cy.get(selectorList.dateCloseButton).click()
    cy.get(selectorList.submitButton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get(".oxd-toast-close")
     

  }) 
  it('User - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type(userData.userFail.username)
    cy.get(selectorList.passwordField).type(userData.userFail.password)
    cy.get(selectorList.loginButton).click()
    cy.get(selectorList.wrongCredentialAlert).should('be.visible')
  }) 
})