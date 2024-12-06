/*
*   Modelo de dados (produtos)
*/

const { model, Schema } = require('mongoose')

//Criação da estrutura de dados
const produtoSchema = new Schema({
    nomeProduto: {
        type: String
    },
    codProduto: {
        type: String
    },
    precoProduto: {
        type: String
    }
})

//Para modificar o nome da coleção ("tabela"), basta modificar na linha abaixo o rótulo 'Fornecedores", sempre iniciando com letra maiúscula.
module.exports = model('Produtos', produtoSchema) //Exportar para o main
