/* Processo de renderização - clientes.html */

//Array usado nos métodos para manipulação da estrutura de dados
let arrayCliente = []
//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Passo 1 - Slide (capturar os dados dos inputs do form)
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')
let cepCliente = document.getElementById('inputCepClient')
let dddCliente = document.getElementById('inputDddClient')
let logradouroCliente = document.getElementById('inputLogradouroClient')
let numeroCliente = document.getElementById('inputNumeroClient')
let bairroCliente = document.getElementById('inputBairroClient')
let cidadeCliente = document.getElementById('inputCidadeClient')
let ufCliente = document.getElementById('inputUfClient')  


// CRUD Create/Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Evento associado aos botões adicionar e editar
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante! (fluxo dos dados)
    console.log(idCliente.value, nomeCliente.value, foneCliente.value, emailCliente.value)

    //Passo 2 - slide (envio das informações para o main)
    
    //Estratégia para determinar se é um novo cadastro de clientes ou a edição de um cliente já existente
    if (idCliente.value === "") {
        // criar um objeto
        const cliente = {
            nomeCli: nomeCliente.value,
            foneCli: foneCliente.value,
            emailCli: emailCliente.value
        }
        api.novoCliente(cliente)
    } else {
        // criar um novo objeto com o id do cliente
        const cliente = {
            idCli: idCliente.value,
            nomeCli: nomeCliente.value,
            foneCli: foneCliente.value,
            emailCli: emailCliente.value
        }
        api.editarCliente(cliente)
    }


})
// Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD READ ------------------------------------------->
function buscarCliente(){
    //PASSO 1 (slides)
    let cliNome = document.getElementById('searchClient').value
    console.log(cliNome) //teste 1
    //PASSO 2
    api.buscarCliente(cliNome)
    //Passo 5 - Recebimento dos dados
    api.renderizarCliente((event, dadosCliente) => {
        //Teste de recebimento dos dados do cliente
        console.log(dadosCliente)
        
        //Passo 6 - renderização dos dados do cliente no formulário
        const clienteRenderizado = JSON.parse(dadosCliente)
        arrayCliente = clienteRenderizado
        console.log(arrayCliente) //teste para entendimento da lógica
        //Percorrer o array de clientes, extrair os dados e setar (preencher) os campos do formulário
        arrayCliente.forEach((c) => {
            document.getElementById('inputNameClient').value = c.nomeCliente
            document.getElementById('inputPhoneClient').value = c.foneCliente
            document.getElementById('inputEmailClient').value = c.emailCliente
            document.getElementById('inputClient').value = c._id
            document.getElementById('inputDddClient').value = c.dddCliente
            document.getElementById('inputLogradouroClient').value = c.logradouroCliente
            document.getElementById('inputNumeroClient').value = c.numeroCliente
            document.getElementById('inputBairroClient').value = c.bairroCliente
            document.getElementById('inputCidadeClient').value = c.cidadeCliente
            document.getElementById('inputUfClient').value = c.ufCliente
            document.getElementById('inputCepClient').value = c.cepCliente
        })
    })
}

//<-----------------------------------------------------


// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirCliente() {
    api.deletarCliente(idCliente.value) //Passo 1 do slide
}
// Fim CRUD Delete





//Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameClient').value = "" //Nome
    document.getElementById('inputPhoneClient').value = "" //Fone
    document.getElementById('inputEmailClient').value = "" //Email
    document.getElementById('inputDddClient').value = "" //DDD
    document.getElementById('inputCepClient').value = "" //CEP
    document.getElementById('inputLogradouroClient').value = "" //Rua
    document.getElementById('inputBairroClient').value = "" // Bairro
    document.getElementById('inputCidadeClient').value = "" // Cidade
    document.getElementById('inputNumeroClient').value = "" // Numero
    document.getElementById('inputUfClient').value = "" // Cidade Sigla
    document.getElementById('inputComplementoClient').value = "" // Complemento
})
//Fim - RESET FORM <<<<<<<<<<<<<<<<<<<<
