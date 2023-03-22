//var plotDiv = document.getElementById("myPlot1");

d3.csv( "csv/fish-and-seafood-consumption-per-capita.csv", function(err, rows) {
    //Filter through years and unpack rows defined by the keys
    function filter_and_unpack(rows, key, year) {
        return rows.filter(row => row['Year'] == year).map(row => row[key])
    }

    //Creating arrays to store years & steps for the interactive slider
    var frames = []
    var slider_steps = []

    //Vars for how many steps after years & starting year
    var n = 11;
    var num = 1962;

    //For loop -> looping through each 11 years & pushing data into choropleth map
    for (var i = 0; i<=n; i++){
        //Extracting data of amt of seafood consumption + location code of determined year
        var z = filter_and_unpack(rows, "Fish, Seafood- Food supply quantity (kg/capita/yr) (FAO, 2020)", num)
        var locations = filter_and_unpack(rows, "Code", num)

        //Pushing extracted data into choropleth frames
        frames[i] = {data: [{z: z, locations: locations, text: locations}], name: num}

        //Slider steps -> translating years to strings for the interactive slider
        slider_steps.push ({
            label: num.toString(),
            method: "animate",
            args: [[num], {
                mode: "immediate",
                transition: {duration: 300},
                frame: {duration: 300}
              }
            ]
          })
        num = num + 5
    }


    //Inputting data to make choropleth map
    var data = [{
        type: "choropleth",
        locationmode: "world",
        z: frames[0].data[0].z,
        text: frames[0].data[0].locations,
        zauto: false,
        zmin: 0,
        zmax: 100,
        colorscale: [
          ['0.0', 'rgb(162, 246, 196)'],
          ['0.111111111111', 'rgb(125, 225, 194)'],
          ['0.222222222222', 'rgb(91, 204, 190)'],
          ['0.333333333333', 'rgb(61, 182, 184)'],
          ['0.444444444444', 'rgb(37, 160, 176)'],
          ['0.555555555556', 'rgb(25, 138, 164)'],
          ['0.666666666667', 'rgb(28, 116, 149)'],
          ['0.777777777778', 'rgb(36, 95, 131)'],
          ['0.888888888889', 'rgb(41, 74, 110)'],
          ['1.0', 'rgb(42, 54, 88)']
        ],
        hoverlabel: {
          bgcolor: "#024959",
        },
        colorbar: {
          title: {
            text: "KG Consumed per Capita",
            font: {
              color: '#60A6A6',
              family: 'Fira Sans, sans-serif'
            },
          },
          len: 0.5,
          outlinewidth: 0,
          tickfont: {
            color: '#60A6A6',
            family: 'Fira Sans, sans-serif'
          }
        }
    }];

    //Customising look of map
    var layout = {
        title: {
          text: 'World Seafood Consumption<br>1962 - 2017',
          font: {
            color: '#C5CCD9',
            family: 'Fira Sans, sans-serif',
            size: 20
          },
          y: 0.76
        },
        width: 1000,
        height: 1000,

        paper_bgcolor: "rgba(0,0,0,0)",

        geo:{
           scope: 'world',
           bgcolor: 'rgba(173,197,217,0.75)',
           coastlinecolor: '#012E40',
           coastlinewidth: 0.5,
           countrycolor: '#012E40',
           countrywidth: 0.5,
           framewidth: 0,
           showland: true,
           landcolor: '#8FADBF',
           subunitcolor: '#012E40',
           lonaxis: {},
           projection: {
             type: 'equirectangular'
           },
           lataxis: {}
        },


        sliders: [{
            active: 11,
            steps: slider_steps,
            x: 0.1,
            len: 0.9,
            xanchor: "left",
            y: 0.3,
            yanchor: "top",
            bgcolor: '#8FADBF',
            activebgcolor: '#024959',
            borderwidth: 0,
            pad: {t: 50, b: 10},
            tickcolor: '#60A6A6',
            font: {
              color: '#60A6A6',
              family: 'Fira Sans , sans-serif'
            },
            currentvalue: {
              visible: true,
              prefix: "Year: ",
              xanchor: "center",
              font: {
                size: 15,
                color: '#60A6A6',
                family: 'Fira Sans , sans-serif'
              }
            }
        }]

    };

    Plotly.newPlot('chart-fish-consumption', data, layout).then(function() {
        Plotly.addFrames('chart-fish-consumption', frames);
    });

})
