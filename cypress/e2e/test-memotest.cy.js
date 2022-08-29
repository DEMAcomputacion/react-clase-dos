describe('Memotest Test', () => {
    it('se asegura de poder visitar el sitio', () => {
      cy.visit('http://localhost:3000/')
    })
  
    it('se asegura de que se cree el tablero', () => {
      cy.get('.app-navigation > :nth-child(8)').click();
      cy.get('#tablero')
    })

  })