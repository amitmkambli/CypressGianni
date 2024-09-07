/// <reference types="Cypress" />

describe("verify home page links",() => {
    it.only("verify link redirect to correct page", () =>{
        cy.visit('https://webdriveruniversity.com/')
        // if we use only #contact-us then since the width is 0 px we get error on clicking , so we can use click({force:true})
        cy.get('#contact-us').invoke('removeAttr','target').click({force: true})
        cy.url().should('include','contactus.html')
        cy.go('back')
        //reload without using cache
        cy.reload()

        cy.go('forward')
        cy.url().should('include','contactus.html')

        cy.go('back')
        cy.get('#login-portal').invoke('removeAttr','target').click({force: true})
        cy.url().should('include','Login-Portal')

        cy.go('back')
        cy.get('#to-do-list').invoke('removeAttr','target').click({force: true})
        cy.url().should('include','To-Do-List')
        



    });


})