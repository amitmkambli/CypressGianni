/// <reference types="Cypress" />

describe("verify checkboxes",() => {
    beforeEach(()=>{
        // using custom command to navigate to homepage
        // cy.navigate_webdriveruni_Homepage()
        // cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr','target').click({force: true})
        cy.navigate_webdriveruni_Checkbox_Page()
    })
    
    it("check and validate checkboxes", () =>{
        // using default url set in cypress.config.js
        // cy.visit('/')
        // cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr','target').click({force: true})

        // cy.get('#checkboxes > :nth-child(1) > input').check()
        // cy.get('#checkboxes > :nth-child(1) > input').check().should('be.checked')
        cy.get('#checkboxes > :nth-child(1) > input').as('option-01')
        cy.get('@option-01').check()
        cy.get('@option-01').check().should('be.checked')
    });

    it("uncheck and validate checkboxes", () =>{
        // cy.visit('/')
        // cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr','target').click({force: true})

        cy.get(':nth-child(5) > input').as('option-01')
        cy.get('@option-01').uncheck({ force: true }).should('not.be.checked')
    });

    it("uncheck multiple checkboxes", () =>{
        // cy.visit('/')
        // cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr','target').click({force: true})

        cy.get("input[type='checkbox']").check(['option-1', 'option-4']).should('be.checked')
    });


})