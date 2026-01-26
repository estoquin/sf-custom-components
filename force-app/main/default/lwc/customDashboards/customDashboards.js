import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import d3Resource from '@salesforce/resourceUrl/d3_v7_min';

// Each chart renderer imports
import { renderBar } from './renderBar';
import { renderLine } from './renderLine';
import { renderPie } from './renderPie';
import { renderScatter } from './renderScatter';
import { renderArea } from './renderArea';
import { renderGroupedBar } from './renderGroupedBar';
import { renderDonut } from './renderDonut';
import { renderHistogram } from './renderHistogram';

export default class CustomDashboards extends LightningElement {
    d3Initialized = false;

    exportToPdf() {
        window.print();
    }

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;
        loadScript(this, d3Resource)
            .then(() => {
                this.renderAllCharts();
            })
            .catch(error => {
                console.error('D3 load error', error);
            });
    }

    clearCharts() {
        const panels = this.template.querySelectorAll('.chart');
        panels.forEach(p => (p.innerHTML = ''));
    }

    renderAllCharts() {
        const d3 = window.d3;
        if (!d3) return;

        this.clearCharts();

        const data = [10, 25, 40, 30, 20];
        const margin = { top: 10, right: 10, bottom: 30, left: 40 };

        // For each chart panel call its renderer and compute width from panel size
        const barPanel = this.template.querySelector('.chart-bar');
        const linePanel = this.template.querySelector('.chart-line');
        const piePanel = this.template.querySelector('.chart-pie');
        const scatterPanel = this.template.querySelector('.chart-scatter');
        const areaPanel = this.template.querySelector('.chart-area');
        const groupedBarPanel = this.template.querySelector('.chart-groupedbar');
        const donutPanel = this.template.querySelector('.chart-donut');
        const histogramPanel = this.template.querySelector('.chart-histogram');

        if (barPanel) {
            const width = Math.max(300, barPanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, barPanel.clientHeight) - margin.top - margin.bottom;
            renderBar(d3, data, width, height, margin, barPanel);
        }

        if (linePanel) {
            const width = Math.max(300, linePanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, linePanel.clientHeight) - margin.top - margin.bottom;
            renderLine(d3, data, width, height, margin, linePanel);
        }

        if (piePanel) {
            const width = Math.max(300, piePanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, piePanel.clientHeight) - margin.top - margin.bottom;
            renderPie(d3, data, width, height, margin, piePanel);
        }

        if (scatterPanel) {
            const width = Math.max(300, scatterPanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, scatterPanel.clientHeight) - margin.top - margin.bottom;
            renderScatter(d3, data, width, height, margin, scatterPanel);
        }

        if (areaPanel) {
            const width = Math.max(300, areaPanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, areaPanel.clientHeight) - margin.top - margin.bottom;
            renderArea(d3, data, width, height, margin, areaPanel);
        }

        if (groupedBarPanel) {
            const groupA = data;
            const groupB = data.map(v => Math.round(v * 0.7));
            const width = Math.max(300, groupedBarPanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, groupedBarPanel.clientHeight) - margin.top - margin.bottom;
            renderGroupedBar(d3, [groupA, groupB], width, height, margin, groupedBarPanel);
        }

        if (donutPanel) {
            const width = Math.max(300, donutPanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, donutPanel.clientHeight) - margin.top - margin.bottom;
            renderDonut(d3, data, width, height, margin, donutPanel);
        }

        if (histogramPanel) {
            const width = Math.max(300, histogramPanel.clientWidth) - margin.left - margin.right;
            const height = Math.max(200, histogramPanel.clientHeight) - margin.top - margin.bottom;
            renderHistogram(d3, data, width, height, margin, histogramPanel);
        }
    }
}