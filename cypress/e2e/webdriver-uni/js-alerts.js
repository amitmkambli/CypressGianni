/// <reference types="Cypress" />

describe("handle js alerts",() => {
    
    it("validate alert text", () =>{
        cy.visit('https://webdriveruniversity.com/')
        // if we use only #contact-us then since the width is 0 px we get error on clicking , so we can use click({force:true})
        cy.get('#popup-alerts').invoke('removeAttr','target').click({force: true})
        cy.url().should('include','Popup-Alerts')
        
        cy.get('#button1').click()

        cy.on('window:alert',str =>{
            expect(str).is.equal('I am an alert box!')
        })

    });

    it("validate confirm alert text - ok", () =>{
        cy.visit('https://webdriveruniversity.com/')
        // if we use only #contact-us then since the width is 0 px we get error on clicking , so we can use click({force:true})
        cy.get('#popup-alerts').invoke('removeAttr','target').click({force: true})
        cy.url().should('include','Popup-Alerts')
        
        //click ok
        cy.get('#button4').click()
        // cy.on('window:alert',str =>{
        cy.on('window:confirm',str =>{
            return true;
        })
        cy.get('#confirm-alert-text').contains('You pressed OK!')
    });

    it("validate confirm alert text - cancel", () =>{
        cy.visit('https://webdriveruniversity.com/')
        // if we use only #contact-us then since the width is 0 px we get error on clicking , so we can use click({force:true})
        cy.get('#popup-alerts').invoke('removeAttr','target').click({force: true})
        cy.url().should('include','Popup-Alerts')
        
        //click on cancel
        cy.get('#button4').click()
        //default behaviour for confirm is cancel hence to cance we need to use window:confirm and to accept use window:alert
        cy.on('window:confirm',(str) =>{
            return false;
        })
        cy.get('#confirm-alert-text').contains('You pressed Cancel!')

    });

    it.only("validate alert box using stub", () =>{
        cy.visit('https://webdriveruniversity.com/')
        // if we use only #contact-us then since the width is 0 px we get error on clicking , so we can use click({force:true})
        cy.get('#popup-alerts').invoke('removeAttr','target').click({force: true})
        cy.url().should('include','Popup-Alerts')
        
        const stub = cy.stub()
        cy.on('window:confirm', stub)

        cy.get('#button4').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Press a button!')
        }).then(()=>{
            return true;
        }).then(()=>{
            cy.get('#confirm-alert-text').contains('You pressed OK!')
        })


    });


})