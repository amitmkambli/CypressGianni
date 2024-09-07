import Homepage_PO from "../../support/pageObjects/webdriver-uni/Homepage_PO"
import Contact_Us_PO from "../../support/pageObjects/webdriver-uni/Contact_Us_PO"

/// <reference types="Cypress" />

describe("contact us page testing",() => {
    Cypress.config('defaultCommandTimeout', 20000);
    const homepage_PO = new Homepage_PO();
    const contact_Us_PO = new Contact_Us_PO();

    // reading data form example.json in fixtures folder
    before(function(){
        cy.fixture('example').then(function(data){
            // this.data = data
            // if this.data does not work use below 
            globalThis.data = data
        })
    })

    beforeEach(()=>{
        // cy.visit('https://webdriveruniversity.com/')        
        // if we use only #contact-us then since the width is 0 px we get error on clicking , so we can use click({force:true})
        // cy.get('#contact-us').click({force: true})
        // cy.get('#contact-us').invoke('removeAttr','target').click({force: true})

        // cy.visit('/' + 'Contact-Us/contactus.html')
        // cy.visit(Cypress.env('webdriveruni_homepage') + '/Contact-Us/contactus.html')
        
        // const homepage_PO = new Homepage_PO();
        homepage_PO.visitHomepage();
        homepage_PO.clickOn_ContactUs_Button();
        // using pause , to resume the test we will need to manually click the resume button on test runner
        // cy.pause()
        // test wil pause for 3 seconds
        // cy.wait(3000)
    })

    it("submit page sucessfully with required fields data", () =>{

        //check current url
        cy.url().should('include','contactus.html')

        //check title
        cy.title().should('include','WebDriver | Contact Us')

        //using assertion on property, both examples are fine
        // cy.document().should('have.property','charset').and('eq','UTF-8')        
        cy.document().should('have.property','charset','UTF-8')

        cy.get('[name="first_name"]').type("Amit")
        cy.get('[name="last_name"]').type("Kambli")
        cy.get('[name="email"]').type("tester@test.co.in")
        cy.get('textarea.feedback-input').type("hello world...")
        cy.get('[type="submit"]').click()

        //chai assertion
        cy.get('h1').should('have.text','Thank You for your Message!')

    });

    //if we want to run a particular test only type '.only' after it. Only that test will be executed
    it("submit page without required fields data", () =>{

        cy.get('[name="first_name"]').type("Amit")
        cy.get('[name="last_name"]').type("Kambli")
        cy.get('textarea.feedback-input').type("hello world...")
        // cy.get('[type="submit"]').click()
        cy.contains('SUBMIT').click()

        //assert using contains
        cy.get('body').contains('Error: Invalid email address')
    });

    it("submit page with data from json in fixtures", () =>{
        
        //check current url
        cy.url().should('include','contactus.html')

        //check title
        cy.title().should('include','WebDriver | Contact Us')

        //using assertion on property, both examples are fine
        // cy.document().should('have.property','charset').and('eq','UTF-8')        
        cy.document().should('have.property','charset','UTF-8')

        cy.get('[name="first_name"]').type(data.first_name)
        cy.get('[name="last_name"]').type(data.last_name)
        cy.get('[name="email"]').type(data.email)
        cy.get('textarea.feedback-input').type(data.body)
        cy.get('[type="submit"]').click()

        //chai assertion
        cy.get('h1').should('have.text','Thank You for your Message!')

    });

    it.only("using custom command to submit page with data from json in fixtures", () =>{        
        cy.url().should('include','contactus.html')
        cy.title().should('include','WebDriver | Contact Us')     
        cy.document().should('have.property','charset','UTF-8')
        // cy.webdriverUni_ContactForm_Submission(data.first_name,data.last_name,data.email,data.body,'h1','Thank You for your Message!')
        // using environment variable configured in cypress.config.js
        cy.webdriverUni_ContactForm_Submission(Cypress.env('first_name'),data.last_name,data.email,data.body,'h1','Thank You for your Message!')
    });

    it("using custom command submit page without required fields data", () =>{
        cy.webdriverUni_ContactForm_Submission(Cypress.env('first_name'),data.last_name,'',data.body,'body','Error: Invalid email address')
    });

    it.only("using page object model submit page with data from json in fixtures", () =>{        
        cy.url().should('include','contactus.html')
        cy.title().should('include','WebDriver | Contact Us')     
        cy.document().should('have.property','charset','UTF-8')
        // cy.webdriverUni_ContactForm_Submission(data.first_name,data.last_name,data.email,data.body,'h1','Thank You for your Message!')
        // using environment variable configured in cypress.config.js
        contact_Us_PO.contactForm_Submission(Cypress.env('first_name'),data.last_name,data.email,data.body,'h1','Thank You for your Message!')
    });

    it("using page object model submit page without required fields data", () =>{
        // const contact_Us_PO = new Contact_Us_PO();
        contact_Us_PO.contactForm_Submission(Cypress.env('first_name'),data.last_name,'',data.body,'body','Error: Invalid email address')
    });

})