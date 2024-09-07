/// <reference types="Cypress" />

describe("handling iframe and modals",() => {
    it.only("handle iframe and modal", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#iframe').invoke('removeAttr','target').click({force: true})

        cy.get('#frame').then($frame =>{
            const body = $frame.contents().find('body')
            cy.wrap(body).as('iframe')
        })

        cy.get('@iframe').find('#button-find-out-more').click()
        cy.get('@iframe').find('#myModal').as('modal')

        cy.get('@modal').should($expectedText =>{
            //using jquery method text()
            const text = $expectedText.text()
            expect(text).to.include('Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...')
        })
        
        cy.get('@modal').contains('Close').click()

    });



})