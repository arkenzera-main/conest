/**
 * Processo de renderização
 * fornecedores.html
 */

// Array usado nos métodos para manipulação da estrutura de dados

let arrayProduto = []





// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1 - slide (capturar os dados dos inputs do form)
let formProduto = document.getElementById('frmProduto')
let nomeProduto = document.getElementById('inputNomeProduto')
let codigoProduto = document.getElementById('inputCodigoProduto')
let precoProduto = document.getElementById('inputPrecoProduto')

// Evento associado ao botão adicionar (quando o botão for pressionado)
formProduto.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante! (fluxo dos dados)
    console.log(nomeProduto.value, codigoProduto.value, precoProduto.value)

    //Passo 2 - slide (envio das informações para o main)
    // criar um objeto
    const produto = {
        nomePro: nomeProduto.value,
        codigoPro: codigoProduto.value,
        precoPro: precoProduto.value
    }
    api.novoProduto(produto)
})
// Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    console.log("teste de recebimento do main - pedido para resetar o form")
    document.getElementById('inputNomeProduto').value = ""
    document.getElementById('inputCodigoProduto').value = ""
    document.getElementById('inputPrecoProduto').value = ""
})

// Fim - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarProduto() {
    //console.log("Função buscar cliente funcionando!")

    // Passo 1 (seguindo os slides)
    let proNome = document.getElementById('searchProduct').value
    console.log(proNome) // Teste do passo 1

    // Passo 2 (seguindo os slides) - Enviar o pedido de busca do cliente ao main.js
    api.buscarProduto(proNome)
    
    // Passo 5 - Recebimento dos dados do cliente
    api.renderizarProduto((event, dadosProduto) => {
        // teste de recebimento dos dados do cliente
        console.log(dadosProduto)
        // Passo 6 (seguindo os slides) - Renderização dos dados do cliente no formulário 
        const produtoRenderizado = JSON.parse(dadosProduto)
        arrayProduto = produtoRenderizado
        // Teste para entendimento da lógica 
        console.log(arrayProduto)
        // Percorrer o array de clientes, extrair os dados e setar/preencher os campos do formulário 
        arrayProduto.forEach((c) => {
            document.getElementById('inputNomeProduto').value = c.nomeProduto
            document.getElementById('inputCodigoProduto').value = c.codigoProduto
            document.getElementById('inputPrecoProduto').value = c.precoProduto
            document.getElementById('inputProduto').value = c._id
        })
    })
}











// Fim CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<