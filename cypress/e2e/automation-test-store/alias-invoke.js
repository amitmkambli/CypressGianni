/// <reference types="cypress" />

describe("alias and invoke", () => {
    it("validate a specific hair care product", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get("a[href*='product/category&path']").contains('Hair Care').click()

        //we use invoke to ues jquery command 'text', we then create an alias 'productThumbnail' and use it in validations
        cy.get('.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnail')
        //use @ when we use as()
        cy.get('@productThumbnail').its('length').should('be.greaterThan',5)
        cy.get('@productThumbnail').should('include','Seaweed Conditioner')

    });

    it("validate number of products on home pg and each one has 'Add to cart'", () => {
        cy.visit("https://www.automationteststore.com/");

        cy.get('.thumbnails .thumbnail').as('homepgProducts')
        cy.get('@homepgProducts').should('have.length',16)
        
        cy.get('@homepgProducts').each(($el, index, $list) => {
            // cy.wrap($el).find('.productcart').should('have.attr','title')
            // cy.wrap($el).find('.productcart').invoke('attr','title').should('contain','Add to Cart')            
            if($el.find('.productcart').attr('title')){
                cy.log('Index -> ' + index + ' : has cart icon, Price : ' + $el.text().split('$')[1])
            }
          })
    });

    it("print products names which have 'Add to cart'", () => {
        cy.visit("https://www.automationteststore.com/");

        cy.get('.thumbnails').as('thumbnails')
        cy.get('@thumbnails').find('.thumbnail').should('have.length',16)

        cy.get('@thumbnails').find('.thumbnail').each(($el, index, $list) => {
            
            if($el.find('.productcart').attr('title')){
                cy.get('.thumbnails .prdocutname').eq(index).then(text =>{
                    cy.log('Index -> ' + index + ' : ' + text.text())
                })
            }
            
          })

    });

    it("calculate total of normal and sale products", () => {
        cy.visit("https://www.automationteststore.com/");

        cy.get('.thumbnails .thumbnail').as('products')

        // cy.get('@products').find('.oneprice').each(($el, index, $list) => {
        //     cy.log($el.text())
        // })
        var itemsTotal = 0

        cy.get('.thumbnails .thumbnail').find('.oneprice').invoke('text').as('itemPrice')
        cy.get('.thumbnails .thumbnail').find('.pricenew').invoke('text').as('saleitemPrice')

        cy.get('@itemPrice').then(linkText =>{
            var itemPriceTotal = 0
            cy.log(linkText)
            var itemPrice = linkText.split('$')
            for(let i = 0; i < itemPrice.length;i++){
                cy.log(i +' -> '+ itemPrice[i])
                itemPriceTotal += Number(itemPrice[i])
            }
            itemsTotal += itemPriceTotal
            cy.log('total normal item price : '+itemPriceTotal)
        })

        cy.get('@saleitemPrice').then(linkText =>{
            var saleitemPriceTotal = 0
            cy.log(linkText)
            var saleitemPrice = linkText.split('$')
            for(let i = 0; i < saleitemPrice.length;i++){
                cy.log(i +' -> '+ saleitemPrice[i])
                saleitemPriceTotal += Number(saleitemPrice[i])
            }
            itemsTotal += saleitemPriceTotal
            cy.log('total normal item price : '+saleitemPriceTotal)
        }).then( () => {
            cy.log('total price : ' + itemsTotal)
            expect(itemsTotal).is.lessThan(900)
        })
        
        cy.get('.thumbnails .thumbnail').find('.oneprice','.pricenew').invoke('text').as('price')
        cy.get('@price').then( price =>{
            cy.log(price)
        })
    });

    it.only("calculate total of normal and sale products", () => {
        cy.visit("https://www.automationteststore.com/");
        
        cy.get('.thumbnails .thumbnail').find('.oneprice , .pricenew').invoke('text').as('price')
        cy.get('@price').then( price =>{
            cy.log(price)
        })

        let totalPrice = 0
        cy.get('.thumbnails .thumbnail').find('.oneprice , .pricenew')
        // .each(($el, index, $list) => {
        .each(($el) => {
                cy.log($el.text())
                totalPrice += Number($el.text().replace('$',''))
        }).then(()=>{
            cy.log('total price -> ' + totalPrice)
        })
        
    });

    

})