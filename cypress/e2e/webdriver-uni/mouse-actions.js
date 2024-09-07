/// <reference types="Cypress" />

describe("verify mouse actions",() => {
    it("scroll element into view", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#actions').scrollIntoView().invoke('removeAttr','target').click({force: true})
    });

    it("drag and drop", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#actions').scrollIntoView().invoke('removeAttr','target').click({force: true})
        // Simulate a left-click on a button : cy.get('button').click({ which: 1 });
        // Simulate a right-click on a button : cy.get('button').click({ which: 3 });
        cy.get('#draggable').trigger('mousedown',{which:1})
        cy.get('#droppable').trigger('mousemove').trigger('mouseup',{force:true})

    });

    it("double mouse click", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#actions').scrollIntoView().invoke('removeAttr','target').click({force: true})
        cy.get('#double-click').dblclick() 
    });

    it.only("hold down left click on given item", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#actions').scrollIntoView().invoke('removeAttr','target').click({force: true})
        cy.get('#click-box').trigger('mousedown',{which:1}).then(($element) =>{
            expect($element).to.have.css('background-color','rgb(0, 255, 0)')
        })
    });
    


})