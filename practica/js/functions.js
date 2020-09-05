/**
 * Definimos una única función
 */
function makeDemo1() {
    // Esta función carga u obtiene los datos usando la función TSV
    d3.tsv("https://raw.githubusercontent.com/janert/d3-for-the-impatient/master/examples/examples-simple.tsv")
        // Se usa un callback para pasar obtener los datos
        // Y usarlos en una gráfica
        .then((data) => {
            // Busca el lienzo en SVG donde vamos a graficar los datos.
            d3.select("#demo1")
                // Escogermos los elementos del DOM que sean circulos
                // Dado que no hay objetos, retorna un array vacío.
                // Punto a punto va a llenar este array vacío
                .selectAll("circle")
                // La función data retorna una colección de elementos
                // que estan asociados a los puntos individuales
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 5).attr("fill", "red")
                .attr("cx", (d) => { return d["x"] })
                .attr("cy", (d) => { return d["y"] })
        });
}

function makeDemo2() {
    d3.tsv("https://raw.githubusercontent.com/janert/d3-for-the-impatient/master/examples/examples-multiple.tsv")
        .then((data) => {
            let pxX = 600, pxY = 300;

            // Asignamos el tamaño del area SVG a las variables
            // px para pixel.
            let scX = d3.scaleLinear()
                // Esto provee un dominio a un rango de salida.
                .domain(d3.extent(data, d => d["x"]))
                .range([0, pxX]);
            let scY1 = d3.scaleLinear()
                .domain(d3.extent(data, d => d["y1"]))
                .range([pxY, 0]);
            let scY2 = d3.scaleLinear()
                .domain(d3.extent(data, d => d["y2"]))
                .range([pxY, 0]);

            d3.select("#demo2")
                // Antes de agregar algún elemento gráfico,
                // añadimos <g> y le damos un id único
                // Provee agrupamiento lógico, me ayuda a
                // Separar los puntos de un dataset del otro
                .append("g").attr("id", "ds1")
                .selectAll("circle")
                .data(data).enter().append("circle")
                .attr("r", 5).attr("fill", "green")
                .attr("cx", d => scX(d["x"]))
                .attr("cy", d => scY1(d["y1"]));

            d3.select("#demo2")
                .append("g").attr("id", "ds2")
                .attr("fill", "blue")
                .selectAll("circle")
                .data(data).enter().append("circle")
                .attr("r", 5)
                .attr("cx", d => scX(d["x"]))
                .attr("cy", d => scY2(d["y2"]));

            let lineMaker = d3.line()
                .x(d => scX(d["x"]))
                .y(d => scY1(d["y1"]));

            d3.select("#ds1")
                .append("path")
                .attr("fill", "none").attr("stroke", "red")
                .attr("d", lineMaker(data));

            lineMaker.y(d => scY2(d["y2"]));

            d3.select("#ds2")
                .append("path")
                .attr("fill", "none").attr("stroke", "cyan")
                .attr("d", lineMaker(data));
        })
}
