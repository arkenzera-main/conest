    const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog} = require('electron/main')
    const path = require('node:path')


    //Importação do módulo de conexão
    const {dbConnect, desconectar} = require('./database.js')

    /*Status de conexão com o banco. No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo
    e usá-la quando necessário. Fechar e reabrir constantemente a conexão aumenta a sobrecarga e reduz o desempenho do servidor.*/
    //A variável abaixo é usada para garantir que o banco de dados inicie desconectado (evitar abrir outra instância)
    let dbcon = null

    //Importação do Schema Clientes da camada model
    const clienteModel = require('./src/models/Clientes.js')

    //Importação do Schema Forncedores da camada model
    const fornecedorModel = require('./src/models/Fornecedores.js')

    //Importação do Schema Produtos da camada model
    const produtoModel = require('./src/models/Produtos.js')

    let win //Janela principal
    function createWindow() {
        nativeTheme.themeSource = 'light'
        win = new BrowserWindow({
            width: 1010,
            height: 700,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        //Menu.setApplicationMenu(Menu.buildFromTemplate(template)) //Menu personalizado (comentar para debugar)
        win.loadFile('./src/views/index.html')

        //Botões
        ipcMain.on('open-client', () => {
            clientWindow()
        })
        ipcMain.on('open-supplier', () => {
            supplierWindow()
        })
        ipcMain.on('open-product', () => {
            productWindow()
        })
        ipcMain.on('open-report', () => {
            reportWindow()
        })
    }

    function aboutWindow() {
        nativeTheme.themeSource = 'light'
        const main = BrowserWindow.getFocusedWindow()
        let about
        if (main) {
            about = new BrowserWindow({
                width: 320,
                height: 240,
                autoHideMenuBar: true,
                resizable: false,
                minimizable: false,
                //titleBarStyle: 'hidden' // esconder a barra de estilo (ex.: totem de auto atendimento)
                parent: main,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
        about.loadFile('./src/views/sobre.html')

        ipcMain.on('close-about', () => {
            console.log('Recebi a mensagem close-about')
            if (about && !about.isDestroyed()) {
                about.close()
            }
        })
    }
    let client
    function clientWindow() {
        nativeTheme.themeSource = 'light'
        const main = BrowserWindow.getFocusedWindow()
        if (main) {
            client = new BrowserWindow({
                width: 1100,
                height: 950,
                //autoHideMenuBar: true,
                parent: main,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
        client.loadFile('./src/views/clientes.html')
    }

    let supplier
    function supplierWindow() {
        nativeTheme.themeSource = 'light'
        const main = BrowserWindow.getFocusedWindow()
        
        if (main) {
            supplier = new BrowserWindow({
                width: 800,
                height: 710,
                autoHideMenuBar: true,
                parent: main,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
        supplier.loadFile('./src/views/fornecedores.html')
    }

    let product
    function productWindow() {
        nativeTheme.themeSource = 'light'
        const main = BrowserWindow.getFocusedWindow()
        
        if (main) {
            product = new BrowserWindow({
                width: 800,
                height: 710,
                autoHideMenuBar: true,
                parent: main,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
        product.loadFile('./src/views/produtos.html')
    }

    let report
    function reportWindow() {
        nativeTheme.themeSource = 'light'
        const main = BrowserWindow.getFocusedWindow()
        
        if (main) {
            report = new BrowserWindow({
                width: 800,
                height: 710,
                autoHideMenuBar: true,
                parent: main,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
        report.loadFile('./src/views/relatorios.html')
    }

    app.whenReady().then(() => {
        createWindow()

        /* Melhor local para estabelecer a conexão com o banco de dados */
        //Importar antes o módulo de conexão no início do código
        ipcMain.on('db-connect', async(event, message) => {
            //A linha abaixo estabelece a conexão com o banco
            dbcon = await dbConnect()
            event.reply('db-message', "conectado")
        })

        app.on('before-quit', async () => {
            await desconectar (dbcon)
        })

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    const template = [
        {
            label: 'Arquivo',
            submenu: [
                {
                    label: 'Sair',
                    accelerator: 'Alt+F4',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Zoom',
            submenu: [
                {
                    label: 'Aplicar zoom',
                    accelerator: 'Ctrl++',
                    role: 'zoomIn'
                },
                {
                    label: 'Reduzir zoom',
                    accelerator: 'Ctrl+-',
                    role: 'zoomOut'
                },
                {
                    label: 'Restaurar o zoom padrão',
                    accelerator: 'Ctrl+0',
                    role: 'resetZoom'
                }
            ]
        },
        {
            label: 'Ajuda',
            submenu: [
                {
                    label: 'Repositório',
                    click: () => shell.openExternal('https://github.com/amanda-nogueira')
                },
                {
                    label: 'Sobre',
                    click: () => aboutWindow()
                }
            ]
        }
    ]
    //CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //Recebimento dos dados do formulário do cli
    ipcMain.on('new-client', async(event, cliente) => {
        //Teste de recebimento dos dados
        console.log(cliente)

        //Passo 3 - slide (cadastrar os dados no banco de dados)
        try {
            //Criar um novo objeto usando a classe modelo
            const novoCliente = new clienteModel({
                nomeCliente: cliente.nomeCli,
                foneCliente: cliente.foneCli,
                emailCliente: cliente.emailCli,
                cepCliente: cliente.cepCli,
                dddCliente: cliente.dddCli,
                logradouroCliente: cliente.logradouroCli,
                numeroCliente: cliente.numeroCli,
                bairroCliente: cliente.bairroCli,
                cidadeCliente: cliente.cidadeCli,
                ufCliente: cliente.ufCli
            })
            //A linha abaixo usa a biblioteca moongoose para salvar
            await novoCliente.save()

            //Confirmação de cliente adicionado no banco
            dialog.showMessageBox({
                type: 'info', 
                title: 'Aviso',
                message: 'Cliente adicionado com sucesso',
                buttons: ["ok"]
            })

            //Enviar uma resposta para o renderizador resetar o form
            event.reply('reset-form')

        } catch (error) {
            console.log(error)
        }
    })

    /************************** Fornecedores ********************************/
    ipcMain.on('new-supplier', async(event, fornecedor) => {
        //Teste de recebimento dos dados
        console.log(fornecedor)

        //Passo 3 - slide (cadastrar os dados no banco de dados)
        try {
            //Criar um novo objeto usando a classe modelo
            const novoFornecedor = new fornecedorModel({
                nomeFornecedor: fornecedor.nomeForn,
                foneFornecedor: fornecedor.foneForn,
                siteFornecedor: fornecedor.siteForn,
                cepFornecedor: fornecedor.cepForn,
                dddFornecedor: fornecedor.dddForn,
                logradouroFornecedor: fornecedor.logradouroForn,
                numeroFornecedor: fornecedor.numeroForn,
                bairroFornecedor: fornecedor.bairroForn,
                cidadeFornecedor: fornecedor.cidadeForn,
                ufFornecedor: fornecedor.ufForn
            })
            //A linha abaixo usa a biblioteca moongoose para salvar
            await novoFornecedor.save()

            //Confirmação de fornecedor adicionado no banco
            dialog.showMessageBox({
                type: 'info', 
                title: 'Aviso',
                message: 'Fornecedor adicionado com sucesso',
                buttons: ["ok"]
            })

            //Enviar uma resposta para o renderizador resetar o form
            event.reply('reset-form')

        } catch (error) {
            console.log(error)
        }
    })

    /************************* PRODUTO ********************/
    ipcMain.on('new-product', async(event, produto) => {
        //Teste de recebimento dos dados
        console.log(produto)

        //Passo 3 - slide (cadastrar os dados no banco de dados)
        try {
            //Criar um novo objeto usando a classe modelo
            const novoProduto = new produtoModel({
                nomeProduto: produto.nomePro,
                codProduto: produto.codPro,
                precoProduto: produto.precoPro
            })
            //A linha abaixo usa a biblioteca moongoose para salvar
            await novoProduto.save()

            //Confirmação de fornecedor adicionado no banco
            dialog.showMessageBox({
                type: 'info', 
                title: 'Aviso',
                message: 'Produto adicionado com sucesso',
                buttons: ["ok"]
            })

            //Enviar uma resposta para o renderizador resetar o form
            event.reply('reset-form')

        } catch (error) {
            console.log(error)
        }
    })
    // Fim do CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    ipcMain.on('dialog-search', () => {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Atenção!',
            message: 'Preencha um nome no campo de busca',
            buttons: ['OK']
        })
    })

    ipcMain.on('search-client', async (event, cliNome) => {
        //teste de recebimento do nome do cliente a ser pesquisado(passo 2)
        console.log(cliNome)
        //Passos 3 e 4 - Pesquisar no banco de dados o cliente pelo nome
        // find() -> buscar no banco de dados (mongoose)
        // RegExp -> filtro pelo nome do cliente 'i' insensitive (maiúsculo ou minúsculo)
        // Atenção: nomeCliente -> model | cliNome -> renderizador
        try {
            const dadosCliente = await clienteModel.find({
                nomeCliente: new RegExp(cliNome, 'i')
            })
            console.log(dadosCliente) // teste dos passos 3 e 4
            // Passo 5 - slide -> enviar os dados do cliente para o renderizador (JSON.stringfy converte para JSON)

            // Melhoria na experiência do usuário (se não existir o cliente cadstrado, enviar mensagem e questionar se o usuário deseja cadastrar um novo cliente)
            if(dadosCliente.length === 0) {
                dialog.showMessageBox({
                    type: 'warning',
                    title: 'Clientes',
                    message: 'Cliente não cadastrado.\nDeseja cadastrar este cliente?',
                    defaultId: 0,
                    buttons: ['Sim', 'Não']
                }).then((result) => {
                    console.log(result)
                    if (result.response === 0) {
                        //enviar ao renderizador um pedido para setar o nome do cliente (trazendo do campo de busca) e liberar o botão adicionar
                        event.reply('set-nameClient') 
                    } else {
                        //enviar ao renderizador um pedido para limpar os campos do formulário
                        event.reply('reset-form')                                   
                    }
                })
            }

            event.reply('client-data', JSON.stringify(dadosCliente))
        } catch (error) {
            console.log(error)
        }
    })

    /************************** Fornecedores ********************************/
    ipcMain.on('search-supplier', async (event, fornNome) => {
        //Teste de recebimento do nome do fornecedor a ser pesquisado
        console.log(fornNome)
        //Passo 3 e 4 - Pesquisar no banco de dados
        //Find() - Buscar no banco de dados (mongoose)
        //RegExp - Filtro pelo nome do fornecedor 'i' insensitive(maiscúlo ou minúsculo)
        try {
            const dadosFornecedor = await fornecedorModel.find({
                //nomeCliente vem do model | cliNome vem do renderizador
                nomeFornecedor: new RegExp(fornNome, 'i')
            })
            console.log(dadosFornecedor) //Teste passo 3 e 4
            //PASSO 5 (slide) Enviar os dados do fornecedor para o renderizador | para converter JSON.stringify
            event.reply('supplier-data', JSON.stringify(dadosFornecedor))
        } catch (error) {
            console.log(error)
        }
    })

    /************************* PRODUTO ********************/
    ipcMain.on('search-product', async (event, nomePro) => {
        //Teste de recebimento do nome do fornecedor a ser pesquisado
        console.log(nomePro)
        //Passo 3 e 4 - Pesquisar no banco de dados
        //Find() - Buscar no banco de dados (mongoose)
        //RegExp - Filtro pelo nome do produto 'i' insensitive(maiscúlo ou minúsculo)
        try {
            const dadosProduto = await produtoModel.find({
                //nomeProduto vem do model | proNome vem do renderizador
                nomeProduto: new RegExp(nomePro, 'i')
            })
            console.log(dadosProduto) //Teste passo 3 e 4
            //PASSO 5 (slide) Enviar os dados do produto para o renderizador | para converter JSON.stringify
            event.reply('product-data', JSON.stringify(dadosProduto))
        } catch (error) {
            console.log(error)
        }
    })

    /************************* PRODUTO CÓDIGO ********************/
    ipcMain.on('search-product', async (event, codPro) => {
        //Teste de recebimento do nome do fornecedor a ser pesquisado
        console.log(codPro)
        //Passo 3 e 4 - Pesquisar no banco de dados
        //Find() - Buscar no banco de dados (mongoose)
        //RegExp - Filtro pelo nome do produto 'i' insensitive(maiscúlo ou minúsculo)
        try {
            const dadosProduto = await produtoModel.find({
                //nomeProduto vem do model | proNome vem do renderizador
                codProduto: new RegExp(codPro, 'i')
            })
            console.log(dadosProduto) //Teste passo 3 e 4
            //PASSO 5 (slide) Enviar os dados do produto para o renderizador | para converter JSON.stringify
            event.reply('product-data', JSON.stringify(dadosProduto))
        } catch (error) {
            console.log(error)
        }
    })

    // CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    ipcMain.on('update-client', async (event, cliente) => {
        //teste de recebimento dos dados do cliente (passo 2)
        console.log(cliente)
        try {
            const clienteEditado = await clienteModel.findByIdAndUpdate(
                cliente.idCli, {
                nomeCliente: cliente.nomeCli,
                foneCliente: cliente.foneCli,
                emailCliente: cliente.emailCli,
                cepCliente: cliente.cepCli,
                dddCliente: cliente.dddCli,
                logradouroCliente: cliente.logradouroCli,
                numeroCliente: cliente.numeroCli,
                bairroCliente: cliente.bairroCli,
                cidadeCliente: cliente.cidadeCli,
                ufCliente: cliente.ufCli

            },
                {
                    new: true
                }
            )
        } catch (error) {
            console.log(error)
        }
        dialog.showMessageBox(client, {
            type: 'info',
            message: 'Dados do cliente alterados com sucesso.',
            buttons: ['OK']
        }).then((result) => {
            if (result.response === 0) {
                event.reply('reset-form')
            }
        })   
    })

    /************************** Fornecedores ********************************/
    ipcMain.on('update-supplier', async (event, fornecedor) => {
        //teste de recebimento dos dados do cliente (passo 2)
        console.log(fornecedor)
        try {
            const fornecedorEditado = await fornecedorModel.findByIdAndUpdate(
                cliente.idCli, {
                nomeFornecedor: fornecedor.nomeForn,
                foneFornecedor: fornececdor.foneForn,
                siteFornecedor: fornecedor.siteForn,
                cepFornecedor: fornecedor.cepForn,
                dddFornecedor: fornecedor.dddForn,
                logradouroFornecedor: fornecedor.logradouroForn,
                numeroFornecedor: fornecedor.numeroForn,
                bairroFornecedor: fornecedor.bairroForn,
                cidadeFornecedor: fornecedor.cidadeForn,
                ufFornecedor: fornecedor.ufForn
            },
                {
                    new: true
                }
            )
        } catch (error) {
            console.log(error)
        }
        dialog.showMessageBox(supplier, {
            type: 'info',
            message: 'Dados do fornecedor alterados com sucesso.',
            buttons: ['OK']
        }).then((result) => {
            if (result.response === 0) {
                event.reply('reset-form')
            }
        })   
    })

    /************************* PRODUTO ********************/
    ipcMain.on('update-product', async (event, produto) => {
        //teste de recebimento dos dados do cliente (passo 2)
        console.log(produto)
        try {
            const produtoEditado = await produtoModel.findByIdAndUpdate(
                cliente.idCli, {
                nomeFornecedor: fornecedor.nomeForn,
                foneFornecedor: fornececdor.foneForn,
                siteFornecedor: fornecedor.siteForn,
                cepFornecedor: fornecedor.cepForn,
                dddFornecedor: fornecedor.dddForn,
                logradouroFornecedor: fornecedor.logradouroForn,
                numeroFornecedor: fornecedor.numeroForn,
                bairroFornecedor: fornecedor.bairroForn,
                cidadeFornecedor: fornecedor.cidadeForn,
                ufFornecedor: fornecedor.ufForn
            },
                {
                    new: true
                }
            )
        } catch (error) {
            console.log(error)
        }
        dialog.showMessageBox(supplier, {
            type: 'info',
            message: 'Dados do fornecedor alterados com sucesso.',
            buttons: ['OK']
        }).then((result) => {
            if (result.response === 0) {
                event.reply('reset-form')
            }
        })   
    })

    // Fim do CRUD Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // CRUD DELETE

    // CLIENTES
    ipcMain.on('delete-client', async (event, idCliente) => {
        //teste de recebimento do id do cliente (passo 2 - slide)
        console.log(idCliente)
        // confirmação antes de excluir o cliente (IMPORTANTE!)
        // client é a variável ref a janela de clientes
        const { response } = await dialog.showMessageBox(client, {
            type: 'warning',
            buttons: ['Cancelar', 'Excluir'], //[0,1]
            title: 'Atenção!',
            message: 'Tem certeza que deseja excluir este cliente?'
        })
        // apoio a lógica
        console.log(response)
        if (response === 1) {
            //Passo 3 slide
            try {
                const clienteExcluido = await clienteModel.findByIdAndDelete(idCliente)
                dialog.showMessageBox({
                    type: 'info',
                    title: 'Aviso',
                    message: 'Cliente excluído com sucesso',
                    buttons: ['OK']
                })
                event.reply('reset-form')
            } catch (error) {
                console.log(error)
            }
        }

    })