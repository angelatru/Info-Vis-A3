d3.csv("csv/biomass-fish-stocks-and-intensity-taxa.csv", function(err,rows) {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    //Reading csv and declaring certain rows to vars
    var allFishNames = unpack(rows, 'Entity'),
        allYear = unpack(rows, 'Year'),
        allFishBiomass = unpack(rows, 'biomass_mean_taxa'),
        allFishIntensity = unpack(rows, 'fishing_pressure_mean_taxa')
        //Creating empty arrays to store later data
        listofFish = [],
        currentYear = [],
        currentFishBiomass = [];
        currentFishIntensity = [];

        //Creating a list of one instance of fish group names
    for (var i=0; i< allFishNames.length; i++) {
        if(listofFish.indexOf(allFishNames[i]) === -1) {
            listofFish.push(allFishNames[i]);
        }
    }

    //Getting data of the chosen fish group from the menu
    function getFishData(chosenFish) {
        currentYear = [],
        currentFishBiomass = [];
        currentFishIntensity = [];

        //Populating current chosen fish group biomass and year into the empy arrays
        for (var i = 0; i<allFishNames.length; i++){
            if (allFishNames[i] === chosenFish){
                currentFishBiomass.push(allFishBiomass[i]);
                currentFishIntensity.push(allFishIntensity[i]);
                currentYear.push(allYear[i]);
            }
        }
    };

    //Sets the deafult graph
    setScatterPlot('Bivalves and gastropods');

    //Drawing the graph of chosen fish group
    function setScatterPlot(chosenFish) {
        getFishData(chosenFish);

        //Line graph of chosen fish
        var trace = {
            x: currentYear,
            y: currentFishBiomass,
            type: 'scatter',
            mode: 'lines',
            name: 'Fish Biomass',
            line: {
                color: '#EAF205'
            },
            //Removes trace name next to label -> unable to find a way to change white transparent bg to another colour
            hovertemplate: '%{y}<extra></extra>'
        }

        //Additional line graph on fishing intensity
        var trace2 = {
            x:currentYear,
            y: currentFishIntensity,
            type: 'scatter',
            mode: 'lines',
            name: 'Fishing Pressure',
            line: {
                color: '#F25C05'
            },
            hovertemplate: '%{y}<extra></extra>'
        }

        var data = [trace, trace2];


        //Map customisation
        var layout = {
            title: {
                text: 'Health of Fish Stocks by<br>Fish Groups',
                font: {
                  color: '#C5CCD9',
                  family: 'Fira Sans, sans-serif',
                  size: 20
                },
            },

            //Zeroline @ 1
            shapes: [{
                type: 'line',
                x0: 1970,
                y0: 1,
                x1: 2018,
                y1: 1,
                line: {
                    color: 'rgba(173,197,217,0.7)',
                    width: 2
                }
            }
            ],

            legend: {
                y: 1,
                X: 1,
                xanchor: 'right'
            },

            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor:'rgba(0,0,0,0)',

            font: {
                size: 14,
                family: "Fira Sans, sans-serif",
                color: "#60A6A6",
            },

            yaxis: {
                title: 'Sustainable Yield',
                range: [0, 2.5],
                gridcolor: 'rgba(197,204,217,0.2)',
                zeroline: false,
                hoverformat: '.2r'
            },

            xaxis: {
                title: 'Year',
                tickangle: 45,
                gridcolor: 'rgba(197,204,217,0.2)',
                hoverformat: '.2f'
                
            }
        };

        //Calling Plotly to draw in html
        Plotly.newPlot('fish-health-intensity', data, layout);
    };

    //Creating menu selections
    //Creating vars from html elemets
    var innerContainer = document.querySelector('[data-num="2"'),
        areaSelector =  innerContainer.querySelector('.fishdata');

    
    //Creating dropdown options and appending selector to html
    function assignOptions(textArray, selector) {
        for (var i=0; i<textArray.length; i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    //Pushing selectors into dropdown menu
    assignOptions(listofFish, areaSelector);

    //Function to change fish group 
    function updateFish(){
        setScatterPlot(areaSelector.value);
    }

    //Updating graph whenever options change
    areaSelector.addEventListener('change', updateFish, false);



});