// Renders a scatter chart into the provided container element
export function renderScatter(d3, data, width, height, margin, containerEl) {
    const svg = d3
        .select(containerEl)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .nice()
        .range([height, 0]);

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => x(i))
        .attr('cy', d => y(d))
        .attr('r', 6)
        .attr('fill', '#0176d3')
        .attr('opacity', 0.9);

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(data.length).tickFormat(i => `Item ${i + 1}`));

    svg.append('g')
        .call(d3.axisLeft(y));
}