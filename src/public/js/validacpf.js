function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '')
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
    
    let soma = 0
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.charAt(9))) return false

    soma = 0
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.charAt(10))) return false

    return true
}

function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Função principal de validação
function TestaCPF() {
    const cpfInput = document.getElementById('inputCpfClient')
    const cpf = cpfInput.value.replace(/[^\d]/g, '')
    
    if (!validarCPF(cpf)) {
        cpfInput.setCustomValidity('CPF inválido!')
        cpfInput.reportValidity()
        cpfInput.focus()
        return false
    }
    
    cpfInput.value = formatarCPF(cpf)
    cpfInput.setCustomValidity('')
    return true
}

// Máscara automática
document.getElementById('inputCpfClient').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 11) value = value.substring(0, 11)
    
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    
    e.target.value = value
})