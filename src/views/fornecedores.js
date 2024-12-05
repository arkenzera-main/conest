/**
 * Processo de renderização
 * fornecedores.html
 */


// Array usado nos métodos para manipulação da estrutura de dados

let arrayFornecedor = []



// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1 - slide (capturar os dados dos inputs do form)
let formFornecedor = document.getElementById('frmFornecedor')
let razaoFornecedor = document.getElementById('inputRazaoFornecedor')
let foneFornecedor = document.getElementById('inputPhoneFornecedor')
let siteFornecedor = document.getElementById('inputSiteFornecedor')

// Evento associado ao botão adicionar (quando o botão for pressionado)
formFornecedor.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante! (fluxo dos dados)
    console.log(razaoFornecedor.value, foneFornecedor.value, siteFornecedor.value)

    //Passo 2 - slide (envio das informações para o main)
    // criar um objeto
    const fornecedor = {
        razaoFor: razaoFornecedor.value,
        foneFor: foneFornecedor.value,
        siteFor: siteFornecedor.value
    }
    api.novoFornecedor(fornecedor)
})
// Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    console.log("teste de recebimento do main - pedido para resetar o form")
    document.getElementById('inputRazaoFornecedor').value = ""
    document.getElementById('inputPhoneFornecedor').value = ""
    document.getElementById('inputSiteFornecedor').value = ""
})

// Fim - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarFornecedor() {
    //console.log("Função buscar cliente funcionando!")

    // Passo 1 (seguindo os slides)
    let supNome = document.getElementById('searchSupplier').value
    console.log(supNome) // Teste do passo 1

    // Passo 2 (seguindo os slides) - Enviar o pedido de busca do cliente ao main.js
    api.buscarFornecedor(supNome)
    
    // Passo 5 - Recebimento dos dados do cliente
    api.renderizarFornecedor((event, dadosFornecedor) => {
        // teste de recebimento dos dados do cliente
        console.log(dadosFornecedor)
        // Passo 6 (seguindo os slides) - Renderização dos dados do cliente no formulário 
        const fornecedorRenderizado = JSON.parse(dadosFornecedor)
        arrayFornecedor = fornecedorRenderizado
        // Teste para entendimento da lógica 
        console.log(arrayFornecedor)
        // Percorrer o array de clientes, extrair os dados e setar/preencher os campos do formulário 
        arrayFornecedor.forEach((c) => {
            document.getElementById('inputRazaoFornecedor').value = c.razaoFornecedor
            document.getElementById('inputPhoneFornecedor').value = c.foneFornecedor
            document.getElementById('inputSiteFornecedor').value = c.siteFornecedor
            document.getElementById('inputFornecedor').value = c._id
        })
    })
}











// Fim CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<