/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

// Estabelecer a conexão com o banco (pedido para o main abrir a conexão com o banco de dados)
ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api', {
    dbMensagem: (message) => ipcRenderer.on('db-message', message),

    fecharJanela: () => ipcRenderer.send('close-about'),

    // Clientes
    janelaClientes: () => ipcRenderer.send('open-client'),
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    buscarCliente: (cliNome) => ipcRenderer.send('search-client', cliNome),
    renderizarCliente: (dadosCliente) => ipcRenderer.on('data-client', dadosCliente),
    editarCliente: (cliente) => ipcRenderer.send('update-client', cliente),
    deletarCliente: (idCliente) => ipcRenderer.send('delete-client', idCliente),
    setarNomeCliente: (args) => ipcRenderer.on('set-nameClient', args),

    // Fornecedores
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    buscarFornecedor: (forNome) => ipcRenderer.send('search-supplier', forNome),
    renderizarFornecedor: (dadosFornecedor) => ipcRenderer.on('data-supplier', dadosFornecedor),
    editarFornecedor: (fornecedor) => ipcRenderer.send('update-supplier', fornecedor),
    deletarFornecedor: (idFornecedor) => ipcRenderer.send('delete-supplier', idFornecedor),
    setarNomeFornecedor: (args) => ipcRenderer.on('set-nameSupplier', args),

    // Produtos
    janelaProdutos: () => ipcRenderer.send('open-products'),
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),
    buscarProduto: (proNome) => ipcRenderer.send('search-product', proNome),
    renderizarProduto: (dadosProduto) => ipcRenderer.on('data-product', dadosProduto),
    buscarProdutoPorBarcode: (barCode) => ipcRenderer.send('search-barcode', barCode),
    renderizarBarcode: (dadosBarcode) => ipcRenderer.on('data-barcode', dadosBarcode),
    editarProduto: (produto) => ipcRenderer.send('update-product', produto),
    deletarProduto: (idProduto) => ipcRenderer.send('delete-product', idProduto),
    setarNomeProduto: (args) => ipcRenderer.on('set-nameProduct', args),

        // Invoke 
    selecionarArquivo: () => ipcRenderer.invoke('open-file-dialog'),

    janelaRelatorios: () => ipcRenderer.send('open-reports'),

    resetarFormulario: (args) => ipcRenderer.on('reset-form', args),

    // Buscas - caso no digitar nome ou codigo para buscar
    validarBusca: () => ipcRenderer.send('dialog-search'),
    validarBuscaCod: () => ipcRenderer.send('dialog-searchCode'),

    // Api para abrir site na aba fornecedores
    abrirSite: (site) => ipcRenderer.send('url-site', site),

    // Mostrar erro do site
    mostrarErro: (mensagem) => ipcRenderer.send('mostrar-erro', mensagem),

    // Barcode set
    setBarcode: (callback) => ipcRenderer.on('set-barcode', callback),
    validarBuscaBarcode: () => ipcRenderer.send('validar-busca-barcode'),

})