class MyInfoPage {
    selectorsList() {
        const selectors = {  
            firstNameField: "[name='firstName']",
            lastNameField: "[name='lastName']",
            genericField: ".oxd-input--active",
            genericDateField: "[placeholder='yyyy-dd-mm']",
            dateCloseButton: ".--close",
            submitButton: "[type='submit']",

            
        } 
        return selectors
    }

    fillPersonalDetails(firstName, lastName) {
        cy.get(this.selectorsList().firstNameField).clear().type(firstName)
        cy.get(this.selectorsList().lastNameField).clear().type(lastName)
        
    }

    fillEmploymentDetails(employTest, otherIdTest, driverLicenseTest){
        cy.get(this.selectorsList().genericField).eq(3).clear().type(employTest)
        cy.get(this.selectorsList().genericField).eq(4).clear().type(otherIdTest)
        cy.get(this.selectorsList().genericField).eq(5).clear().type(driverLicenseTest)
        cy.get(this.selectorsList().genericDateField).eq(0).clear().type('2025-05-06') //date expiry license
        cy.get(this.selectorsList().dateCloseButton).click()
        cy.get(this.selectorsList().genericDateField).eq(1).clear().type('2023-12-03') //date of birth
        cy.get(this.selectorsList().dateCloseButton).click()

        
    }

    fillStatus(){
        cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click()
        cy.get('.oxd-select-dropdown > :nth-child(4) > span').click()
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.get('.oxd-select-dropdown > :nth-child(3)').click() 

    }

    saveForm(){
        cy.get(this.selectorsList().submitButton).eq(0).click({ force: true})
        cy.get('body').should('contain', 'Successfully Updated')
        cy.get(".oxd-toast-close")
        
    }


}


export default MyInfoPage