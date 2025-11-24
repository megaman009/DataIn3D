# DataIn3D  
Prototype for an Interactive 3D Data Visualization Platform

## Overview
DataIn3D is a prototype web-based system developed as part of an academic graduation project.  
Its purpose is to explore how global sustainability metrics can be visualized in a more intuitive and interactive way using modern web technologies.  
The prototype demonstrates the core idea: combining 3D visualization, structured data, and contextual narrative insights into one accessible interface.

This version focuses on layout, interaction design, and a functional 3D globe rendered in the browser. Future iterations will include real datasets, analysis, and expanded features.

## Project Purpose
Large global datasets—such as CO₂ emissions, renewable energy usage, and land/forest statistics—are often difficult to interpret through static charts.  
This project aims to prototype a system that:

- Presents data visually through a 3D globe  
- Allows exploration by region, year, and metric  
- Supports basic interaction that reflects real use-cases  
- Lays the groundwork for a full data-driven implementation  

The current prototype serves to demonstrate the feasibility and design of the platform before integrating full backend and analytical functionality.

## Current Features (Prototype)
- Interactive 3D Earth rendered with Globe.gl  
- Region-based camera movement (Asia, Europe, Africa, etc.)  
- Metric selection UI (CO₂, Renewables, Forest area, Energy use)  
- Year slider for future time-series integration  
- Placeholder data summaries (static text simulating AI insights)  
- Responsive three-panel layout (controls, globe, insights)

## Tech Stack
- HTML, CSS, JavaScript  
- Three.js (WebGL renderer)  
- Globe.gl (3D globe library)  
- GitHub Pages (deployment)  
- VS Code (development environment)

## How It Works (Prototype Architecture)
- The centre panel contains a WebGL canvas where Globe.gl renders the Earth.  
- UI controls (metric buttons, year slider, region dropdown) update the display text and trigger camera movements.  
- The right panel presents a simplified summary based on the selected region.  
- At this stage, no live or external data is loaded. All summaries and values are placeholders for demonstration purposes.

## Running the Project
1. Clone or download the repository.  
2. Open the project folder in any code editor.  
3. Open **index.html** in a browser.  
No build steps or dependencies are required for the prototype.

The deployed version is automatically updated via GitHub Pages.

## Planned Future Development
- Integration of real datasets (World Bank, UN Data, OWID).  
- Country-level polygon coloring (choropleth maps).  
- Data-driven markers and 3D extrusions.  
- Basic SQL storage and backend API for metric retrieval.  
- Actual AI-generated data summaries powered by an LLM.  
- Enhanced UI and data charts accompanying the globe.  
- Improved regional logic and user interactivity.

## Data Sources (Planned)
Although no external data is loaded in the prototype, the full project will use:
- World Bank Open Data  
- UN SDG Indicators  
- Our World in Data  
- Additional APIs for climate and environmental information  

## Author
Developed by myself as part of a Sodtware Engineering graduation project.  
This prototype demonstrates the foundational concept, with further development planned for the full implementation.

