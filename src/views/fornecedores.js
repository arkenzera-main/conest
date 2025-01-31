/* Processo de renderização - fornecedores.html */

let arrayFornecedor = [];
let currentSupplierId = null;

// Elementos do formulário
const formFornecedor = document.getElementById('frmSupplier');
const inputs = {
    nome: document.getElementById('inputNameSupplier'),
    fone: document.getElementById('inputPhoneSupplier'),
    site: document.getElementById('inputSiteSupplier'),
    cep: document.getElementById('inputCepSupplier'),
    ddd: document.getElementById('inputDddSupplier'),
    logradouro: document.getElementById('inputLogradouroSupplier'),
    numero: document.getElementById('inputNumeroSupplier'),
    bairro: document.getElementById('inputBairroSupplier'),
    cidade: document.getElementById('inputCidadeSupplier'),
    uf: document.getElementById('inputUfSupplier'),
    id: document.getElementById('inputSupplier')
};

// CRUD Create/Update
formFornecedor.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fornecedorData = {
        nomeForn: inputs.nome.value,
        foneForn: inputs.fone.value,
        siteForn: inputs.site.value,
        cepForn: inputs.cep.value,
        dddForn: inputs.ddd.value,
        logradouroForn: inputs.logradouro.value,
        numeroForn: inputs.numero.value,
        bairroForn: inputs.bairro.value,
        cidadeForn: inputs.cidade.value,
        ufForn: inputs.uf.value
    };

    if (currentSupplierId) {
        fornecedorData.idForn = currentSupplierId;
        api.editarFornecedor(fornecedorData);
    } else {
        api.novoFornecedor(fornecedorData);
    }
});

// CRUD Read
function buscarFornecedor() {
    const searchTerm = document.getElementById('searchSupplier').value;
    api.buscarFornecedor(searchTerm);
}

// Renderização dos dados
api.renderizarFornecedor((event, data) => {
    const fornecedores = JSON.parse(data);
    arrayFornecedor = fornecedores;

    if (fornecedores.length > 0) {
        const primeiroFornecedor = fornecedores[0];
        currentSupplierId = primeiroFornecedor._id;

        Object.keys(inputs).forEach(key => {
            if (primeiroFornecedor[key.toLowerCase() + 'Fornecedor']) {
                inputs[key].value = primeiroFornecedor[key.toLowerCase() + 'Fornecedor'];
            }
        });
        inputs.id.value = currentSupplierId;
    }
});

// CRUD Delete
function excluirFornecedor() {
    if (currentSupplierId) {
        api.deletarFornecedor(currentSupplierId);
        currentSupplierId = null;
    }
}

// Reset Form
api.resetarFormulario(() => {
    currentSupplierId = null;
    Object.values(inputs).forEach(input => input.value = '');
});