/**
 * Modelo de dados (Clientes)
 */

// Importação de bibliotecas
const { model, Schema } = require("mongoose")



// Criação da estrutura de dados ("tabela") que será usada no banco 
const clienteSchema = new Schema({
    nomeClient: {
        type: String
    },
    foneCliente: {
        type: String
    },
    emailClient: {
        type: String
    },
})  
// Exportar para o main
module.exports = model('Clientes', clienteSchema)