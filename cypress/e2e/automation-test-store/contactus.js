/// <reference types="cypress" />

describe("Test Contact Us form via Automation Test Store", () => {
    // creating an alias for json file in fixtures folder
    before(function(){
        cy.viewport(550,750)
        cy.fixture('userDetails').as('user')
    })

    it("Should be able to submit a successful submission via contact us form", () => {
        cy.visit("https://www.automationteststore.com/");
        // cy.get("a[href$='contact']").click();
        cy.get("a[href$='contact']").click().then(function(contactUsLink){
            //text() is jquery command, need to use then for non cypres commands
            //contactUsLink is object passed from previous command '.click()'
            cy.log('contact us link text: '+contactUsLink.text())
        });
        //cy.xpath("//a[contains(@href, 'contact')]").click();
        cy.get('#ContactUsFrm_first_name').type("Joe");
        cy.get('#ContactUsFrm_email').type("joe_blogs123@gmail.com");
        //chai jquery assertion
        cy.get('#ContactUsFrm_email').should('have.attr','name','email')
        cy.get('#ContactUsFrm_enquiry').type("Do you provide additional discount on bulk orders?")
        cy.get("button[title='Submit']").click();
        //chai assertion
        cy.get('.mb40 > :nth-child(3)').should('have.text','Your enquiry has been successfully sent to the store owner!')
    });

    it.only("using alias to read data from json file in fixtures folder", {
        retries:{
            runMode: 0,
            openMode: 0
        }
    }, () => {
        cy.visit("https://www.automationteststore.com/");
        // below line when uxing custom congif file as the base url is automationteststore.com
        // cy.visit("/");
        // cy.get("a[href$='contact']").click();
        cy.get("a[href$='contact']").click().then(function(contactUsLink){
            //text() is jquery command, need to use then for non cypres commands
            //contactUsLink is object passed from previous command '.click()'
            cy.log('contact us link text: '+contactUsLink.text())
        });
        //cy.xpath("//a[contains(@href, 'contact')]").click();
        cy.get('@user').then(user => {
            cy.get('#ContactUsFrm_first_name').type(user.first_name);
            cy.get('#ContactUsFrm_email').type(user.email);
        })
        
        //chai jquery assertion
        cy.get('#ContactUsFrm_email').should('have.attr','name','email')
        cy.get('#ContactUsFrm_enquiry').type("Do you provide additional discount on bulk orders?")
        cy.get("button[title='Submit']").click();
        //chai assertion
        cy.get('.mb40 > :nth-child(3)').should('have.text','qqqYour enquiry has been successfully sent to the store owner!')
    });
})