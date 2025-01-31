/* Processo de renderização - produtos.html */

let arrayProduto = [];
let currentProductId = null;

// Elementos do formulário
const formProduto = document.getElementById('frmProduct');
const inputs = {
    nome: document.getElementById('inputNameProduct'),
    cod: document.getElementById('inputCodProduct'),
    preco: document.getElementById('inputPriceProduct'),
    id: document.getElementById('inputProduct')
};

// CRUD Create/Update
formProduto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const produtoData = {
        nomePro: inputs.nome.value,
        codPro: inputs.cod.value,
        precoPro: parseFloat(inputs.preco.value)
    };

    if (currentProductId) {
        produtoData.idPro = currentProductId;
        api.editarProduto(produtoData);
    } else {
        api.novoProduto(produtoData);
    }
});

// CRUD Read
function buscarProduto() {
    const termo = document.getElementById('searchProduct').value;
    api.buscarProduto(termo);
}

function buscarProdutoCod() {
    const termo = document.getElementById('searchProduct').value;
    api.buscarProduto({termo, tipo: 'codigo'});
}

// Renderização dos dados
api.renderizarProduto((event, data) => {
    const produtos = JSON.parse(data);
    arrayProduto = produtos;

    if (produtos.length > 0) {
        const primeiroProduto = produtos[0];
        currentProductId = primeiroProduto._id;

        inputs.nome.value = primeiroProduto.nomeProduto;
        inputs.cod.value = primeiroProduto.codProduto;
        inputs.preco.value = primeiroProduto.precoProduto.toFixed(2);
        inputs.id.value = currentProductId;
    }
});

// CRUD Delete
function excluirProduto() {
    if (currentProductId) {
        api.deletarProduto(currentProductId);
        currentProductId = null;
    }
}

// Reset Form
api.resetarFormulario(() => {
    currentProductId = null;
    Object.values(inputs).forEach(input => input.value = '');
});