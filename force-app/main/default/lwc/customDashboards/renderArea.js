// Renders an area chart into the provided container element
export function renderArea(d3, data, width, height, margin, containerEl) {
    const svg = d3
        .select(containerEl)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint().domain(d3.range(data.length)).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data)]).nice().range([height, 0]);

    const area = d3.area()
        .x((d, i) => x(i))
        .y0(height)
        .y1(d => y(d))
        .curve(d3.curveMonotoneX);

    svg.append('path')
        .datum(data)
        .attr('fill', '#cfe6ff')
        .attr('stroke', 'none')
        .attr('d', area);

    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#0176d3')
        .attr('stroke-width', 2)
        .attr('d', d3.line().x((d, i) => x(i)).y(d => y(d)).curve(d3.curveMonotoneX));

    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickFormat(i => `Item ${i + 1}`));
    svg.append('g').call(d3.axisLeft(y));
}