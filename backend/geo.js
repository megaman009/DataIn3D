const fs = require("fs");
const turf = require("@turf/turf");

// 1. Load your GeoJSON file
// IMPORTANT: make sure the filename matches your actual file
const geo = JSON.parse(
    fs.readFileSync("./countries.json", "utf8")
);

// 2. Convert each country into a simple lat/lng point
const countries = geo.features.map((feature) => {

    // Get centroid (center point of country shape)
    const center = turf.center(feature);

    return {
        code: feature.properties.ISO_A3,
        name: feature.properties.NAME,
        lat: center.geometry.coordinates[1],
        lng: center.geometry.coordinates[0]
    };
});

// 3. Save clean output file
fs.writeFileSync(
    "./countries-centroids.json",
    JSON.stringify(countries, null, 2)
);

console.log("Done: countries-centroids.json created");