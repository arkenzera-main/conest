const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    // Conexão com o banco
    dbConnect: () => ipcRenderer.send('db-connect'),
    dbMensagem: (callback) => ipcRenderer.on('db-message', callback),

    // Controle de janelas
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report'),

    // Operações CRUD
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),

    buscarCliente: (cliNome) => ipcRenderer.send('search-client', cliNome),
    buscarFornecedor: (fornNome) => ipcRenderer.send('search-supplier', fornNome),
    buscarProduto: (proNome) => ipcRenderer.send('search-product', proNome),
    buscarProduto: (termo, tipo) => ipcRenderer.send('search-product', {termo, tipo}),

    editarCliente: (cliente) => ipcRenderer.send('update-client', cliente),
    editarFornecedor: (fornecedor) => ipcRenderer.send('update-supplier', fornecedor),
    editarProduto: (produto) => ipcRenderer.send('update-product', produto),

    deletarCliente: (idCliente) => ipcRenderer.send('delete-client', idCliente),
    deletarFornecedor: (idFornecedor) => ipcRenderer.send('delete-supplier', idFornecedor),
    deletarProduto: (idProduto) => ipcRenderer.send('delete-product', idProduto),

    // Listeners para dados
    renderizarCliente: (callback) => ipcRenderer.on('client-data', callback),
    renderizarFornecedor: (callback) => ipcRenderer.on('supplier-data', callback),
    renderizarProduto: (callback) => ipcRenderer.on('product-data', callback),

    // Controle do formulário
    resetarFormulario: (callback) => ipcRenderer.on('reset-form', callback)
});