/* 
    Vamos consumir os dados da API CoinBase (retorna código e nomes das moedas)
    https://api.coinbase.com/v2/currencies
*/

// Chamando a API para obter os dados
async function carregarDados() {
    // Escondendo a div de erros se ela estiver visível
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';

    //Chamando a API para obter os dados
    await fetch('https://api.coinbase.com/v2/currencies')   //End point da API
        .then( response => response.json() )                // Obtendo a resposta
        .then(dados => prepararDados(dados))                //Chamando função para preparar dados
        .catch(e => exibirErro(e.message));                 // Obtendo o erro (se houver)
}

// Função para mostrar mensagens de erro ao usuário
function exibirErro(mensagem) {
    // Mostrar a div de erro e exibir a mensagem
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'block';
    divErro.innerHTML = '<b>Erro ao acessar a API</b> <br />' + mensagem;
}

// Função para preparar os dados para exibição
function prepararDados(dados) {
    // Criando variável para controlar as linhas da tabela
    let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';

    //Percorrendo todos os dados 
    for (let i=0; i<dados['data'].length; i++) {
        let auxLinha = '';

        // Alternando cor de fundo das linhas ímpares
        if (i%2 != 0)
            auxLinha = '<tr class="listra">';
        else
            auxLinha = '<tr>';

        auxLinha += '<td>' + dados['data'][i].id + '</td>' +
                    '<td>' + dados['data'][i].name + '</td>' +
                    '</tr>';
        
        linhas.innerHTML += auxLinha;
    }
}