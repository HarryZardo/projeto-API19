/* 
    Vamos consumir os dados da API Mercado BitCoin
	https://www.mercadobitcoin.net/api/BTC/trades
*/

// Chamando a API para obter os dados
async function carregarDados() {
    // Escondendo a div de erros se ela estiver visível
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';

    //Chamando a API para obter os dados
    await fetch('https://www.mercadobitcoin.net/api/BTC/trades')   //End point da API
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

/* Criando variáveis globais para os gráficos (serão usadas quando não receber dados da API) */
var dadosPizza = [
        ['Operação', 'Quantidade per Day'],
        ['',     0]
    ];
var dadosLinha = [
        ['Data', 'Preço Venda'],
        ['',  0]
    ];


// Função para preparar os dados para exibição nos gráficos
function prepararDados(dados) {
    // Se recebeu dados, formata e passa os valores para as variáveis dadosPizza e dadosLinha
    if (dados != null) {
        let qtdCompras = 0;   // Controla o volume de compras (buy)
        let qtdVendas = 0;    // Controla o volume de vendas (sell)

        /* Alterando os dados para o gráfico de linha */
        dadosLinha = [ ['Data', 'Preço Venda'] ];
        dadosPizza = [ ['Operação', 'Quantidade per Day'] ];

        // Percorrendo todos os registros de dados obtidos
        for (let i=0; i<dados.length; i++){
            if (dados[i]['type']=='sell') {
                qtdVendas = qtdVendas + dados[i]['amount'];
                dadosLinha.push(
                    [
                        new Date( dados[i]['date']*1000 ),
                        dados[i]['price']
                    ]                    
                );
            }
            else 
                qtdCompras = qtdCompras + dados[i]['amount'];
        }

        /* Alterando os dados para o gráfico de pizza */        
        dadosPizza.push([ 'Compras', qtdCompras ]);
        dadosPizza.push([ 'Vendas', qtdVendas ]);
        /* Mandando redesenhar o gráfico de pizza com os novos dados */
        drawPieChart();
        /* Mandando redesenhar o gráfico de linha com os novos dados */
        drawLineChart();
    }    
}

/* -------------------- Gráfico de linha -------------------- */

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawLineChart);

function drawLineChart() {
        var data = google.visualization.arrayToDataTable(dadosLinha);

        var options = {
          title: 'Variação de preço (venda)',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
}

/* -------------------- Gráfico de Pizza -------------------- */

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPieChart);

function drawPieChart() {

        var data = google.visualization.arrayToDataTable(dadosPizza);

        var options = {
          title: 'Volume das negociações',
          is3D: true,
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
 }