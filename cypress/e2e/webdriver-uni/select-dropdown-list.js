/// <reference types="Cypress" />

describe("interact with dropdown",() => {
    it("select specific vaules from list", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr','target').click({force: true})

        // using list value
        cy.get('#dropdowm-menu-1').select("c#")
        cy.get('#dropdowm-menu-2').select("testng").should('have.value','testng')
        // using visible text
        cy.get('#dropdowm-menu-3').select("JQuery").contains('JQuery')
    });



})