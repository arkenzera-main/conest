/* Processo de renderização - fornecedores.html */

//Array usado nos métodos para manipulação da estrutura de dados
let arrayFornecedor = []
//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Passo 1 - Slide (capturar os dados dos inputs do form)
let formFornecedor = document.getElementById('frmSupplier')
let nomeFornecedor = document.getElementById('inputNameSupplier')
let foneFornecedor = document.getElementById('inputPhoneSupplier')
let siteFornecedor = document.getElementById('inputSiteSupplier')
let cepFornecedor = document.getElementById('inputCepSupplier')
let dddFornecedor = document.getElementById('inputDddSupplier')
let logradouroFornecedor = document.getElementById('inputLogradouroSupplier')
let numeroFornecedor = document.getElementById('inputNumeroSupplier')
let bairroFornecedor = document.getElementById('inputBairroSupplier')
let cidadeFornecedor = document.getElementById('inputCidadeSupplier')
let ufFornecedor = document.getElementById('inputUfSupplier')  

//Evento associado ao botão adicionar (quando o botão for pressionado)
formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()  //Evitar o comportamento padrão de envio em um form
    //Teste importante(fluxo de dados) console.log(nomeFornecedor.value, foneFornecedor.value, siteFornecedor.value)

    //Passo 2 - Slide (envio das informações para o main)
    //Criar um objeto 
    const fornecedor = {
        nomeForn: nomeFornecedor.value,
        foneForn: foneFornecedor.value,
        siteForn: siteFornecedor.value,        
        cepForn: cepFornecedor.value,
        dddForn: dddFornecedor.value,
        logradouroForn: logradouroFornecedor.value,
        numeroForn: numeroFornecedor.value,
        bairroForn: bairroFornecedor.value,
        cidadeForn: cidadeFornecedor.value,
        ufForn: ufFornecedor.value

    }
    api.novoFornecedor(fornecedor)
})
//Fim CRUD Creat <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//CRUD READ ------------------------------------------->
function buscarFornecedor(){
    //PASSO 1 (slides)
    let fornNome = document.getElementById('searchSupplier').value
    console.log(fornNome) //teste 1
    //PASSO 2
    api.buscarFornecedor(fornNome)
    //Passo 5 - Recebimento dos dados
    api.renderizarFornecedor((event, dadosFornecedor) => {
        //Teste de recebimento dos dados do fornecedores
        console.log(dadosFornecedor)
        
        //Passo 6 - renderização dos dados do fornecedor no formulário
        const fornecedorRenderizado = JSON.parse(dadosFornecedor)
        arrayFornecedor = fornecedorRenderizado
        console.log(arrayFornecedor) //teste para entendimento da lógica
        //Percorrer o array de fornecedores, extrair os dados e setar (preencher) os campos do formulário
        arrayFornecedor.forEach((f) => {
            document.getElementById('inputNameSupplier').value = f.nomeFornecedor
            document.getElementById('inputPhoneSupplier').value = f.foneFornecedor
            document.getElementById('inputSiteSupplier').value = f.siteFornecedor
            document.getElementById('inputSupplier').value = f._id
            document.getElementById('inputDddSupplier').value = f.dddFornecedor
            document.getElementById('inputLogradouroSupplier').value = f.logradouroFornecedor
            document.getElementById('inputNumeroSupplier').value = f.numeroFornecedor
            document.getElementById('inputBairroSupplier').value = f.bairroFornecedor
            document.getElementById('inputCidadeSupplier').value = f.cidadeFornecedor
            document.getElementById('inputUfSupplier').value = f.ufFornecedor
            document.getElementById('inputCepSupplier').value = f.cepFornecedor
        })
    })
}

//<-----------------------------------------------------



//Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameSupplier').value = ""
    document.getElementById('inputPhoneSupplier').value = ""
    document.getElementById('inputSiteSupplier').value = ""
    document.getElementById('inputDddSupplier').value = ''
    document.getElementById('inputCepSupplier').value = ''
    document.getElementById('inputLogradouroSupplier').value = ''
    document.getElementById('inputBairroSupplier').value = ''
    document.getElementById('inputCidadeSupplier').value = ''
    document.getElementById('inputNumeroSupplier').value = ''
    document.getElementById('inputUfSupplier').value = ''
    document.getElementById('inputComplementoSupplier').value = ''
})
//Fim - RESET FORM <<<<<<<<<<<<<<<<<<<<
