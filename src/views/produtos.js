/**
 * Processo de renderização
 * fornecedores.html
 */

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