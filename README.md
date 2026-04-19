# DataIn3D

Interactive 3D globe visualization prototype.

## Summary
Browser-based prototype for exploring CO₂ emissions by region and year on a globe.

## Files
- `index.html`: UI layout and canvas container
- `styles.css`: page styling
- `script.js`: globe rendering, data loading, filters
- `countries-centroids.json`: country centroid coordinates
- `continents2.csv`: country-to-region mapping
- `backend/`: legacy backend and data files

## Usage
1. Open `index.html` in a browser.
2. Select a region, year, and metric.

## Notes
- Uses Globe.gl for 3D rendering.
- Caches CO₂ API responses by year.
- Normalizes Americas region names for dropdown filtering.
- Displays a message when no matching data points are found.

