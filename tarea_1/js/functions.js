let plot1 = document.getElementById("plot1"),
    plot2 = document.getElementById("plot2"),
    plot3 = document.getElementById("plot3"),
    plot4 = document.getElementById("plot4"),
    plot5 = document.getElementById("plot5"),
    plot6 = document.getElementById("plot6"),
    plot7 = document.getElementById("plot7"),
    plot8 = document.getElementById("plot8"),
    plot9 = document.getElementById("plot9");

let makePlot1 = () => {
    Plotly.d3.csv("https://raw.githubusercontent.com/jpcano1/ISIS-4822-tareas/master/datasets/day_data.csv", (data) => {
        processPlot(data);
    });
}

let makePlot2 = () => {
    Plotly.d3.csv("https://raw.githubusercontent.com/jpcano1/ISIS-4822-tareas/master/datasets/month_data.csv", (data) => {
        processPlot1(data);
    })
}

let makePlot3 = () => {
    Plotly.d3.csv("https://raw.githubusercontent.com/jpcano1/ISIS-4822-tareas/master/datasets/dpto_data.csv", (data) => {
        processPlot2(data);
    })
}

function processPlot(data) {
    let x = [],
        y1 = [],
        y2 = [],
        y3 = [];
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        x.push(row["DiaSemana"]);
        y1.push(row["max"]);
        y2.push(row["mean"]);
        y3.push(row["count"]);
    }

    drawPlot(x, y1, plot1, "Valor del Giro Máximo Vs. Dia de la Semana", "Día de la Semana",
        "Valor del Giro (Billones)");
    drawPlot(x, y2, plot2, "Valor del Giro Promedio Vs. Dia de la Semana", "Día de la Semana",
        "Valor del Giro (Millones)");
    drawPlot(x, y3, plot3, "Número de Giros Vs. Dia de la Semana", "Día de la Semana",
        "Número de Giros");
}

function processPlot1(data) {
    let x = [],
        y1 = [],
        y2 = [],
        y3 = [];

    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        x.push(row["Mes"]);
        y1.push(row["max"]);
        y2.push(row["mean"]);
        y3.push(row["count"]);
    }

    drawPlot(x, y1, plot4, "Valor del Giro Máximo Vs. Mes del Año", "Mes del Año",
        "Valor del Giro (Billones)");
    drawPlot(x, y2, plot5, "Valor del Giro Promedio Vs. Mes del Año", "Mes del Año",
        "Valor del Giro (Millones)");
    drawPlot(x, y3, plot6, "Número de Giros Vs. Mes del Año", "Mes del Año",
        "Número de Giros");
}

function processPlot2(data) {
    let x = [],
        y1 = [],
        y2 = [],
        y3 = [];

    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        x.push(row["NombreDepartamento"]);
        y1.push(row["max"]);
        y2.push(row["mean"]);
        y3.push(row["count"]);
    }

    drawPlot(x, y1, plot7, "Valor del Giro Máximo Vs. Departamento", "Departamento",
        "Valor del Giro (Billones)");
    drawPlot(x, y2, plot8, "Valor del Giro Promedio Vs. Departamento", "Departamento",
        "Valor del Giro (Millones)");
    drawPlot(x, y3, plot9, "Número de Giros Vs. Departamento", "Departamento",
        "Número de Giros");
}

function drawPlot(x, y, ax = plot1,
                  title = undefined, xlabel = undefined,
                  ylabel = undefined) {
    let trace1 = {
        type: "scatter",
        x: x,
        y: y,
    };

    let data = [trace1];

    let layout = {
        title: {
            text: title,
            font: {
                family: "Courier New, monospace",
                size: 18
            },
            xref: "paper"
        },
        xaxis: {
            title: {
                text: xlabel,
            },
            automargin: true
        },
        yaxis: {
            title: {
                text: ylabel,
            }
        },
    };

    let config = {
        responsive: true,
        scrollZoom: true
    };

    Plotly.newPlot(ax, data, layout, config);
}

makePlot1();
makePlot2();
makePlot3();
