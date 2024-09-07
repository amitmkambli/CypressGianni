/// <reference types="Cypress" />

describe("verify radiobuttons",() => {
    it("check specific radiobuttons", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr','target').click({force: true})

        cy.get('#radio-buttons').find("[type='radio']").first().click()
        // to select 2nd radio button using index
        cy.get('#radio-buttons').find("[type='radio']").eq(1).click()
    });

    it.only("validate states of radiobuttons", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr','target').click({force: true})

        cy.get('[value="lettuce"]').should('not.be.checked')
        cy.get('[value="pumpkin"]').should('be.checked')
        cy.get('[value="cabbage"]').should('be.disabled')
    });
    


})