# DataIn3D

Interactive 3D globe visualization for exploring global CO₂ emissions data.

## Description

DataIn3D is a browser-based web application that renders a 3D Earth globe using WebGL. It allows users to visualize CO₂ emissions per capita by country, filtered by region and year. The globe displays data points as colored markers, with size and color intensity representing emission levels. Users can interact with the globe through region selection, year sliders, and metric buttons, with automatic camera movements for better viewing.

The project aims to make environmental data more accessible and engaging by presenting it in a geographical, interactive format rather than traditional charts or tables.

## Features

- **3D Globe Rendering**: Interactive Earth model with auto-rotation and manual controls.
- **Region Filtering**: Dropdown to filter data by continents (Asia, Europe, Africa, North America, Latin America, Oceania, or All regions).
- **Year Selection**: Slider to select data from 1990 to 2025.
- **Metric Selection**: Buttons for different metrics (currently CO₂ emissions; placeholders for Renewables %, Forest area, Energy use).
- **Camera Movements**: Automatic globe positioning based on selected region.
- **Data Caching**: Caches API responses to reduce load times for repeated year queries.
- **No-Data Feedback**: Displays a message when no data points match the selected filters.
- **Responsive UI**: Three-panel layout with controls, globe view, and summary insights.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **3D Rendering**: Globe.gl (built on Three.js)
- **Data Parsing**: PapaParse for CSV handling
- **Data Sources**: External API for CO₂ data, local JSON/CSV files for coordinates and regions
- **Deployment**: GitHub Pages

## Data

- **CO₂ Emissions**: Fetched from a hosted API (`https://datain3d-api.onrender.com/co2?year=YYYY`)
- **Country Coordinates**: `countries-centroids.json` (centroid lat/lng for each country)
- **Region Mapping**: `continents2.csv` (maps ISO codes to continents, with normalization for Americas)
- **Backend**: Legacy Node.js files in `backend/` for potential future expansion

## Usage

1. Clone or download the repository.
2. Open `index.html` in a modern web browser.
3. Use the controls on the left to select a metric, year, and region.
4. Observe the globe update with data points and camera movements.
5. View summaries and insights in the right panel.

No server setup required; all data is loaded client-side.

## Notes

- Currently focused on CO₂ emissions; other metrics are UI placeholders.
- Data is cached per year to improve performance.
- Region names are normalized (e.g., "Northern America" → "North America").
- If no data points are found for a selection, a user-friendly message appears.
- The globe uses CDN-hosted libraries for rendering.
