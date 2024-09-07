import AutoStore_Homepage_PO from "../../support/pageObjects/automation-test-store/Autostore_Homepage_PO"
import AutoStore_HairCare_PO from "../../support/pageObjects/automation-test-store/AutoStore_HairCare_PO";

/// <reference types="cypress" />

describe("add mulitple items to basket", () => {

    const autoStore_Homepage_PO = new AutoStore_Homepage_PO();
    const autoStore_HairCare_PO = new AutoStore_HairCare_PO();

    before(function(){
        cy.fixture("products").then(function(data){
            // this.data = data is not working hence using below code
            globalThis.data = data
        })
    })

    beforeEach(()=>{
        cy.clearAllLocalStorage()
        cy.clearCookies()
        // cy.visit("https://www.automationteststore.com/");
        // cy.get("a[href*='product/category&path']").contains('Hair Care').click()
        autoStore_Homepage_PO.accessHomepage()
        autoStore_Homepage_PO.clickOn_HairCare_Link()
    })

    it("using custom commands to add specific products to basket", () => {
        globalThis.data.productName.forEach(function(element){
            cy.addProductToBasket(element)
        })
        cy.get('.dropdown-toggle > .label').should('have.text','3')
        cy.get('.dropdown-toggle > .label').click()
        cy.get('#cart_checkout1').should('be.visible')
    });

    it("using page obejct to add specific products to basket", () => {
        autoStore_HairCare_PO.addHairCareProductsTOBasket();
    });



})