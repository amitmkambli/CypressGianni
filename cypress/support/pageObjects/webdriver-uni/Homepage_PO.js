class Homepage_PO{
    visitHomepage(){
        // cy.visit(Cypress.env("webdriveruni_homepage"))
        // adding time out for each command
        cy.visit(Cypress.env("webdriveruni_homepage"), {timeout: 60000})
    }
    
    clickOn_ContactUs_Button(){
        // cy.get('#contact-us').invoke('removeAttr','target').click({force: true})
        // adding time out for each command
        cy.get('#contact-us').invoke('removeAttr','target').click({force: true},{timeout:8000})
    }
}
export default Homepage_PO;