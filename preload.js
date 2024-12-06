const { contextBridge, ipcRenderer } = require('electron')

//Estabelecer a conxão com o banco
ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api', {
    dbMensagem: (message) => ipcRenderer.on('db-message', message),
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report'),
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    buscarCliente: (cliNome) => ipcRenderer.send('search-client', cliNome),
    resetarFormulario: (args) => ipcRenderer.on('reset-form', args),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    buscarFornecedor: (fornNome) => ipcRenderer.send('search-supplier', fornNome),
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),
    buscarProduto: (proNome) => ipcRenderer.send('search-product', proNome),
    buscarProdutoCod: (proCod) => ipcRenderer.send('search-product', proCod),
    renderizarCliente: (dadosCliente) => ipcRenderer.on('client-data', dadosCliente),
    renderizarFornecedor: (dadosFornecedor) => ipcRenderer.on('supplier-data', dadosFornecedor),
    renderizarProduto: (dadosProduto) => ipcRenderer.on('product-data', dadosProduto),
    renderizarProdutoCod: (dadosProdutoCod) => ipcRenderer.on('product-data', dadosProdutoCod)
})
