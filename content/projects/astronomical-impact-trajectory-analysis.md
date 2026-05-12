---
title: Astronomical Impact Trajectory Analysis
slug: astronomical-impact-trajectory-analysis
summary: A draft project dossier for an unfinished system.
description: A draft project dossier for an unfinished system.
date: 2026-05-12
updatedAt: 2026-05-12
type: project
status: draft
year: 2026
lab: physics
tags: []
stack:
  - Python
coverImage: ""
coverAlt: ""
coverCaption: ""
coverStyle: editorial-gradient
coverPosition: center
accentColor: coral
mediaRefs: []
blocks: []
docsPath: /docs/Astronomical Impact Trajectory Analysis
docsFolder: astronomical-impact-trajectory-analysis
docsPaths: []
relatedDocs: []
seoTitle: Astronomical Impact Trajectory Analysis | Gribo Digital
seoDescription: Draft editorial note from the Gribo Digital archive.
ogImage: /og/gribo-digital.png
canonical: ""
noindex: true
projectIndex: "1. Project Overview\\n- What this project studies\\n- What this project does not claim\\n- Why Moray was selected as a case study\\n- Computational archaeology, orbital mechanics and speculative modeling\\n\\n2. Research Question\\n- Can a sequence of terrestrial points be treated as a possible impact trajectory?\\n- What can be inferred from geographic coordinates alone?\\n- What cannot be inferred without field measurements?\\n\\n3. Data Model\\n- Impact points\\n- Coordinate order\\n- Latitude and longitude\\n- Sample dataset\\n- Assumptions about point sequence\\n\\n4. Coordinate Systems\\n- Geographic coordinates\\n- ITRS: Earth-fixed reference frame\\n- ICRS: celestial reference frame\\n- Galactic coordinates\\n- Why astronomical time matters\\n\\n5. Trajectory Model\\n- Point sorting\\n- Cartesian conversion\\n- Direction vector\\n- Unit vector\\n- Vector averaging\\n- Projection distance\\n\\n6. Celestial Projection\\n- What the projection means\\n- What it does not mean\\n- RA and Dec\\n- Galactic longitude and latitude\\n- Plotly celestial map\\n\\n7. Orbital Elements\\n- Position vector\\n- Velocity vector\\n- Meteor velocity assumption\\n- Angular momentum\\n- Eccentricity vector\\n- Semimajor axis\\n- Inclination\\n- Ascending node\\n- Argument of periapsis\\n- True anomaly\\n- Mean anomaly\\n- Orbital type\\n\\n8. Application Architecture\\n- Streamlit interface\\n- Calculation engine\\n- Visualization engine\\n- Utility layer\\n- Export formats\\n\\n9. Code Walkthrough\\n- app.py\\n- trajectory_calculator.py\\n- visualization.py\\n- utils.py\\n\\n10. Moray Case Study\\n- Archaeological context\\n- Sacred landscape\\n- Agricultural engineering\\n- Circular depressions\\n- Why the site invites geometric interpretation\\n\\n11. Results and Interpretation\\n- Map output\\n- Celestial projection output\\n- Orbital elements output\\n- Why the results are exploratory\\n\\n12. Limitations\\n- Missing field data\\n- Missing crater geometry\\n- Missing geological evidence\\n- Simplified velocity model\\n- Atmospheric entry not modeled\\n- No N-body orbital reconstruction\\n\\n13. Future Work\\n- Drone photogrammetry\\n- DEM/topographic models\\n- Crater depth measurements\\n- Mineralogical testing\\n- Monte Carlo uncertainty simulation\\n- Comparison with known meteorite trajectories\\n- Integration with JPL Horizons or ephemeris data\\n\\n14. References\\n- Astropy\\n- NASA/JPL\\n- Kepler\\n- Newton\\n- Moray archaeological sources"
projectIndexIntro: "## 1. Project Overview\n- What this project studies\n- What this project does not claim\n- Why Moray was selected as a case study\n- Computational archaeology, orbital mechanics and speculative modeling\n\n## 2. Research Question\n- Can a sequence of terrestrial points be treated as a possible impact trajectory?\n- What can be inferred from geographic coordinates alone?\n- What cannot be inferred without field measurements?\n\n## 3. Data Model\n- Impact points\n- Coordinate order\n- Latitude and longitude\n- Sample dataset\n- Assumptions about point sequence\n\n## 4. Coordinate Systems\n- Geographic coordinates\n- ITRS: Earth-fixed reference frame\n- ICRS: celestial reference frame\n- Galactic coordinates\n- Why astronomical time matters\n\n## 5. Trajectory Model\n- Point sorting\n- Cartesian conversion\n- Direction vector\n- Unit vector\n- Vector averaging\n- Projection distance\n\n## 6. Celestial Projection\n- What the projection means\n- What it does not mean\n- RA and Dec\n- Galactic longitude and latitude\n- Plotly celestial map\n\n## 7. Orbital Elements\n- Position vector\n- Velocity vector\n- Meteor velocity assumption\n- Angular momentum\n- Eccentricity vector\n- Semimajor axis\n- Inclination\n- Ascending node\n- Argument of periapsis\n- True anomaly\n- Mean anomaly\n- Orbital type\n\n## 8. Application Architecture\n- Streamlit interface\n- Calculation engine\n- Visualization engine\n- Utility layer\n- Export formats\n\n## 9. Code Walkthrough\n- app.py\n- trajectory_calculator.py\n- visualization.py\n- utils.py\n\n## 10. Moray Case Study\n- Archaeological context\n- Sacred landscape\n- Agricultural engineering\n- Circular depressions\n- Why the site invites geometric interpretation\n\n## 11. Results and Interpretation\n- Map output\n- Celestial projection output\n- Orbital elements output\n- Why the results are exploratory\n\n## 12. Limitations\n- Missing field data\n- Missing crater geometry\n- Missing geological evidence\n- Simplified velocity model\n- Atmospheric entry not modeled\n- No N-body orbital reconstruction\n\n## 13. Future Work\n- Drone photogrammetry\n- DEM/topographic models\n- Crater depth measurements\n- Mineralogical testing\n- Monte Carlo uncertainty simulation\n- Comparison with known meteorite trajectories\n- Integration with JPL Horizons or ephemeris data\n\n## 14. References\n- Astropy\n- NASA/JPL\n- Kepler\n- Newton\n- Moray archaeological sources"
projectMemory: "This project studies the possibility of converting selected geographic points into a hypothetical impact trajectory and projecting that trajectory into celestial space.\\n\\nIt does not prove that Moray or any archaeological structure was created by a meteorite impact.\\n\\nMoray is selected because it is a geometrically, historically and symbolically rich Andean site whose circular terraces invite questions about land, sky, design and interpretation.\\n\\nThe project combines computational archaeology, orbital mechanics and speculative modeling to create a transparent research workflow. Its strongest contribution is not a final answer. Its strongest contribution is the method: a way to transform a fragile hypothesis into a visible, auditable and improvable computational process."
projectMemoryBody: test
projectMemoryIntro: test
projectMemoryTitle: test
projectOverviewBody: test
projectOverviewTitle: test
---

# Astronomical Impact Trajectory Analysis

Before this becomes a finished system, this dossier keeps track of what is being built, what is still uncertain, and which decisions leave a trace.
