/* Processo de renderização - produtos.html */

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Passo 1 - Slide (capturar os dados dos inputs do form)
let formProduto = document.getElementById('frmProduct')
let nomeProduto = document.getElementById('inputNameProduct')
let codProduto = document.getElementById('inputBarProduct')
let precoProduto = document.getElementById('inputPrecoProduct')

//Evento associado ao botão adicionar (quando o botão for pressionado)
formProduto.addEventListener('submit', async (event) => {
    event.preventDefault()  //Evitar o comportamento padrão de envio em um form
    //Teste importante(fluxo de dados) console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    //Passo 2 - Slide (envio das informações para o main)
    //Criar um objeto 
    const produto = {
        nomePro: nomeProduto.value,
        codPro: codProduto.value,
        precoPro: precoProduto.value
    }
    api.novoProduto(produto)
})
//Fim CRUD Creat <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//CRUD READ ------------------------------------------->
function buscarProduto(){
    //PASSO 1 (slides)
    let proNome = document.getElementById('searchProduct').value
    console.log(proNome) //teste 1
    //PASSO 2
    api.buscarProduto(proNome)
    //Passo 5 - Recebimento dos dados
    api.renderizarProduto((event, dadosProduto) => {
        //Teste de recebimento dos dados do fornecedores
        console.log(dadosProduto)
        
        //Passo 6 - renderização dos dados do fornecedor no formulário
        const produtoRenderizado = JSON.parse(dadosProduto)
        arrayProduto = produtoRenderizado
        console.log(arrayProduto) //teste para entendimento da lógica
        //Percorrer o array de fornecedores, extrair os dados e setar (preencher) os campos do formulário
        arrayProduto.forEach((p) => {
            document.getElementById('inputNameProduct').value = p.nomeProduto
            document.getElementById('inputBarProduct').value = p.codProduto
            document.getElementById('inputPrecoProduct').value = p.precoProduto
    })
})
} 

//******************************* BUSCA POR CODIGO ************************************* */
function buscarProdutoCod(){
    //PASSO 1 (slides)
    let codPro = document.getElementById('searchProduct').value
    console.log(codPro) //teste 1
    //PASSO 2
    api.buscarProdutoCod(codPro)
    //Passo 5 - Recebimento dos dados
    api.renderizarProdutoCod((event, dadosProdutoCod) => {
        //Teste de recebimento dos dados do fornecedores
        console.log(dadosProdutoCod)
        
        //Passo 6 - renderização dos dados do fornecedor no formulário
        const produtoRenderizado = JSON.parse(dadosProdutoCod)
        arrayProduto = produtoRenderizado
        console.log(arrayProduto) //teste para entendimento da lógica
        //Percorrer o array de fornecedores, extrair os dados e setar (preencher) os campos do formulário
        arrayProduto.forEach((p) => {
            document.getElementById('inputNameProduct').value = p.nomeProduto
            document.getElementById('inputBarProduct').value = p.codProduto
            document.getElementById('inputPrecoProduct').value = p.precoProduto
    })
})
}
//<-----------------------------------------------------

//Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameProduct').value = ""
    document.getElementById('inputBarProduct').value = ""
    document.getElementById('inputPrecoProduct').value = ""
})
//Fim - RESET FORM <<<<<<<<<<<<<<<<<<<<
