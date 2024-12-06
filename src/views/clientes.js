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


//Evento associado ao botão adicionar (quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()  //Evitar o comportamento padrão de envio em um form
    //Teste importante(fluxo de dados) console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    //Passo 2 - Slide (envio das informações para o main)
    //Criar um objeto 
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value,
        cepCli: cepCliente.value,
        dddCli: dddCliente.value,
        logradouroCli: logradouroCliente.value,
        numeroCli: numeroCliente.value,
        bairroCli: bairroCliente.value,
        cidadeCli: cidadeCliente.value,
        ufCli: ufCliente.value
    }
    api.novoCliente(cliente)
})
//Fim CRUD Creat <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
//Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameClient').value = ""
    document.getElementById('inputPhoneClient').value = ""
    document.getElementById('inputEmailClient').value = ""
    document.getElementById('inputDddClient').value = ''
    document.getElementById('inputCepClient').value = ''
    document.getElementById('inputLogradouroClient').value = ''
    document.getElementById('inputBairroClient').value = ''
    document.getElementById('inputCidadeClient').value = ''
    document.getElementById('inputNumeroClient').value = ''
    document.getElementById('inputUfClient').value = ''
    document.getElementById('inputComplementoClient').value = ''
})
//Fim - RESET FORM <<<<<<<<<<<<<<<<<<<<
