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
    Calls OpenRouter API and returns a historical narrative
*/
app.get("/insights", async (req, res) => {
    const { year, region } = req.query;

    if (!year || !region) {
        return res.status(400).json({ error: "year and region are required" });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "OpenRouter API key not configured" });
    }

    const prompt = `You are an educational assistant for a CO₂ emissions data visualisation tool called DataIn3D. Write a single short paragraph (2-3 sentences) about CO₂ emissions in ${region} in ${year}. Mention real historical events like wars, disasters, economic crises, or energy policy changes if relevant. Be factual, engaging and educational. Do not include any thinking, planning, or meta-commentary — just the paragraph itself.`;

    try {
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                    "HTTP-Referer": "https://megaman009.github.io/DataIn3D",
                    "X-Title": "DataIn3D"
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b:free",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 150
                })
            }
        );

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;

        if (!text) {
            return res.status(500).json({ error: "No response from OpenRouter", raw: data });
        }

        const paragraphs = text.trim().split("\n").filter(p => p.trim().length > 0);
        const insight = paragraphs[paragraphs.length - 1].trim();
        res.json({ insight });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});