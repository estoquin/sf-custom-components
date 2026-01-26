// Renders a grouped bar chart into the provided container element
export function renderGroupedBar(d3, dataGroups, width, height, margin, containerEl) {
    // dataGroups: array of arrays, each inner array has same length
    const svg = d3
        .select(containerEl)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const n = dataGroups.length;
    const m = dataGroups[0] ? dataGroups[0].length : 0;

    const x0 = d3.scaleBand().domain(d3.range(m)).range([0, width]).padding(0.2);
    const x1 = d3.scaleBand().domain(d3.range(n)).range([0, x0.bandwidth()]).padding(0.05);
    const y = d3.scaleLinear().domain([0, d3.max(dataGroups.flat())]).nice().range([height, 0]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const groups = svg.selectAll('g.group').data(d3.range(m)).enter().append('g').attr('class', 'group').attr('transform', i => `translate(${x0(i)},0)`);

    groups.selectAll('rect')
        .data(i => dataGroups.map(g => g[i]))
        .enter()
        .append('rect')
        .attr('x', (_, j) => x1(j))
        .attr('y', d => y(d))
        .attr('width', x1.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', (_, j) => color(j));

    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x0).tickFormat(i => `Item ${i + 1}`));
    svg.append('g').call(d3.axisLeft(y));
}