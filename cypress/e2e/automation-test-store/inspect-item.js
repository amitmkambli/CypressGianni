/// <reference types="cypress" />

describe("inspect store items using chain of commands", () => {
    it("click on the first item", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get('#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .fixed_wrapper > .fixed > .prdocutname').click()
    });

    it("click on the first item using item text", () => {
        cy.visit("https://www.automationteststore.com/");
        //copy the innertext / text in html and not the text in UI
        //text in UI is in upper case but actual text is in camel case
        cy.get('.prdocutname').contains('Skinsheen Bronzer Stick').click().then(function(itemHeaderText){
            //.text() is jquery command
            console.log('itemHeaderText is ' + itemHeaderText.text())
        })
    });

    it.only("click on the first item using index", () => {
        cy.visit("https://www.automationteststore.com/");
        const element1 = cy.get('.fixed_wrapper').find('.prdocutname').eq(0).click()
        //element1 is of typeof object
        cy.log('type of ' + typeof element1)
        cy.log('test complete..')
    });

})