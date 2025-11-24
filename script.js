document.addEventListener("DOMContentLoaded", () => {

    // Reference to the globe instance
    let world = null;

    // Container element for the 3D globe
    const globeContainer = document.getElementById("globe-container");

    // Initialise the globe if the container and library exist
    if (globeContainer && typeof Globe === "function") {
        world = Globe()
            (globeContainer)
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundColor('#121212')
            .pointOfView({ lat: 20, lng: 0, altitude: 2.5 });

        // Basic slow rotation for constant motion
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.6;

        // Force a resize of the canvas after the globe is created
        setTimeout(() => {
            const canvas = globeContainer.querySelector("canvas");
            if (canvas) {
                canvas.style.width = "100%";
                canvas.style.height = "auto";
    }
}, 300);

    }

    // UI element references
    const metricButtons = document.querySelectorAll(".metric-btn");
    const yearSlider = document.getElementById("year-slider");
    const yearValue = document.getElementById("year-value");
    const regionSelect = document.getElementById("region-select");
    const viewTitle = document.getElementById("view-title");
    const statusText = document.getElementById("status-text");
    const aiText = document.getElementById("ai-text");

    // Static regional summaries used as placeholder AI outputs
    const regionInsights = {
        "All regions": "Globally, environmental trends vary significantly between regions. High-income economies often show stabilising or slightly declining CO₂ emissions per capita, while many emerging economies are still on a growth curve. Renewable energy adoption is increasing overall, but at different speeds.",
        "Asia": "Asia combines some of the fastest-growing economies with rapidly increasing energy demand. Many countries are still heavily reliant on fossil fuels, but investment in renewables and large-scale projects is accelerating, especially in China and India.",
        "Europe": "Europe generally shows declining CO₂ emissions per capita and a strong shift towards renewables. Many EU countries have climate targets, carbon pricing, and policies supporting energy transition and forest protection.",
        "Africa": "Africa’s per-capita emissions remain relatively low compared to other regions, but access to energy is uneven. Solar and wind capacity have high potential, while land-use and deforestation remain key challenges.",
        "North America": "North America has historically high per-capita emissions. Recent years show partial decoupling of emissions from economic growth, alongside a growing renewable sector.",
        "Latin America": "Latin America shows moderate emissions with a strong presence of hydropower and other renewables. Deforestation and land-use change, especially in the Amazon, are major factors.",
        "Oceania": "Oceania has relatively high emissions per capita. Renewable capacity is increasing, but fossil fuel exports and climate vulnerability remain core issues."
    };

    // Globe camera coordinates per region (used when switching regions)
    const regionCameraTargets = {
        "Europe": { lat: 50, lng: 10, altitude: 2.0 },
        "Asia": { lat: 30, lng: 90, altitude: 2.2 },
        "Africa": { lat: 5, lng: 20, altitude: 2.3 },
        "North America": { lat: 40, lng: -100, altitude: 2.1 },
        "Latin America": { lat: -15, lng: -60, altitude: 2.3 },
        "Oceania": { lat: -20, lng: 140, altitude: 2.6 },
        "All regions": { lat: 20, lng: 0, altitude: 2.5 }
    };

    // Updates the title, summary text and globe camera position
    function updateTexts() {
        const activeMetricBtn = document.querySelector(".metric-btn.active");
        const metric = activeMetricBtn ? activeMetricBtn.dataset.metric : "Metric";
        const year = yearSlider.value;
        const region = regionSelect.value;

        viewTitle.textContent = `3D Globe View – ${metric} (${year})`;

        statusText.innerHTML = `
            Viewing <strong>${metric}</strong> for <strong>${region}</strong> in <strong>${year}</strong>.
        `;

        aiText.textContent = regionInsights[region] || regionInsights["All regions"];

        // Move the globe camera to match the selected region
        if (world) {
            const target = regionCameraTargets[region] || regionCameraTargets["All regions"];
            world.pointOfView(target, 1000);
        }
    }

    // Metric button behaviour
    metricButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            metricButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            updateTexts();
        });
    });

    // Year slider behaviour
    yearSlider.addEventListener("input", () => {
        yearValue.textContent = yearSlider.value;
        updateTexts();
    });

    // Region selection behaviour
    regionSelect.addEventListener("change", () => {
        updateTexts();
    });

    // Initialise UI state on first load
    updateTexts();
});
