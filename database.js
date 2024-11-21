/**
 * 
 * Uso do Mongoose

*/

const mongoose = require('mongoose')

const url = 'mongodb+srv://ademir:123senac@flusterconest.6u8u5.mongodb.net/'

// status de conexão (ícone de conexão)
let isConnected = false

const dbConnect = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// conectar
const conectar = async () => {
    if (isConnected === false) {
        try {
            await mongoose.connect(url)
            isConnected = true
            console.log(`Deu bom, conectado ao mongobd!`)
        } catch (error) {
            console.log(`Deu pau irmão! ${error}`)
        }
    }
}

// desconectar 
const desconectar = async () => {
    if (isConnected === true) {
        try {
            await mongoose.disconnect(url)
            isConnected = false
            console.log(`Desconectado do mongobd!`)
        } catch (error) {
            console.log(`Deu pau irmão! ${error}`)
        }
    }
}

// Exportar para o main as funções desejadas
module.exports = {dbConnect, desconectar}