# Salesforce Custom Dashboards (D3.js)

Simple demo LWC that renders multiple D3 charts inside a Salesforce Lightning Web Component.

What this repo contains
- A LWC `customDashboards` that loads D3 and renders several charts (bar, line, pie, scatter, area, grouped bar, donut, histogram).
- Separate renderer modules under `force-app/main/default/lwc/customDashboards/` for each chart (e.g. `renderBar.js`).
- An `Export to PDF` button that triggers the browser print flow so you can "Save as PDF".
- `manifest/package.xml` to retrieve Lightning components and static resources.

How to use
1. Deploy the source to a scratch org or sandbox using your usual SFDX flow.
2. Open the page where the `customDashboards` LWC is exposed (e.g., an app or record page).
3. Use the UI to inspect charts. Click the "Export to PDF" button and choose "Save as PDF" in the browser print dialog to create a PDF.

Notes
- No external services or Visualforce are used. The print export uses the browser `window.print()` flow.
- Chart data is a small sample array included in the component for testing and demo purposes.

Files of interest
- `force-app/main/default/lwc/customDashboards/customDashboards.html` — template and layout
- `force-app/main/default/lwc/customDashboards/customDashboards.js` — main component logic
- `force-app/main/default/lwc/customDashboards/customDashboards.css` — styling and print rules
- `force-app/main/default/lwc/customDashboards/render*.js` — individual chart renderers
- `manifest/package.xml` — retrieve LWC and static resources

That's it — use this as a playground to experiment with D3 visualizations in LWC.
