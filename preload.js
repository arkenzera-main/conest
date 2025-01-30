const { contextBridge, ipcRenderer } = require('electron')

//Estabelecer a conxão com o banco
ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api', {
    dbMensagem: (message) => ipcRenderer.on('db-message', message),

    // JANELAS
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report'),

    // CRUD CREATE
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),

    // CRUD READ
    buscarCliente: (cliNome) => ipcRenderer.send('search-client', cliNome),
    buscarFornecedor: (fornNome) => ipcRenderer.send('search-supplier', fornNome),
    buscarProduto: (proNome) => ipcRenderer.send('search-product', proNome),
    buscarProdutoCod: (proCod) => ipcRenderer.send('search-product', proCod),

    // SETAR NOME CLIENTE 
    setarNomeCliente: (args) => ipcRenderer.on('set-nameClient', args),

    // CRUD UPDATE
    editarCliente: (cliente) => ipcRenderer.send('update-client', cliente),
    editarFornecedor: (fornecedor) => ipcRenderer.send('update-supplier', fornecedor),
    editarProduto: (produto) => ipcRenderer.send('update-product', produto),

    // CRUD DELETE
    deletarCliente: (idCliente) => ipcRenderer.send('delete-client', idCliente),
    deletarFornecedor: (idFornecedor) => ipcRenderer.send('delete-supplier', idFornecedor),
    deletarProduto: (idProduto) => ipcRenderer.send('delete-product', idProduto),

    // RENDERIZAR
    renderizarCliente: (dadosCliente) => ipcRenderer.on('client-data', dadosCliente),
    renderizarFornecedor: (dadosFornecedor) => ipcRenderer.on('supplier-data', dadosFornecedor),
    renderizarProduto: (dadosProduto) => ipcRenderer.on('product-data', dadosProduto),
    renderizarProdutoCod: (dadosProdutoCod) => ipcRenderer.on('product-data', dadosProdutoCod),

    resetarFormulario: (args) => ipcRenderer.on('reset-form', args),
})
