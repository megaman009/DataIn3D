# DataIn3D
An interactive 3D globe for exploring global CO₂ emissions data, powered by AI-generated historical insights.

## Description
DataIn3D is a browser-based educational web application that renders a 3D Earth globe using WebGL. It allows users to visualise CO₂ emissions per capita by country, filtered by region and year (1990–2025). Data points are displayed as coloured markers, with size and colour intensity representing emission levels.

What sets DataIn3D apart is its **AI Insights panel** — powered by OpenRouter and OpenAI's GPT-OSS 120B model, the app generates dynamic, historically contextual narratives for each region and year selection. For example, selecting Europe in 1986 might reference the Chernobyl disaster, while selecting 2020 highlights the impact of COVID-19 lockdowns on emissions.

The project aims to make environmental data more accessible and engaging by combining geographical 3D visualisation with AI-driven storytelling.

## Features
- **3D Globe Rendering** — Interactive Earth model with auto-rotation and manual controls
- **Country Hover Tooltips** — Hover over any data point to see the country name and exact CO₂ value in tonnes per capita
- **Region Filtering** — Dropdown to filter data by continent (Asia, Europe, Africa, North America, Latin America, Oceania, or All regions)
- **Year Selection** — Slider to select data from 1990 to 2025
- **Automatic Camera Movement** — Globe repositions smoothly when a new region is selected
- **AI Insights Panel** — Dynamically generated 2-3 sentence historical narratives contextualising CO₂ trends for the selected region and year
- **Data Caching** — API responses are cached to reduce load times for repeated year queries
- **No-Data Feedback** — Displays a user-friendly message when no data points match the selected filters

## Tech Stack
**Frontend:**
- HTML, CSS, JavaScript
- Globe.gl (built on Three.js) for 3D rendering
- PapaParse for CSV parsing

**Backend:**
- Node.js + Express
- SQLite database for CO₂ emissions data
- OpenRouter API (OpenAI GPT-OSS 120B) for AI-generated insights
- Hosted on Render

**Deployment:**
- Frontend: GitHub Pages
- Backend: Render

## Data Sources
- **CO₂ Emissions per Capita** — Our World in Data. Available at: https://ourworldindata.org/grapher/co-emissions-per-capita
- **Country Coordinates (Lat/Lng)** — Natural Earth Data, 1:10m Cultural Vectors. Available at: https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/
- **Region Mapping** — `continents2.csv` (maps ISO codes to continents)
- **AI Insights** — Generated via OpenRouter API (OpenAI GPT-OSS 120B) at `https://datain3d-api.onrender.com/insights?year=YYYY&region=REGION`

## Usage
1. Visit the live site at [https://megaman009.github.io/DataIn3D](https://megaman009.github.io/DataIn3D)
2. Use the controls on the left to select a year and region
3. Hover over any globe point to see the country name and CO₂ value
4. View the AI-generated historical insight in the right panel

## Known Limitations
- Some countries may not render in their correct geographic positions due to inconsistencies between ISO code formats across datasets. This is a known data mapping limitation that could be resolved in future work by normalising all country codes to a single standard.
- Other metric buttons (Renewables %, Forest area, Energy use) are currently UI placeholders — the project is focused on delivering full CO₂ functionality.

## References
- Our World in Data. CO₂ emissions per capita dataset. Available at: https://ourworldindata.org/grapher/co-emissions-per-capita
- Natural Earth Data. 1:10m Cultural Vectors – Admin 0 Countries. Available at: https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/
- Globe.gl. WebGL Globe Library. Available at: https://globe.gl
- OpenRouter. AI API Gateway. Available at: https://openrouter.ai