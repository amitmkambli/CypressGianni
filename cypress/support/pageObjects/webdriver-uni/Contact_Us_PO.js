class Contact_Us_PO{
    contactForm_Submission(firstName,lastName,email,comment,$selector,textToLocate){
        cy.get('[name="first_name"]').type(firstName)
        cy.get('[name="last_name"]').type(lastName)
        // if(email.replace(/\s/g,"") != "") {cy.get('[name="email"]').type(email)}
        if(email.trim().length != 0) {cy.get('[name="email"]').type(email)}
        cy.get('textarea.feedback-input').type(comment)
        cy.get('[type="submit"]').click()
        //chai assertion
        cy.get($selector)
        // .pause()
        .contains(textToLocate,{timeout:2000})
        // for screnshots
cy.screenshot()
cy.screenshot('make a contact us form submission')
    }
}
export default Contact_Us_PO;