/**
 * Modelo de dados (Clientes)
 */

//importação de bibliotecas
const { model, Schema } = require('mongoose')

//criação da estrutura de dados ("tabela") que será usada no banco
const fornecedorSchema = new Schema({
    razaoFornecedor: {
        type: String
    },
    foneFornecedor: {
        type: String
    },
    siteFornecedor: {
        type: String
    }
})

// exportar para o main
module.exports = model('Fornecedores', fornecedorSchema)
