function makeDemo1() {
    d3.tsv("https://raw.githubusercontent.com/janert/d3-for-the-impatient/master/examples/examples-simple.tsv")
        .then((data) => {
            d3.select("svg")
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 5).attr("fill", "red")
                .attr("cx", function (d) { return d["x"] })
                .attr("cy", function (d) { return d["y"] })
        });
}
