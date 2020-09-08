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

    drawPlot(x, y1, plot1, "Valor del Giro Máximo Vs. Dia de la Semana (Fig. 1)", "Día de la Semana",
        "Valor del Giro (Miles de Millones)");
    drawPlot(x, y2, plot2, "Valor del Giro Promedio Vs. Dia de la Semana (Fig. 2)", "Día de la Semana",
        "Valor del Giro (Millones)");
    drawPlot(x, y3, plot3, "Número de Giros Vs. Dia de la Semana (Fig. 3)", "Día de la Semana",
        "Número de Giros", "bar");
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

    drawPlot(x, y1, plot4, "Valor del Giro Máximo Vs. Mes del Año (Fig. 4)", "Mes del Año",
        "Valor del Giro (Miles de Millones)");
    drawPlot(x, y2, plot5, "Valor del Giro Promedio Vs. Mes del Año (Fig. 5)", "Mes del Año",
        "Valor del Giro (Millones)");
    drawPlot(x, y3, plot6, "Número de Giros Vs. Mes del Año (Fig. 6)", "Mes del Año",
        "Número de Giros", "bar");
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

    drawPlot(x, y1, plot7, "Valor del Giro Máximo Vs. Departamento (Fig. 7)", "Departamento",
        "Valor del Giro (Miles de Millones)");
    drawPlot(x, y2, plot8, "Valor del Giro Promedio Vs. Departamento (Fig. 8)", "Departamento",
        "Valor del Giro (Millones)");
    drawPlot(x, y3, plot9, "Número de Giros Vs. Departamento (Fig. 9)", "Departamento",
        "Número de Giros", "bar");
}

function drawPlot(x, y, ax = plot1,
                  title = undefined, xlabel = undefined,
                  ylabel = undefined, type = "scatter") {
    let colors = [
        "#e53935",
        "#512da8",
        "#3f51b5",
        "#1a237e",
        "#0097a7",
        "#00897b",
        "#4caf50",
        "#f4511e",
        "#ff6f00"
    ],
        rand = Math.floor(Math.random() * colors.length);
    let trace1 = {
        x: x,
        y: y,
        mode: "markers+lines",
        marker: {
            size: 6,
            color: colors[rand]
        },
        line: {
            color: colors[rand],
            width: 1.3
        },
        type: type
    };

    let data = [trace1];

    let layout = {
        title: {
            text: title,
            font: {
                size: 15
            },
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
        font: {
            size: 12
        }
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
