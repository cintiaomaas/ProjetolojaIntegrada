class ProdutoPages {
    selecionarProduto(categoria){
        cy.visit(categoria);
        cy.contains('[ESTOQUE] Produto com estoque não gerenciado pela plataforma').click();
    }

    clicarBtnComprar(){
        cy.get('.comprar > .botao').click();
    }

}
export default new ProdutoPages();