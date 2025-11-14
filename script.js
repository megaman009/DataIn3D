// Run this code after the page has loaded
document.addEventListener("DOMContentLoaded", () => {
    const metricButtons = document.querySelectorAll(".metric-btn");
    const yearSlider = document.getElementById("year-slider");
    const yearValue = document.getElementById("year-value");
    const regionSelect = document.getElementById("region-select");
    const viewTitle = document.getElementById("view-title");
    const statusText = document.getElementById("status-text");
    const aiText = document.getElementById("ai-text");

    // Simple "AI-style" summaries for each region (static demo content)
    const regionInsights = {
        "All regions": "Globally, environmental trends vary significantly between regions. High-income economies often show stabilising or slightly declining CO₂ emissions per capita, while many emerging economies are still on a growth curve. Renewable energy adoption is increasing overall, but at different speeds.",
        "Asia": "Asia combines some of the fastest-growing economies with rapidly increasing energy demand. Many countries are still heavily reliant on fossil fuels, but investment in renewables and large-scale projects is accelerating, especially in China and India.",
        "Europe": "Europe generally shows declining CO₂ emissions per capita and a strong shift towards renewables. Many EU countries have climate targets, carbon pricing, and policies that support energy transition and forest protection.",
        "Africa": "Africa’s per-capita emissions remain relatively low compared to other regions, but access to energy is still uneven. There is high potential for solar and wind deployment, and land-use changes and deforestation are key sustainability challenges.",
        "North America": "North America has historically high emissions per capita. In recent years, there has been some decoupling of emissions from economic growth, alongside growth in renewables. However, overall consumption patterns remain resource-intensive.",
        "Latin America": "Latin America shows moderate emissions per capita with a relatively high share of hydropower and other renewables. Deforestation and land-use change, particularly in the Amazon, are critical factors for regional sustainability.",
        "Oceania": "Oceania, dominated by Australia and New Zealand, has relatively high emissions per capita. Renewable energy capacity is expanding, but fossil fuel exports and climate vulnerability (e.g., for Pacific island nations) remain central issues."
    };


    // Helper to get current state and update texts
    function updateTexts() {
        const activeMetricBtn = document.querySelector(".metric-btn.active");
        const metric = activeMetricBtn ? activeMetricBtn.dataset.metric : "Metric";
        const year = yearSlider.value;
        const region = regionSelect.value;

        viewTitle.textContent = `3D Globe View – ${metric} (${year})`;
        statusText.innerHTML = `
            Viewing <strong>${metric}</strong> for <strong>${region}</strong> in <strong>${year}</strong>.
        `;

        // Pick an "AI" summary based on region, default to global if missing
        const summary = regionInsights[region] || regionInsights["All regions"];
        aiText.textContent = summary;
    }

    // When a metric button is clicked
    metricButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all
            metricButtons.forEach(b => b.classList.remove("active"));
            // Add active to clicked one
            btn.classList.add("active");
            // Update texts
            updateTexts();
        });
    });

    // When year slider is moved
    yearSlider.addEventListener("input", () => {
        yearValue.textContent = yearSlider.value;
        updateTexts();
    });

    // When region is changed
    regionSelect.addEventListener("change", () => {
        updateTexts();
    });

    // Initialise texts once at start
    updateTexts();
});
