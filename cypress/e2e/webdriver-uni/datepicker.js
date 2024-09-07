/// <reference types="Cypress" />

describe("date picker",() => {
    it.only("select date from datepicker", () =>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#datepicker').invoke('removeAttr','target').click({force: true})

        // let date = new Date();
        // date.setDate(date.getDate())
        // cy.log(date.getDate())

        // let date1 = new Date()
        // date1.setDate(date1.getDate() + 5)
        // cy.log(date1.getDate())

        var date = new Date();
        date.setDate(date.getDate() + 40)

        var futureYear = date.getFullYear()
        var futureMonth = date.toLocaleString('default',{month:"long"})
        var futureDay = date.getDate()

        cy.log('future year ' + futureYear)
        cy.log('future month ' + futureMonth)
        cy.log('future day ' + futureDay)

        function selectMonthAndYear(){
            cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if(!currentDate.text().includes(futureYear)){
                    cy.get('.next').first().click()
                    selectMonthAndYear()
                }
            }).then(()=>{
                cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                    if(!currentDate.text().includes(futureMonth)){
                        cy.get('.next').first().click()
                        selectMonthAndYear()
                    }
                })
            })
            // since we are calling selectMonthAndYear() below code will not work
            // try using a if condition to check if dat element is displayed
            // .then(() =>{
            //     cy.get('.datepicker-dropdown').find('td[class="day"]').contains(futureDay).click()
            // })
        }

        function selectDay(){
            cy.get('td[class="day"]').contains(futureDay).click()
        }

        cy.get('#datepicker').click()
        // .then(() =>{
        //     selectMonthAndYear()
        // })
        selectMonthAndYear()
        selectDay()

    });



})