/* 
    Iniciar o gitbash e rodar o comando:
    npx cypress open
    ou
    npx cypress run --spec cypress/e2e/login.spec.cy.js
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
      wrongCredentialAlert: '[role="alert"]'
  }

  it('Login - Sucess', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type(userData.userSucess.username)
    cy.get(selectorList.passwordField).type(userData.userSucess.password)
    cy.get(selectorList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorList.dashboardGrid)
  }) 
  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type(userData.userFail.username)
    cy.get(selectorList.passwordField).type(userData.userFail.password)
    cy.get(selectorList.loginButton).click()
    cy.get(selectorList.wrongCredentialAlert).should('be.visible')
  })
})