/**
 * Processo de renderização
 * clientes.html
 */



// Array usado nos métodos para manipulação da estrutura de dados

let arrayCliente = []




// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1 - slide (capturar os dados dos inputs do form)
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')
let CEPCliente = document.getElementById('inputCEPClient')
let NumeroCliente = document.getElementById('inputNumeroClient')
let LogradouroCliente = document.getElementById('inputLogradouroClient')
let BairroCliente = document.getElementById('inputBairroClient')
let CidadeCliente = document.getElementById('inputCidadeClient')
let UfCliente = document.getElementById('inputUfClient')
let ComplementoCliente = document.getElementById('inputComplementoClient')
let DddCliente = document.getElementById('inputDddClient')

// Evento associado ao botão adicionar (quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante! (fluxo dos dados)
    // console.log(nomeCliente.value, foneCliente.value, emailCliente.value, CEPCliente.value, NumeroCliente.value, LogradouroCliente.value, BairroCliente.value, CidadeCliente.value, UfCliente.value, ComplementoCliente.value, DddCliente.value)

    //Passo 2 - slide (envio das informações para o main)
    // criar um objeto
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value,
        CEPCli: CEPCliente.value,
        LograCli: LogradouroCliente.value,
        BaiCli: BairroCliente.value,
        CidCli: CidadeCliente.value,
        UfCli: UfCliente.value,
        CompCli: ComplementoCliente.value,
        DddCli: DddCliente.value

    }
    api.novoCliente(cliente)
})
// Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarCliente() {
    //console.log("Função buscar cliente funcionando!")

    // Passo 1 (seguindo os slides)
    let cliNome = document.getElementById('searchClient').value
    console.log(cliNome) // Teste do passo 1

    // Passo 2 (seguindo os slides) - Enviar o pedido de busca do cliente ao main.js
    api.buscarCliente(cliNome)
    
    // Passo 5 (seguindo os slides) - Recebimento dos dados do cliente
    api.renderizarCliente((event, dadosCliente) => {
        // teste de recebimento dos dados do cliente
        console.log(dadosCliente)
        // Passo 6 (seguindo os slides) - Renderização dos dados do cliente no formulário 
        const clienteRenderizado = JSON.parse(dadosCliente)
        arrayCliente = clienteRenderizado
        // Teste para entendimento da lógica 
        console.log(arrayCliente)
        // Percorrer o array de clientes, extrair os dados e setar/preencher os campos do formulário 
        arrayCliente.forEach((c) => {
            document.getElementById('inputNameClient').value = c.nomeCliente
            document.getElementById('inputPhoneClient').value = c.foneCliente
            document.getElementById('inputEmailClient').value = c.emailCliente
            document.getElementById('inputClient').value = c._id
        })
    })

    
}











// Fim CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// --------------------------------------------------------------------------

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    console.log("teste de recebimento do main - pedido para resetar o form")
    document.getElementById('inputNameClient').value = ""
    document.getElementById('inputPhoneClient').value = ""
    document.getElementById('inputEmailClient').value = ""
    document.getElementById('inputEnderecoClient').value = ""
    document.getElementById('inputCEPClient').value = ""
    document.getElementById('inputNumeroClient').value = ""
    document.getElementById('inputLogradouroClient').value = ""
    document.getElementById('inputBairroClient').value = ""
    document.getElementById('inputCidadeClient').value = ""
    document.getElementById('inputUfClient').value = ""
    document.getElementById('inputComplementoClient').value = ""
    document.getElementById('InputDddClient').value = ""
})

// Fim - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

