describe('Ta-te-ti Test', () => {
  it('se asegura de poder visitar el sitio', () => {
    cy.visit('http://localhost:3000/')
  })

  it('se asegura de que se cree el tablero', () => {
    cy.get('.app-navigation > :nth-child(7)').click();
    cy.get('#tablero')
  })

  it('prueba una jugada completa que gana X, que aparezca la WinCard y que reinicie la partida', () => {
    cy.get('#tablero > :nth-child(2) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(3) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(3) > :nth-child(2)').click();
    cy.get('#tablero > :nth-child(4) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(4) > :nth-child(3)').click();
    cy.get('.winner-card')
    cy.get('.winner-card-text').contains('Gana el jugador X')
    cy.wait(1500)
    cy.get('.winner-card > .fancy-button').click();
  })

  it('prueba una jugada completa que gana O, que aparezca la WinCard y que reinicie la partida', () => {
    cy.get('#tablero > :nth-child(2) > :nth-child(2)').click();
    cy.get('#tablero > :nth-child(2) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(3) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(3) > :nth-child(2)').click();
    cy.get('#tablero > :nth-child(4) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(4) > :nth-child(3)').click();
    cy.get('.winner-card')
    cy.get('.winner-card-text').contains('Gana el jugador O')
    cy.wait(1500)
    cy.get('.winner-card > .fancy-button').click();
  })

  it('prueba una jugada empate, que aparezca la WinCard y que reinicie la partida', () => {
    cy.get('#tablero > :nth-child(2) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(3) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(2) > :nth-child(2)').click();
    cy.get('#tablero > :nth-child(3) > :nth-child(2)').click();
    cy.get('#tablero > :nth-child(3) > :nth-child(3)').click();
    cy.get('#tablero > :nth-child(2) > :nth-child(3)').click();
    cy.get('#tablero > :nth-child(4) > :nth-child(1)').click();
    cy.get('#tablero > :nth-child(4) > :nth-child(2)').click();
    cy.get('#tablero > :nth-child(4) > :nth-child(3)').click();
    cy.get('.winner-card').contains('Empate!')
    cy.wait(1500)
    cy.get('.winner-card > .fancy-button').click();
  })

})