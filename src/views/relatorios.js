/**
 * Processo de renderização
 * relatorios.js
 */


// Relatório CLientes
async function gerarPdfClientes() {
    try {
        console.log("Solicitando relatório de clientes...");
        await window.api.gerarRelatorioClientes();
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao gerar relatório de clientes");
    }
}


// Relatório Fornecedores
async function gerarPdfFornecedores() {
    try {
        console.log("Solicitando relatório de fornecedores...");
        await window.api.gerarRelatorioFornecedores();
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao gerar relatório de fornecedores");
    }
}


// Relatório Produtos
async function gerarPdfProdutos() {
    try {
        console.log("Solicitando relatório de produtos...");
        await window.api.gerarRelatorioProdutos();
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao gerar relatório de produtos");
    }
}

// Expor funções para o HTML
window.gerarPdfClientes = gerarPdfClientes;
window.gerarPdfFornecedores = gerarPdfFornecedores;
window.gerarPdfProdutos = gerarPdfProdutos;