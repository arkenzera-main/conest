const { contextBridge, ipcRenderer } = require('electron')

// Estabelecer a conexão com o banco (envio de pedido para o main abrir a conexão com o banco de dados)
ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api', {
    dbMensagem: (message) => ipcRenderer.on('db-message', message),
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report'),
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    buscarCliente: (cliNome) => ipcRenderer.send('searchClient', cliNome),
    renderizarCliente: (dadosCliente) => ipcRenderer.on('client-data', dadosCliente),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    buscarFornecedor: (supNome) => ipcRenderer.send('searchSupplier', supNome),
    renderizarFornecedor: (dadosFornecedor) => ipcRenderer.on('supplier-data', dadosFornecedor),
    novoProduto: (produto) => ipcRenderer.send('new-produto', produto),
    buscarProduto: (proNome) => ipcRenderer.send('searchProduct', proNome),
    renderizarProduto: (dadosProduto) => ipcRenderer.on('product-data', dadosProduto),
    resetarFormulario: (args) => ipcRenderer.on('reset-form', args),

})