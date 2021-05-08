/// <reference types= "cypress" />


describe('Ejercicios TodoMvc', () => {
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/vanillajs')
    })

    it.skip('Crud de item', () => {
        cy.get('.new-todo').type('Prueba1')
        cy.get('.new-todo').type('{enter}')

        cy.get('ul.todo-list >li:nth-child(1)').contains('Prueba')

        cy.get('ul.todo-list >li:nth-child(1)').dblclick().clear().type('Prueba2').type('{enter}')

        cy.get('ul.todo-list >li:nth-child(1)').should('have.text', 'Prueba2')

        cy.get('ul.todo-list >li:nth-child(1) >div .toggle').click().should('be.checked')

        cy.get('ul.todo-list >li:nth-child(1) button.destroy').click({ force: true })

        cy.get('.todo-list').should('not.be.visible')

    })

    //crear varios items
    it.skip('Genera mas de un item', () => {
        var cantidad = 10
        for (let step = 1; step <= cantidad; step++) {
            cy.get('.new-todo').type('Prueba' + step)
            cy.get('.new-todo').type('{enter}')

        }

        cy.get('.todo-list > li').should(($p) => {
            expect($p).to.have.length(cantidad)
        })



    })

    it.skip('Editar solo los pares', () => {
        var cantidad = 10
        for (let step = 1; step <= cantidad; step++) {
            cy.get('.new-todo').type('Prueba' + step)
            cy.get('.new-todo').type('{enter}')

        }
        for (let step = 2; step <= cantidad; step += 2) {
            cy.get('ul.todo-list >li:nth-child(' + step + ')').dblclick().clear().type('PruebaEditada' + step).type('{enter}')
            cy.get('ul.todo-list >li:nth-child(' + step + ') >div .toggle').click().should('be.checked')

        }
        

    })
    it('Seleccionar impares', () => {
        var cantidad = 10
        for (let step = 1; step <= cantidad; step++) {
            cy.get('.new-todo').type('Prueba' + step)
            cy.get('.new-todo').type('{enter}')

        }
        for (let step = 1; step <= cantidad; step += 2) {
            cy.get('ul.todo-list >li:nth-child(' + step + ') >div .toggle').click().should('be.checked')

        }
        cy.get('a[href*="/active"]').click()
        cy.get('ul.todo-list >li:nth-child(1)').should('not.be.checked')
        cy.get('.todo-list > li').should(($p) => {
            expect($p).to.have.length(cantidad / 2)
        })

    })
})

//https://blazedemo.com