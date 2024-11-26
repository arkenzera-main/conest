/**
 * Modelo de dados (Produtos)
 */

//importação de bibliotecas
const { model, Schema } = require('mongoose')

//criação da estrutura de dados ("tabela") que será usada no banco
const produtoSchema = new Schema({
    nomeProduto: {
        type: String
    },
    codigoProduto: {
        type: String
    },
    precoProduto: {
        type: String
    }
})

// exportar para o main
module.exports = model('Produtos', produtoSchema)
