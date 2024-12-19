# ProjetolojaIntegrada
Teste de loja fake

Projeto Loja integrada etapa de desafio

## Pre-requisitos

É necessário ter o Node.js e o npm instalados para executar esse projeto.

> Eu usei as versões `v18.16.1` e `9.5.1` do Node.js and npm, respectivamente. 

## Instalação

Execute `npm install` (ou `npm i`) para instalar as dependências de desenvolvimento.
Execute `npm install cypress@latest --save-dev` para instalar o pacote cypress

## Configuração

No cypress.config.js configure a urlBase

## Tests

Para executar os teste de ui execute o comando `npx cypress run` para executar em modo headless ou 
execute o comando `npx cypress open` para executar em modo interativo numa janela de visualização do ambiente de trabalho..

# Estrutura dos teste
cypress/
|-- e2e/
    |-- ui/
        |-- pages/
            |-- carrinhoDeComprarPages.js
            |-- cuponsDescontoPages.js
            |-- produtosPages.js
        |-- step_definitions/
            |-- cuponsDesconto.cy.js
    |-- fixtures
        |-- example.json
    |-- screenshots
    |-- support
        |-- commands.js
        |-- e2e.js
|-- cypress.config.js
|-- package-lock.json
|-- package.json
|-- README.md
    
___

Esse projeto foi desenvolvido por [Cintia] (https://github.com/cintiaomaas).