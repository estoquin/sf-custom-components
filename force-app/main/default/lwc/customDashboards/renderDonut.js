// Renders a donut chart into the provided container element
export function renderDonut(d3, data, width, height, margin, containerEl) {
    const radius = Math.min(width, height) / 2;

    const svg = d3
        .select(containerEl)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${(width + margin.left + margin.right) / 2},${(height + margin.top + margin.bottom) / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie();
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);

    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');

    arcs.append('path').attr('d', arc).attr('fill', (d, i) => color(i));

    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .text((d, i) => d.data);
}