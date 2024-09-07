/// <reference types="cypress" />

describe("verify variables, cypress commands, jquery commands", () => {
    it("navigating to specific pages", () => {
        cy.visit("https://www.automationteststore.com/");
        //below code is not recommended as the order of execution is not garunteed 
        //instead use cy.get("a[href*='product/category&path']").contains('Makeup').click()
        const makeupLink = cy.get("a[href*='product/category&path']").contains('Makeup')
        const skincareLink = cy.get("a[href*='product/category&path']").contains('Skincare')
        makeupLink.click()
        skincareLink.click()
    });

    it("navigating to specific products pages", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get("a[href*='product/category&path']").contains('Makeup').click()

        //below code will not work
        // const header = cy.get('.maintext')
        // //using jquery command .text() to get text of element and log it 
        // cy.log(header.text())

        cy.get('.maintext').then(function(header){
            const headertext = header.text()
            cy.log(headertext)
        })

        //$ is just for readibility and to indicate varaible is being used for jquery command
        cy.get('.maintext').then(($header)=>{
            const headertext = $header.text()
            cy.log(headertext)
            expect(headertext).to.equal('Makeup')
            expect(headertext).is.equal('Makeup')
            expect(headertext).is.eq('Makeup')
        })

    });

    it.only("search field 'First name' in contact us form and check its label", () => {
        cy.visit("https://automationteststore.com/index.php?rt=content/contact");

        //using cypress chaining commands
        cy.contains('#ContactUsFrm','Contact Us Form').find('#field_11').should('contain','First name:')

        //jquery approach
        cy.contains('#ContactUsFrm','Contact Us Form').then(text => {
            const textFirstName = text.find('#field_11').text()
            cy.log(textFirstName)
            expect(textFirstName).to.contain('First name:')
            expect(textFirstName).to.include('First name:')

            //embedded commands(closure)
            cy.get('#field_11').then(firstName =>{
                cy.log(firstName.text())
                cy.log(firstName)
            })
        })
        

    });

})