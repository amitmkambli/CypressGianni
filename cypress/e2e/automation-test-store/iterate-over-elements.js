/// <reference types="cypress" />

describe("iterate over elements", () => {
    beforeEach(()=>{
        cy.visit("https://www.automationteststore.com/");
        cy.get("a[href*='product/category&path']").contains('Hair Care').click()
    })

    it("lof info of all hair care products", () => {
        cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            cy.log('Index -> ' + index + ' : ' + $el.text())
            // // $el is a wrapped jQuery element
            // if ($el.someMethod() === 'something') {
            //   // wrap this element so we can
            //   // use cypress commands on it
            //   cy.wrap($el).click()
            // } else {
            //   // do something else
            // }
          })
    });

    it("add specific products to basket", () => {
        cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            cy.log('Index -> ' + index + ' : ' + $el.text())
            if($el.text().includes('Eau Parfumee au The Vert Shampoo')){
                cy.wrap($el).click()
                //will not work
                // $el.click()
            }
          })
    });

    it("use custom commands to add specific products to basket", () => {
        cy.selectProduct('Eau Parfumee au The Vert Shampoo')
        cy.get('.bgnone').should('have.text','Eau Parfumee au The Vert Shampoo')
    });

    it("use custom commands to add specific products to basket", () => {
        cy.selectProduct('Seaweed Conditioner')
        cy.get('.bgnone').should('have.text','Seaweed Conditioner')
    });

})