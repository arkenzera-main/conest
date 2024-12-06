/*
*   Modelo de dados (clientes)
*/

const {model, Schema} = require('mongoose')

//Criação da estrutura de dados
const clienteSchema = new Schema({
    nomeCliente:{
        type: String
    },
    foneCliente: {
        type: String
    },
    emailCliente: {
        type: String
    },
    cepCliente: {
        type: String
    },
    dddCliente: {
        type: String
    },
    logradouroCliente: {
        type: String
    },
    numeroCliente: {
        type: String
    },
    bairroCliente: {
        type: String
    },
    cidadeCliente: {
        type: String
    },
    ufCliente: {
        type: String
    }
})

//Para modificar o nome da coleção ("tabela"), basta modificar na linha abaixo o rótulo 'Clientes", sempre iniciando com letra maiúscula.
module.exports = model('Clientes', clienteSchema) //Exportar para o main
