document.addEventListener("DOMContentLoaded", async () => {

    let world = null;
    let lastRegion = null;
    let countryCoords = {};
    let countryRegions = {};
    let co2DataCache = {};
    let debounceTimer;

    const globeContainer = document.getElementById("globe-container");

    if (!globeContainer || typeof Globe !== "function") {
        console.error("Globe initialization failed");
        return;
    }

    // Globe setup
    world = Globe()(globeContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundColor('#121212')
        .pointOfView({ lat: 20, lng: 0, altitude: 2.5 });

    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.6;

    const metricButtons = document.querySelectorAll(".metric-btn");
    const yearSlider = document.getElementById("year-slider");
    const yearValue = document.getElementById("year-value");
    const regionSelect = document.getElementById("region-select");
    const viewTitle = document.getElementById("view-title");
    const statusText = document.getElementById("status-text");
    const aiText = document.getElementById("ai-text");
    const noDataText = document.getElementById("no-data-text");

    const regionInsights = {
        "All regions": "Global emissions vary by region.",
        "Asia": "High growth in energy demand.",
        "Europe": "Gradual emissions decoupling.",
        "Africa": "Low emissions but rising demand.",
        "North America": "Historically high emissions.",
        "Latin America": "Mixed energy sources.",
        "Oceania": "Small but high per-capita emissions."
    };

    const regionCameraTargets = {
        "Europe": { lat: 50, lng: 10, altitude: 2.0 },
        "Asia": { lat: 30, lng: 90, altitude: 2.2 },
        "Africa": { lat: 5, lng: 20, altitude: 2.3 },
        "North America": { lat: 40, lng: -100, altitude: 2.1 },
        "Latin America": { lat: -15, lng: -60, altitude: 2.3 },
        "Oceania": { lat: -20, lng: 140, altitude: 2.6 },
        "All regions": { lat: 20, lng: 0, altitude: 2.5 }
    };

    // Load country centroids by ISO code
    async function loadCountryCoords() {
        const res = await fetch("./countries-centroids.json");
        const data = await res.json();

        data.forEach(c => {
            const key = String(c.code).trim().toUpperCase();
            countryCoords[key] = {
                lat: Number(c.lat),
                lng: Number(c.lng)
            };
        });
    }

    // Parse CSV and normalize region names
    async function loadRegionData() {
        const res = await fetch("./continents2.csv");
        const text = await res.text();

        return new Promise((resolve, reject) => {
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: results => {
                    results.data.forEach(row => {
                        const iso2 = (row["alpha-2"] || "").trim().toUpperCase();
                        const iso3 = (row["alpha-3"] || "").trim().toUpperCase();
                        const rawRegion = (row.region || "").trim();
                        const subRegion = (row["sub-region"] || "").trim();

                        let continent = rawRegion;
                        if (rawRegion === "Americas") {
                            if (subRegion === "Northern America") {
                                continent = "North America";
                            } else if (subRegion === "Latin America and the Caribbean") {
                                continent = "Latin America";
                            }
                        }

                        const key = iso3 || iso2;
                        if (!key || !continent) return;

                        countryRegions[key] = continent;
                    });

                    console.log("Regions loaded:", Object.keys(countryRegions).length);
                    resolve();
                },
                error: err => reject(err)
            });
        });
    }

    async function loadCO2Data(year) {
        if (co2DataCache[year]) {
            return co2DataCache[year];
        }

        const res = await fetch(`https://datain3d-api.onrender.com/co2?year=${year}`);
        const data = await res.json();
        co2DataCache[year] = data;
        return data;
    }

    // Filter points by selected region and metric
    function updateGlobe(data) {
        if (!world || !data) return;

        const selectedRegion = regionSelect.value;

        const values = data
            .map(d => d["CO₂ emissions per capita"])
            .filter(v => v > 0);

        const max = values.length ? Math.max(...values) : 1;

        const points = data.map(d => {

            const code = String(d.Code).trim().toUpperCase();

            const coords = countryCoords[code];
            if (!coords) return null;

            const region = countryRegions[code];

            if (selectedRegion !== "All regions") {
                if (!region) return null;
                if (region !== selectedRegion) return null;
            }

            const value = d["CO₂ emissions per capita"];
            if (!value || value <= 0) return null;

            const normalized = Math.log(value + 1) / Math.log(max + 1);

            return {
                lat: coords.lat,
                lng: coords.lng,
                size: normalized,
                color: `rgb(${Math.floor(255 * normalized)}, ${Math.floor(255 * (1 - normalized))}, 0)`
            };

        }).filter(Boolean);

        if (points.length === 0) {
            world.pointsData([]);
            if (noDataText) {
                noDataText.textContent = `No data points found for ${selectedRegion}. Try another region or year.`;
            }
            return;
        }

        if (noDataText) {
            noDataText.textContent = "";
        }

        world
            .pointsData(points)
            .pointAltitude(d => d.size * 0.5)
            .pointColor(d => d.color);
    }

    function updateTexts() {
        const metric = document.querySelector(".metric-btn.active")?.dataset.metric || "Metric";
        const year = yearSlider.value;
        const region = regionSelect.value;

        viewTitle.textContent = `3D Globe View – ${metric} (${year})`;

        statusText.innerHTML =
            `Viewing <strong>${metric}</strong> for <strong>${region}</strong> in <strong>${year}</strong>.`;

        aiText.textContent = regionInsights[region];
    }

    function updateCamera(region) {
        if (!world || region === lastRegion) return;

        const target = regionCameraTargets[region];
        if (target) {
            world.pointOfView(target, 1000);
            lastRegion = region;
        }
    }

    // EVENTS
    metricButtons.forEach(btn => {
        btn.addEventListener("click", async () => {
            metricButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const data = await loadCO2Data(yearSlider.value);
            updateGlobe(data);
            updateTexts();
        });
    });

    yearSlider.addEventListener("input", () => {
        yearValue.textContent = yearSlider.value;

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            const data = await loadCO2Data(yearSlider.value);
            updateGlobe(data);
            updateTexts();
        }, 300);
    });

    regionSelect.addEventListener("change", async () => {
        updateTexts();
        updateCamera(regionSelect.value);

        const data = await loadCO2Data(yearSlider.value);
        updateGlobe(data);
    });

    // INIT
    await loadCountryCoords();
    await loadRegionData();

    const initialData = await loadCO2Data(yearSlider.value);
    updateGlobe(initialData);
    updateTexts();
});