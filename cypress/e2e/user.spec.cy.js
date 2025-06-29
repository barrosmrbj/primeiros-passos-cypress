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
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage' 
import MenuPage from '../pages/menuPage'
import MyInfoPage from '../pages/myInfoPage'

const Chance = require('chance')

const chance = new Chance()
const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
const myInfoPage = new MyInfoPage()

describe('Orange HRM Tests', () => {

  it('User Info Update - Sucess', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSucess.username, userData.userSucess.password)

    dashboardPage.checkDashboardPage()
    menuPage.acessMyInfo()
    myInfoPage.fillPersonalDetails(chance.first(), chance.last(), chance.string())
    myInfoPage.fillEmploymentDetails('EmployTest', 'OtherIdTest', 'DriverLicenseTest', 'SSNNumberTest', 'SINNumberTest')
    myInfoPage.fillStatus()
    myInfoPage.saveForm() 

  }) 
 
})