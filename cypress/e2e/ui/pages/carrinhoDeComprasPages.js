import CuponsDescontoPages from "./cuponsDescontoPages";

class CalcularValorTotalPage {

    calculaFrete(cep) {
        cy.get('#calcularFrete').type(cep);
        cy.get('#btn-frete').click();
    }

    obterValorSubtotal() {
        return cy.get('.valor-subtotal')
            .should('exist')
            .invoke('text')
            .then(text => {
                const numericText = text.replace(/[^0-9,]/g, '').replace(',', '.');
                const parsedValue = parseFloat(numericText);

                if (isNaN(parsedValue)) {
                    throw new Error(`Erro ao converter subtotal: "${text}"`);
                }
                return cy.wrap(parsedValue);
            })
    }

    calcularDesconto(subtotal, descricao) {
        if (descricao.includes('%')) {
            const percentual = parseFloat(descricao.replace('%', '')) / 100;
            return subtotal * percentual;
        } else {
            // Remove caracteres não numéricos e converte para número
            return parseFloat(descricao.replace(/[^0-9,]/g, '').replace(',', '.')); // Desconto fixo
        }
    }

    validarDescontoEmTela(descricao) {
        this.obterValorSubtotal().then(subtotal => {

            const descontoEsperado = this.calcularDesconto(subtotal, descricao);

            // Obtém o valor final (subtotal com desconto aplicado) exibido na tela
            cy.get('.valor-total')
                .invoke('text')
                .then(valorFinalText => {
                    // Remove caracteres não numéricos e converte para número
                    const valorFinal = parseFloat(valorFinalText.replace(/[^0-9,]/g, '').replace(',', '.'));

                    if (isNaN(valorFinal)) {
                        throw new Error(`Erro ao converter valor final: "${valorFinalText}"`);
                    }

                    // Valida se o valor final está correto com base no desconto aplicado
                    const valorCalculado = subtotal - descontoEsperado;
                    expect(valorFinal).to.be.closeTo(valorCalculado, 0.01);
                });
        });
    }

}
export default new CalcularValorTotalPage();