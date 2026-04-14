const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});