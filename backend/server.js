const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());

// Database connection
const db = new sqlite3.Database("./datain3d.db");

// Test route
app.get("/", (req, res) => {
    res.send("API is running");
});

/*
    FLEXIBLE CO2 ROUTE
    Examples:
    /co2?year=2020
    /co2?country=AUS
    /co2?year=2020&country=AUS
*/
app.get("/co2", (req, res) => {
    const { year, country } = req.query;

    let query = `
        SELECT Entity, Code, Year, "CO₂ emissions per capita"
        FROM "co-emissions-per-capita"
        WHERE 1=1
    `;

    const params = [];

    if (year) {
        query += " AND Year = ?";
        params.push(year);
    }

    if (country) {
        query += " AND Code = ?";
        params.push(country);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

/*
    AI INSIGHTS ROUTE
    Example: /insights?year=1986&region=Europe
    Calls Gemini API and returns a historical narrative
*/
app.get("/insights", async (req, res) => {
    const { year, region } = req.query;

    if (!year || !region) {
        return res.status(400).json({ error: "year and region are required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key not configured" });
    }

    const prompt = `You are an educational assistant for a CO₂ emissions data visualisation tool called DataIn3D.

The user is currently viewing CO₂ emissions per capita data for the region "${region}" in the year ${year}.

Write a 2-3 sentence educational insight that:
- Explains what was happening with CO₂ emissions in ${region} around ${year}
- References specific real-world historical events if relevant (e.g. wars, economic crises, energy policy changes, industrial growth, natural disasters, major agreements like Kyoto Protocol etc.)
- Is engaging, informative and educational in tone
- Is factually accurate

Only return the insight text, no headings, no bullet points, no extra formatting.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { maxOutputTokens: 150, temperature: 0.7 }
                })
            }
        );

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return res.status(500).json({ error: "No response from Gemini", raw: data });
        }

        res.json({ insight: text.trim() });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});