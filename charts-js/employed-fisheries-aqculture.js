var plotDiv = document.getElementById("chart-employment");
var dataSourceEmploy = "csv/employed-fisheries-aquaculture-time.csv";

function loadDataEmploy() {
    Plotly.d3.csv(dataSourceEmploy, function(data){processDataEmploy(data)});
}

function processDataEmploy(allRows) {
    console.log(allRows); 

    let year = [], aqculture = [], fisheries= []

    //for loop -> reading through all of the lines in csv file
    //each time the function is run, populating the data from csv
    for (let i = 0; i<allRows.length; i++){
        let row = allRows[i];
        //pushing called csv rows in order
        year.push(row["Year"]);
        aqculture.push(row["Aquaculture (number employed)"]);
        fisheries.push(row["Fisheries (number employed)"]);
    } 

    makePlotEmploy(year,aqculture,fisheries); //making plot using the parameters created (within the code)
}

function makePlotEmploy(year,aqculture,fisheries){
    //make traces -> collection of data
    var traces = [{
        x:year,
        y:aqculture,
        name: 'Aquaculture',
        type: 'scatter',
        mode: "lines",
        line: {
            color: '#0477BF',
        },
        hovertemplate: '%{y}<extra></extra>'
    },

    //make another tracer for fishery growth
    {
        x:year,
        y:fisheries,
        name: "Fisheries",
        type: 'scatter',
        mode: "lines",
        line: {
            color: "#D94AB3",
        },
        hovertemplate: '%{y}<extra></extra>'
        

    }

];

//Customising line graph
var layout = {
    title: {
        text: 'Aquaculture & Fishery Employment<br>1968 - 2018',
        font: {
          color: '#C5CCD9',
          family: 'Fira Sans, sans-serif',
          size: 20
        },
    },

    legend: {
        y: 0.8,
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
        gridcolor: 'rgba(197,204,217,0.2)',
    },

    yaxis: {
        title: "Employed Persons",
        gridcolor: 'rgba(197,204,217,0.2)',
    }

}
//Draw map on website
    Plotly.newPlot('chart-employment', traces, layout);
}

loadDataEmploy();