/**
 * Modelo de dados (Clientes)
 */

//importação de bibliotecas
const { model, Schema } = require('mongoose')

//criação da estrutura de dados ("tabela") que será usada no banco
const clienteSchema = new Schema({
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    emailCliente: {
        type: String
    },
    CEPCliente: {
        type: String
    },
    LogradouroCliente: {
        type: String
    },
    BairroCliente: {
        type: String
    },
    CidadeCliente: {
        type: String
    },
    UfCliente: {
        type: String
    },
    ComplementoCliente: {
        type: String
    },
    DddCliente: {
        type:Number
    }

})

// exportar para o main
module.exports = model('Clientes', clienteSchema)
