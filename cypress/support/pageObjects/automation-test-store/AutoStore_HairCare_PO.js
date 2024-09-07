class AutoStore_HairCare_PO{
    addHairCareProductsTOBasket(){
        globalThis.data.productName.forEach(function(element){
        cy.addProductToBasket(element).then(()=>{
            debugger
        })
        })
        cy.get('.dropdown-toggle > .label').should('have.text','3')
        cy.get('.dropdown-toggle > .label').click()//.debug()
        cy.get('#cart_checkout1').should('be.visible')
    }
    
}
export default AutoStore_HairCare_PO;