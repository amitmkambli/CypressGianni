/// <reference types="Cypress" />
describe("Handling data via webdriveruni", () => {
  beforeEach(() => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
  });

  it("Calculate and assert the total age of all users", () => {
    var userDetails = [];
    let numb = 0;
    cy.get('#thumbnail-1 td').each(($el, index, $list) => {
      userDetails[index] = $el.text();
    }).then(() => {
      var i;
      for (i = 0; i < userDetails.length; i++) {
        if (Number(userDetails[i])) {
          numb += Number(userDetails[i])
        }
        //cy.log(userDetails[i])
      }
      cy.log("Found total age: " + numb)
      expect(numb).to.eq(322)
    })
  });

  it("Calculate and assert the total age of all users", () => {
    var userDetails = [];
    let numb = 0;
    cy.get('#thumbnail-1 tr td:nth-child(3)').each(($el, index, list) => {
      userDetails[index] = $el.text();
      cy.log(userDetails[index])
    }).then(() => {
      var i;
      for (i = 0; i < userDetails.length; i++) {
        if (Number(userDetails[i])) {
          numb += Number(userDetails[i])
        }
      }
      cy.log('total -> ' + numb)
      expect(numb).to.be.equal(322)
    })
  });

  it("Calculate and assert the total age based on last name", () => {
    let numb = 0;
    cy.get('#thumbnail-1 tr').each(($el, index, list) => {
      // cy.log($el.text())
      let rowData = $el.text()
      if (rowData.includes('Jackson')) {
        cy.log(rowData)
        // cy.wrap($el).find('td:nth-child(3)').then( $age =>{
        cy.wrap($el).find('td').eq(2).then($age => {
          cy.log($age.text())
          numb += Number.parseInt($age.text())
        })
      }
    }).then(() => {
      cy.log('total age -> ' + numb)
      expect(numb).to.equal(150)
    })

  });

  it("Calculate and assert the age of a given user based on last name", () => {
    cy.get('#thumbnail-1 tr td:nth-child(2)').each(($el, index, $list) => {
      const text = $el.text()
      if (text.includes("Woods")) {
        // cy.get('#thumbnail-1 tr td:nth-child(2)').eq(index).next().then(function (age) {
        cy.get('#thumbnail-1 tr td:nth-child(2)').eq(index).next().then((age) => {
          const userAge = age.text();
          expect(userAge).to.equal("80");
        })
      }
    })
  });

});
