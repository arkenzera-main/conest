function buscarEnderecoCli() {
    let cep = document.getElementById('inputCepClient').value
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`

    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            document.getElementById('inputLogradouroClient').value = dados.logradouro
            document.getElementById('inputBairroClient').value = dados.bairro
            document.getElementById('inputCidadeClient').value = dados.localidade
            document.getElementById('inputUfClient').value = dados.uf
            document.getElementById('inputDddClient').value = dados.ddd;        
        })
        .catch(error => console.error('Erro ao buscar o endereço:', error))
}

function buscarEnderecoSup() {
    let cep = document.getElementById('inputCepSupplier').value
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`

    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            document.getElementById('inputLogradouroSupplier').value = dados.logradouro
            document.getElementById('inputBairroSupplier').value = dados.bairro
            document.getElementById('inputCidadeSupplier').value = dados.localidade
            document.getElementById('inputUfSupplier').value = dados.uf
            document.getElementById('inputDddSupplier').value = dados.ddd;        
        })
        .catch(error => console.error('Erro ao buscar o endereço:', error))
}
