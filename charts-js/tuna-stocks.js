var plotDiv = document.getElementById("tuna-rising-stock");
var dataSourceTuna = "csv/Tuna_Stocks_1952_2015.csv";

function loadDataTuna() {
    Plotly.d3.csv(dataSourceTuna, function(data){processDataTuna(data)});
}

function processDataTuna(allRows) {

    let year = [], bigeye = [], bluefin= [], yellowfin=[]

    //for loop -> reading through all of the lines in csv file
    //each time the function is run, populating the data from csv
    for (let i = 0; i<allRows.length; i++){
        let row = allRows[i]; 
        //pushing called csv rows in order
        //Pushing out different tuna species
        year.push(row["Year"]);
        bigeye.push(row["Bigeye tuna Central Western Pacific Ocean Total Biomass"]);
        bluefin.push(row["Southern bluefin tuna Southern Oceans Total Biomass"]);
        yellowfin.push(row["Yellowfin tuna Central Western Pacific Ocean Total Biomass"]);
    } 

    makePlotTuna(year,bigeye,bluefin,yellowfin); //making plot using the parameters created (within the code)
}

function makePlotTuna(year,bigeye,bluefin,yellowfin){
    //make traces
    //Bigeye tuna
    var traces = [{
        x:year,
        y:bigeye,
        name: 'Bigeye tuna Central Western Pacific Ocean Total Biomass',
        type: 'scatter',
        mode: "lines",
        line: {
            color: '#07F2B0',
        },
        hovertemplate: '%{y}<extra></extra>'
    },

    //Additional trace -> Bluefish tuna
    {
        x:year,
        y:bluefin,
        name: 'Southern bluefin tuna Southern Oceans Total Biomass',
        type: 'scatter',
        mode: "lines",
        line: {
            dash: 'dashdot',
            color: "#07DBF2"
        },
        //Removes trace name next to label -> unable to find a way to change white transparent bg to another colour
        hovertemplate: '%{y}<extra></extra>'
    },

    //Additional trace -> Yellowin tuna
    {
        x:year,
        y:yellowfin,
        name: 'Yellowfin tuna Central Western Pacific Ocean Total Biomass',
        type: 'scatter',
        mode: "lines",
        line: {
            dash: 'dot',
            color: "#F20587"
        },
        hovertemplate: '%{y}<extra></extra>'
    }

];

//Customing map
var layout = {
    title: {
        text: 'Tuna Fish Stocks<br>1952 - 2015',
        font: {
          color: '#C5CCD9',
          family: 'Fira Sans, sans-serif',
          size: 20
        },
    },

    legend: {
        y: 1,
        X: 1,
        xanchor: 'right'
    },

    plot_bgcolor:'rgba(0,0,0,0)',
    paper_bgcolor: "rgba(0,0,0,0)",

    font: {
        size: 14,
        family: "Fira Sans, sans-serif",
        color: "#60A6A6",
    },

    xaxis: {
        tickangle: 45,
        title: "Year",
        gridcolor: 'rgba(197,204,217,0.2)'
    },

    yaxis: {
        title: "Total Biomass",
        gridcolor: 'rgba(197,204,217,0.2)'
    }

}
//Draw map
    Plotly.newPlot('tuna-rising-stock', traces, layout);
}

loadDataTuna();