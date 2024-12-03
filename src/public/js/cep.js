function buscarEndereco() { 
    let CEP = document.getElementById('inputCEPClient').value
    let urlAPI = `https://viacep.com.br/ws/${CEP}/json/`

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