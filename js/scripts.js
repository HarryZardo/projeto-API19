/* Conteudo 1 */
  google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['País', 'Confirmados'],
      ['Germany', 1209577],
      ['United States', 3239866],
      ['Brazil', 842091],
      ['Canada', 328377],
      ['France', 872107],
      ['RU', 192476]
    ]);

    var options = {
      backgroundColor: 'transparent',
      colorAxis: {colors: ['#4E84A6', '#3B6D8C', '#0F2D40']},
      datalessRegionColor: '#D8D2CB',
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }

/* Conteudo 2 */

      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Status', 'Total'],
          ['Confirmados',     632678922],
          ['Mortos',      6600385],
          ['Recuperados',  520732817]
        ]);

        var options = {
          is3D: true,
          backgroundColor: 'transparent',
          colors: ['#4E84A6', '#3B6D8C', '#0F2D40' ],
          legend: 'bottom',
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }

/* Conteudo 3 */

      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable(testeDoido());
        data.addColumn('string', 'Sigla');
        data.addColumn('string', 'Estado');
        data.addColumn('number', 'Casos');
        data.addColumn('number', 'Mortes');
        data.addColumn('number', 'Suspeitos');
        data.addColumn('number', 'Descartados');
        data.addRows([
          ['SP', 'São Paulo', 19, 4, 2, 1],
          ['SP', 'São Paulo', 19, 4, 2, 1]
        ]);

        

        var options = {
          
        };

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '700px', height: '200px'});
      }


      async function carregarDados() {
        //Chamando a API para obter os dados
        await fetch('https://covid19-brazil-api.vercel.app/api/report/v1')   //End point da API
            .then( response => response.json() )                // Obtendo a resposta
            .then(dados => testeDoido(dados))                //Chamando função para preparar dados
      }
    
    // Função para preparar os dados para exibição
    function prepararDados(dados) {

        // Criando variável para controlar as linhas da tabela
        let linhas = document.getElementById('linhas');
        linhas.innerHTML = '';
    
        //Percorrendo todos os dados 
        console.log(dados);
    }

    function testeDoido(dados) {
      console.log(dados);
      return [ 
               ['SP', 'São Paulo', 19, 4, 2, 1],
               ['SP', 'São Paulo', 19, 4, 2, 1]
             ];
    }