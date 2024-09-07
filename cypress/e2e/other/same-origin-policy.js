/// <reference types="Cypress" />

describe("cypress web security",() => {
    it.skip("visit 2 diff domains", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.visit('https://automationteststore.com/')
 

    });

    //if we want to run a particular test only type '.only' after it. Only that test will be executed
    it("visit 2 diff domains via footer link", () =>{
        cy.visit("https://webdriveruniversity.com/")
        cy.get('#automation-test-store').invoke('removeAttr','target').click()
    });

    //does not work...
    it("Origin command", () =>{
        cy.origin("webdriveruniversity.com",() =>{
            cy.visit('/');
        })

        cy.origin("automationteststore.com",() =>{
            cy.visit('/');
        })
    });

})