/**
 * Processo de renderização
 * produtos.js
 */

const foco = document.getElementById('searchProduct')

//Mudar as propriedades do documento html ao iniciar a janela
document.addEventListener('DOMContentLoaded', () => {
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    foco.focus()
})

// Função para manipular o evento da tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarProduto()
    }
}

// Função para remover o manipulador do evento da tecla Enter
function restaurarEnter() {
    document.getElementById('frmProduct').removeEventListener('keydown', teclaEnter)
}

// manipulando o evento (tecla Enter)
document.getElementById('frmProduct').addEventListener('keydown', teclaEnter)

// Array usado nos métodos para manipulação da estrutura de dados 
let arrayProduto = []

// Passo 1 - slide (capturar os dados dos inputs do form)
let formProduto = document.getElementById('frmProduct')
let idProduto = document.getElementById('inputIdProduct')
let nomeProduto = document.getElementById('inputNameProduct')
let barcodeProduto = document.getElementById('inputBarcodeProduct')
let precoProduto = document.getElementById('inputPriceProduct')

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Evento associado ao botão adicionar (quando o botão for pressionado)
formProduto.addEventListener('submit', async (event) => {
    // Evitar o comportamento padrão de envio em um form
    event.preventDefault()
    // Teste importante! (fluxo dos dados)
    // console.log(nomeProduto.value, barcodeProduto.value, precoProduto.value)

    // Passo 2 - slide (envio das informações para o main)
    // Estratégia para determinar se é um novo cadastro de produto ou a edição de um produto já existente
    // Criar um objeto
    if (idProduto.value === "") {
        // Criar um objeto
        const produto = {
            nomePro: nomeProduto.value,
            barcodePro: barcodeProduto.value,
            precoPro: precoProduto.value,
        }
        api.novoProduto(produto)
    } else {
        // Criar um objeto
        const produto = {
            idPro: idProduto.value,
            nomeFor: nomeProduto.value,
            barcodePro: barcodeProduto.value,
            precoPro: precoProduto.value,
        }
        api.editarProduto(produto)
    }
})
// Fim do CRUD Create/Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscarProduto() {
    // Passo 1 (slide)
    let proNome = document.getElementById('searchProduct').value
    //validação
    if (proNome === "") {
        api.validarBusca() //validação do campo obrigatório 
        foco.focus()
    } else {
        //console.log(proNome) // teste do passo 1
        // Passo 2 (slide) - Enviar o pedido de busca do produto ao main
        api.buscarProduto(proNome)
        // Passo 5 - Recebimento dos dados do produto
        api.renderizarProduto((event, dadosProduto) => {
            // teste de recebimento dos dados do produto
            console.log(dadosProduto)
            // Passo 6 (slide) - Renderização dos dados dos produto no formulário
            const produtoRenderizado = JSON.parse(dadosProduto)
            arrayProduto = produtoRenderizado
            // teste para entendimento da lógica
            console.log(arrayProduto)
            // percorrer o array de produtos, extrair os dados e setar (preencher) os campos do formulário
            arrayProduto.forEach((c) => {
                document.getElementById('inputNameProduct').value = c.nomeProduto
                document.getElementById('inputBarcodeProduct').value = c.barcodeProduto
                document.getElementById('inputPriceProduct').value = c.precoProduto
                document.getElementById('inputIdProduct').value = c._id
                //limpar o campo de busca e remover o foco
                foco.value = ""

                foco.disabled = true
                btnRead.disabled = true
                btnCreate.disabled = true

                //foco.blur()
                //liberar os botões editar e excluir
                document.getElementById('btnUpdate').disabled = false
                document.getElementById('btnDelete').disabled = false
                //restaurar o padrão da tecla Enter
                restaurarEnter()
            })
        })
    }
    //setar o nome do produto e liberar o botão adicionar
    api.setarNomeProduto(() => {
        //setar o nome do produto       
        let campoNome = document.getElementById('searchProduct').value
        document.getElementById('inputNameProduct').focus()
        document.getElementById('inputNameProduct').value = campoNome
        //limpar o campo de busca e remover o foco
        foco.value = ""
        foco.blur()
        //liberar o botão adicionar
        btnCreate.disabled = false
        //restaurar o padrão da tecla Enter
        restaurarEnter()
    })
}
// Fim do CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read por Código de Barras >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscarProdutoPorBarcode() {
    // Passo 1 (slide)
    let barNome = document.getElementById('searchBarcode').value
    //console.log(barNome)
    if (barNome === "") {
        api.validarBusca() // Validar campo obrigatório
        getElementById('searchBarcode').focus()
    } else {
        // Passo 2 (slide) - Enviar o pedido de busca do produto ao main
        api.buscarProdutoPorBarcode(barNome)
        // Passo 5 - Recebimento dos dados do produto
        api.renderizarBarcode((event, dadosBarcode) => {
            // teste de recebimento dos dados do produto
            console.log(dadosBarcode)
            // Passo 6 (slide) - Renderização dos dados dos produto no formulário
            const barcodeRenderizado = JSON.parse(dadosBarcode)
            arrayProduto = barcodeRenderizado
            // teste para entendimento da lógica
            console.log(arrayProduto)
            // percorrer o array de produtos, extrair os dados e setar (preencher) os campos do formulário
            arrayProduto.forEach((c) => {
                document.getElementById('inputNameProduct').value = c.nomeProduto
                document.getElementById('inputBarcodeProduct').value = c.barcodeProduto
                document.getElementById('inputPriceProduct').value = c.precoProduto
                document.getElementById('inputIdProduct').value = c._id
                //limpar o campo de busca e remover o foco
                document.getElementById('searchBarcode').value = ""

                document.getElementById('searchBarcode').disabled = true
                btnRead.disabled = true
                btnCreate.disabled = true

                //foco.blur()
                //liberar os botões editar e excluir
                document.getElementById('btnUpdate').disabled = false
                document.getElementById('btnDelete').disabled = false
                //restaurar o padrão da tecla Enter
                restaurarEnter()
            })
        })
    }
    api.setarCodigoProduto(() => {
        //setar o nome do produto       
        let campoNome = document.getElementById('searchBarcode').value
        document.getElementById('inputNameProduct').focus()
        document.getElementById('inputNameProduct').value = campoNome
        //limpar o campo de busca e remover o foco
        getElementById('searchBarcode').value = ""
        getElementById('searchBarcode').blur()
        //liberar o botão adicionar
        btnCreate.disabled = false
        //restaurar o padrão da tecla Enter
        restaurarEnter()
    })
}

// Fim do CRUD Read por Código de Barras <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirProduto() {
    api.deletarProduto(idProduto.value) // Passo 1 do slide
}
// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    resetForm()
})

function resetForm() {
    // Recarregar a página
    location.reload()
}
// Fim - Reset Form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<