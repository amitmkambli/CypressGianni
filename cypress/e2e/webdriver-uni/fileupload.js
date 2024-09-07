describe('test file upload',() =>{

    beforeEach(()=>{
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#file-upload').invoke('removeAttr','target').click({force:true})
    })

    it('upload file',() => {
        cy.get('#myFile').selectFile('cypress/fixtures/sampleproduct1.png')
        cy.get('#submit-button').click()

        cy.on('window:alert',str =>{
            expect(str).is.equal('Your file has now been uploaded!')
        })
    })

    it('upload no file',() => {
        cy.get('#submit-button').click()
    })
})