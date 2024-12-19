class CuponsDescontoPages{

    aplicarCupom(codigo, valido = true) {
        cy.get('#usarCupom').type(codigo);
        cy.get('#btn-cupom').click();
        if(valido){
          cy.get('.cupom-sucesso').should('be.visible');
          cy.wait(500);
        }else{
          cy.get('.cupom-sucesso').should('not.exist');
        }
      }
}
export default new CuponsDescontoPages();