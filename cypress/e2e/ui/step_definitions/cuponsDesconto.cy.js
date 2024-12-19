/// <reference types="cypress" />
import CuponsDescontoPages from "../pages/cuponsDescontoPages";
import ProdutosPages from "../pages/produtoPages";
import CarrinhoDeComprasPages from "../pages/carrinhoDeComprasPages";


describe('valida funcionalidade de cupom de desconto no carrinho de compras', () => {
  const categoria = '/categoria/15610613.html';
  const cep = '01153-000';
  const cupons = [
    { codigo: '10OFF', descricao: '10%' },
    { codigo: 'AJJFLWBHH', descricao: '5%' }
  ];

  before(() => {
    cy.visit('/');
  });

  cupons.forEach(({codigo, descricao }) => {
    it.only(`TC001 - Validar cupom de ${codigo} valido`, () => {
      ProdutosPages.selecionarProduto(categoria);
      ProdutosPages.clicarBtnComprar();
      CuponsDescontoPages.aplicarCupom(codigo, true);
      cy.get('.cupom-valor').should('contain', descricao);
      CarrinhoDeComprasPages.validarDescontoEmTela(descricao);
    })
  })

  it('TC001 - Valida cupom de FRETEGRATIS valido',()=>{
    const codigo = 'FRETEGRATIS';
    const descricao = 'Frete Grátis';

    ProdutosPages.selecionarProduto(categoria);
    ProdutosPages.clicarBtnComprar();
    CarrinhoDeComprasPages.calculaFrete(cep);
    CuponsDescontoPages.aplicarCupom(codigo, true);
    cy.get('.formas-envio').should('contain','0,00', descricao)
      .find('input[type="radio"]')
      .check()
      .should('be.checked'); 
    cy.get('.cupom-valor').should('contain', descricao);

  })

  it('TC002 - Validar cupom de valor fixo',()=>{
    const codigo = '30REAIS';
    const descricao = '30,00';
    
    ProdutosPages.selecionarProduto(categoria);
    ProdutosPages.clicarBtnComprar();
    CuponsDescontoPages.aplicarCupom(codigo,true);
    cy.get('.cupom-valor').should('contain', descricao);
    CarrinhoDeComprasPages.validarDescontoEmTela(descricao)
    

  })

  it('TC005 - Validar Cupom inválido ',()=>{
    const codigo = '20LIMITADO';

    ProdutosPages.selecionarProduto(categoria);
    ProdutosPages.clicarBtnComprar();
    CuponsDescontoPages.aplicarCupom(codigo, false);
    cy.get('.alert-danger').should('be.visible').and('contain', 'Cupom não encontrado.');

  })

  it('TC007 - Validar Cupom expirado',()=>{
    const codigo = 'CUPOMVENCIDO';

    ProdutosPages.selecionarProduto(categoria);
    ProdutosPages.clicarBtnComprar();
    CuponsDescontoPages.aplicarCupom(codigo, false);
    cy.get('.alert-danger').should('be.visible').and('contain', 'O cupom não é válido.')

  })
});
