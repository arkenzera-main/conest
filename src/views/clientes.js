let arrayCliente = [];
let currentClientId = null;

const formCliente = document.getElementById('frmClient');
const inputs = {
    nome: document.getElementById('inputNameClient'),
    fone: document.getElementById('inputPhoneClient'),
    email: document.getElementById('inputEmailClient'),
    cep: document.getElementById('inputCepClient'),
    ddd: document.getElementById('inputDddClient'),
    logradouro: document.getElementById('inputLogradouroClient'),
    numero: document.getElementById('inputNumeroClient'),
    bairro: document.getElementById('inputBairroClient'),
    cidade: document.getElementById('inputCidadeClient'),
    uf: document.getElementById('inputUfClient'),
    id: document.getElementById('inputClient')
};

// Form submission
formCliente.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const clienteData = {
        nomeCli: inputs.nome.value,
        foneCli: inputs.fone.value,
        emailCli: inputs.email.value,
        cepCli: inputs.cep.value,
        dddCli: inputs.ddd.value,
        logradouroCli: inputs.logradouro.value,
        numeroCli: inputs.numero.value,
        bairroCli: inputs.bairro.value,
        cidadeCli: inputs.cidade.value,
        ufCli: inputs.uf.value
    };

    if (currentClientId) {
        clienteData.idCli = currentClientId;
        api.editarCliente(clienteData);
    } else {
        api.novoCliente(clienteData);
    }
});

// CRUD Read
function buscarCliente() {
    const searchTerm = document.getElementById('searchClient').value;
    api.buscarCliente(searchTerm);
}

// Renderizar dados
api.renderizarCliente((event, data) => {
    const clientes = JSON.parse(data);
    arrayCliente = clientes;
    
    if (clientes.length > 0) {
        const primeiroCliente = clientes[0];
        currentClientId = primeiroCliente._id;
        
        Object.keys(inputs).forEach(key => {
            if (primeiroCliente[key.toLowerCase() + 'Cliente']) {
                inputs[key].value = primeiroCliente[key.toLowerCase() + 'Cliente'];
            }
        });
        inputs.id.value = currentClientId;
    }
});

// Delete function
function excluirCliente() {
    if (currentClientId) {
        api.deletarCliente(currentClientId);
        currentClientId = null;
    }
}

// Reset form
api.resetarFormulario(() => {
    currentClientId = null;
    Object.values(inputs).forEach(input => input.value = '');
});