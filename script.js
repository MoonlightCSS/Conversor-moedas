// Referenciando os elementos do HTML
const valorOrigemInput = document.getElementById('valorOrigem');
const moedaOrigemSelect = document.getElementById('moedaOrigem');
const moedaDestinoSelect = document.getElementById('moedaDestino');
const btnConverter = document.getElementById('btnConverter');
const resultadoParagrafo = document.getElementById('resultado');

// Valores de moeda em 18/06/2025
const taxasDeCambio = {
    'BRL': 1,      // 1 Real Brasileiro vale 1 Real Brasileiro
    'USD': 5.00,   // 1 Dólar Americano vale 5.00 Reais Brasileiros
    'EUR': 5.50,   // 1 Euro vale 5.50 Reais Brasileiros
    'GBP': 6.20,   // 1 Libra Esterlina vale 6.20 Reais Brasileiros
    'JPY': 0.035   // 1 Iene Japonês vale 0.035 Reais Brasileiros (1 Real = ~28.57 Ienes)
};

// Se as 'taxasDeCambio' mudarem, o HTML se atualiza automaticamente.
function preencherOpcoesMoedas() {
    for (const codigoMoeda in taxasDeCambio) {
        const optionOrigem = document.createElement('option');
        optionOrigem.value = codigoMoeda;
        optionOrigem.textContent = `${codigoMoeda} - ${nomeMoeda(codigoMoeda)}`;
        moedaOrigemSelect.appendChild(optionOrigem);

        const optionDestino = document.createElement('option');
        optionDestino.value = codigoMoeda;
        optionDestino.textContent = `${codigoMoeda} - ${nomeMoeda(codigoMoeda)}`;
        moedaDestinoSelect.appendChild(optionDestino);
    }
    // Padrões para testar funcionalidade
    moedaOrigemSelect.value = 'BRL';
    moedaDestinoSelect.value = 'USD';
}

// Função auxiliar para obter o nome completo da moeda
function nomeMoeda(codigo) {
    switch(codigo) {
        case 'BRL': return 'Real Brasileiro';
        case 'USD': return 'Dólar Americano';
        case 'EUR': return 'Euro';
        case 'GBP': return 'Libra Esterlina';
        case 'JPY': return 'Iene Japonês';
        default: return 'Moeda Desconhecida';
    }
}

// Chamar a função para preencher as opções de moedas quando a página carregar
document.addEventListener('DOMContentLoaded', preencherOpcoesMoedas);


//Função para converter moedas
function converterMoeda() {
    const valorOrigem = parseFloat(valorOrigemInput.value); // Converte o texto para número
    const moedaOrigem = moedaOrigemSelect.value;
    const moedaDestino = moedaDestinoSelect.value;

    // Verifica se o valor é um número válido
    if (isNaN(valorOrigem) || valorOrigem <= 0) {
        resultadoParagrafo.textContent = 'Por favor, digite um valor numérico válido.';
        resultadoParagrafo.style.color = 'red'; // Altera a cor do texto para vermelho em caso de erro
        return; 
    }

    // Validação: verifica se as moedas de origem e destino são diferentes
    if (moedaOrigem === moedaDestino) {
        resultadoParagrafo.textContent = `As moedas de origem e destino são as mesmas. Resultado: ${valorOrigem.toFixed(2)} ${moedaOrigem}`;
        resultadoParagrafo.style.color = '#28a745'; // Volta para cor verde se funcionar corretamente
        return;
    }

    // Obter as taxas de conversão em relação ao BRL 
    const taxaOrigemBRL = taxasDeCambio[moedaOrigem];
    const taxaDestinoBRL = taxasDeCambio[moedaDestino];

    if (!taxaOrigemBRL || !taxaDestinoBRL) {
        resultadoParagrafo.textContent = 'Erro: Moeda selecionada não encontrada nas taxas de câmbio.';
        resultadoParagrafo.style.color = 'red';
        return;
    }

    // Converte o valor de origem para BRL
    const valorEmBRL = valorOrigem * taxaOrigemBRL;

    // converte o valor de BRL para a moeda final escolhida
    const valorConvertido = valorEmBRL / taxaDestinoBRL;

    // exibe o resultado
    resultadoParagrafo.textContent = `Resultado: ${valorConvertido.toFixed(2)} ${moedaDestino}`;
    resultadoParagrafo.style.color = '#28a745';
}

btnConverter.addEventListener('click', converterMoeda);