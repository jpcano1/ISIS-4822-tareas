TESTER = document.getElementById("tester");
Plotly.newPlot( TESTER, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
}], {
    margin: {
        t: 0
    }
});

let resPlot1 = document.getElementById("resPlot1");

let trace1 = {
    type: "bar",
    x: [1, 2, 3, 4],
    y: [5, 10, 2, 8],
    marker: {
        color: "#C8A2C8",
        line: {
            width: 2.5
        }
    }
}

let data = [trace1];

let layout = {
    title: "Responsive to Window's Size!",
    font: { size: 18 }
};

let config = { responsive: true };

Plotly.newPlot(resPlot1, data, layout, config);


let ajaxPlot = document.getElementById("ajaxPlot");

function makePlot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv",
        (data) =>
        {
            processData(data);
        });
}

function processData(allRows) {
    console.log(allRows);

    let x = [],
        y = [];

    for (let i = 0; i < allRows.length; i++) {
        let row = allRows[i];
        x.push(row["AAPL_x"]);
        y.push(row["AAPL_y"]);
    }
    console.log("X", x, "Y", y);
    makePlotly(x, y);
}

function makePlotly(x, y) {
    let traces = [{
        x: x,
        y: y
    }];

    Plotly.newPlot(ajaxPlot, traces, {
        title: "Plotting CSV Data from AJAX Call"
    });
}

makePlot()
