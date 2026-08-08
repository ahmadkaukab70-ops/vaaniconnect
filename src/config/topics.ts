import { TopicData } from '../types';

export const topics: Record<string, TopicData> = {
  technology: {
    id: 'technology',
    name: 'Technology & AI',
    eyebrow: 'Autonomous Systems & Neural Architecture',
    headline: 'Engineering the Next Frontier of Intelligence',
    description: 'A comprehensive architectural framework exploring decentralized computation, quantum-resistant security layers, and cognitive machine interfaces designed for extreme scale.',
    ctaText: 'Explore System Specs',
    secondaryCtaText: 'View Benchmark Data',
    objectType: 'torusKnot',
    statistics: [
      { label: 'Computational Throughput', value: '4.8 PFLOPS', change: '+340% YoY', description: 'Real-time neural inference capacity across distributed clusters.' },
      { label: 'Latency Overhead', value: '< 1.2ms', change: '-45% optimized', description: 'Deterministic end-to-end response time in edge nodes.' },
      { label: 'Security Compliance', value: 'Zero-Trust', change: 'Post-Quantum', description: 'Lattice-based cryptography protecting sovereign data payloads.' },
      { label: 'Energy Efficiency', value: '89.4%', change: 'PUE 1.04', description: 'Liquid-cooled immersion infrastructure minimizing carbon footprint.' }
    ],
    features: [
      { title: 'Neural Mesh Routing', subtitle: 'Dynamic Load Balancing', description: 'Self-healing topologies that route packets through optimal paths based on live latency and threat telemetry.', iconName: 'Cpu', metric: '99.999%' },
      { title: 'Autonomous State Syncer', subtitle: 'Distributed Consensus', description: 'Deterministic state synchronization across multi-region clusters without locking bottlenecks.', iconName: 'Network', metric: '0ms drift' },
      { title: 'Cognitive API Gateway', subtitle: 'Intelligent Rate Shaping', description: 'Context-aware request prioritization and schema validation at wire speed.', iconName: 'Shield', metric: '10M req/s' }
    ],
    timeline: [
      { year: '2024', title: 'Decentralized Core v1', description: 'Initial release of sovereign compute mesh protocol.', tag: 'Foundation' },
      { year: '2025', title: 'Quantum Encryption Integration', description: 'Deployment of lattice-based post-quantum key exchange.', tag: 'Security' },
      { year: '2026', title: 'Autonomous Agent Swarms', description: 'Self-orchestrating microservices operating at sub-millisecond cadence.', tag: 'Evolution' }
    ],
    gallery: [
      { title: 'Neural Core Topology', category: 'Architecture', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', description: 'High-density fiber optic pathways interconnecting distributed cluster nodes.' },
      { title: 'Quantum Compute Chamber', category: 'Hardware', imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80', description: 'Millikelvin dilution refrigerator housing superconducting qubit arrays.' }
    ]
  },
  science: {
    id: 'science',
    name: 'Quantum & Space',
    eyebrow: 'Astrophysical Dynamics & Particle Physics',
    headline: 'Decodifying the Fundamental Laws of Matter',
    description: 'Investigating subatomic particle interactions and cosmic microwave anisotropies to model the universe from Planck length to galactic filaments.',
    ctaText: 'Access Telemetry',
    secondaryCtaText: 'Download Research',
    objectType: 'icosahedron',
    statistics: [
      { label: 'Detection Sensitivity', value: '10⁻²¹ m', change: 'LIGO Calibrated', description: 'Gravitational wave displacement resolution across arm interferometers.' },
      { label: 'Spectroscopic Range', value: '0.1 - 28 µm', change: 'JWST Spectrum', description: 'Infrared atmospheric characterization of exoplanetary atmospheres.' },
      { label: 'Particle Collision', value: '13.6 TeV', change: 'LHC Run 3', description: 'Center-of-mass energy probing supersymmetric particle signatures.' },
      { label: 'Cosmic Mapping', value: '2.4B Obj', change: 'Sloan Survey', description: 'Cataloged celestial coordinates and redshift velocities.' }
    ],
    features: [
      { title: 'Interferometric Arrays', subtitle: 'Phase Coherence', description: 'Synchronized radio telescope arrays synthesizing planetary-scale aperture resolution.', iconName: 'Radio', metric: 'µas precision' },
      { title: 'Spectroscopic Analysis', subtitle: 'Atmospheric Fingerprints', description: 'High-resolution transmission spectroscopy identifying biosignature gases.', iconName: 'Sparkles', metric: 'ppm accuracy' },
      { title: 'Dark Matter Modeling', subtitle: 'N-Body Simulations', description: 'Massive gravitational clustering simulations across cosmological timescales.', iconName: 'Globe', metric: '10¹² particles' }
    ],
    timeline: [
      { year: '2015', title: 'First Gravitational Wave', description: 'LIGO collaboration records binary black hole coalescence.', tag: 'Discovery' },
      { year: '2022', title: 'Deep Field Calibration', description: 'First light imagery capturing primordial galaxy clusters.', tag: 'Observation' },
      { year: '2026', title: 'Quantum Gravity Synthesis', description: 'Unified field equations verified in high-energy collider tests.', tag: 'Theory' }
    ],
    gallery: [
      { title: 'Nebular Star Birth', category: 'Cosmology', imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80', description: 'Stellar nursery pillars of gas and dust collapsing under gravitational force.' },
      { title: 'Particle Collision Event', category: 'Subatomic', imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80', description: 'Track reconstruction of proton-proton collision in toroidal magnetic field.' }
    ]
  },
  environment: {
    id: 'environment',
    name: 'Ecology & Climate',
    eyebrow: 'Planetary Systems & Biosphere Resilience',
    headline: 'Restoring Equilibrium to Global Ecosystems',
    description: 'Data-driven ecological modeling, carbon sequestration analytics, and regenerative biodiversity frameworks designed for planetary stewardship.',
    ctaText: 'View Biosphere Metrics',
    secondaryCtaText: 'Climate Model Explorer',
    objectType: 'dodecahedron',
    statistics: [
      { label: 'Carbon Capture Rate', value: '1.4 Gt/yr', change: '+28% Target', description: 'Aggregated direct air capture and biological sink capacity.' },
      { label: 'Ocean Acidification', value: '8.08 pH', change: 'Stabilizing', description: 'Real-time buoy monitoring across Pacific and Atlantic gyres.' },
      { label: 'Biodiversity Index', value: '84.2%', change: '+4.5% regen', description: 'Acoustic and satellite monitoring of primary rainforest reserves.' },
      { label: 'Renewable Penetration', value: '68.5% Grid', change: 'Global Average', description: 'Solar, wind, and geothermal share of total primary energy.' }
    ],
    features: [
      { title: 'Satellite Carbon Tracking', subtitle: 'Hyper-Spectral Imaging', description: 'Orbital sensors measuring methane plumes and forest canopy carbon density in real time.', iconName: 'Leaf', metric: '30m resolution' },
      { title: 'Oceanic Current Buffering', subtitle: 'Thermodynamic Modeling', description: 'Predictive models of Atlantic Meridional Overturning Circulation stability.', iconName: 'Waves', metric: 'Daily sync' },
      { title: 'Regenerative Agriculture', subtitle: 'Soil Microbiome Metrics', description: 'IoT sensor arrays tracking organic carbon accumulation and nitrogen retention.', iconName: 'Sprout', metric: '100k farms' }
    ],
    timeline: [
      { year: '2020', title: 'Global Carbon Ledger', description: 'Standardized MRV protocols established for sovereign offsets.', tag: 'Policy' },
      { year: '2023', title: 'Direct Air Scaling', description: 'Megaton-scale sequestration facilities operational.', tag: 'Technology' },
      { year: '2026', title: 'Biosphere Net Positive', description: 'Global carbon flux tipping point achieved across major biomes.', tag: 'Milestone' }
    ],
    gallery: [
      { title: 'Canopy Density Analysis', category: 'Forestry', imageUrl: 'https://images.unsplash.com/photo-1511497584788-876761142212?auto=format&fit=crop&w=1200&q=80', description: 'Airborne LiDAR mapping of multi-tiered rainforest biomass.' },
      { title: 'Renewable Energy Grid', category: 'Clean Power', imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80', description: 'Offshore wind farm integration with smart battery storage facilities.' }
    ]
  },
  history: {
    id: 'history',
    name: 'Civilization & History',
    eyebrow: 'Historical Artifacts & Societal Evolution',
    headline: 'Mapping the Architectural Heritage of Humanity',
    description: 'Digital preservation of archaeological sites, linguistic evolution mapping, and socio-economic trend analysis across millennia.',
    ctaText: 'Explore Archive',
    secondaryCtaText: 'Chronology Index',
    objectType: 'octahedron',
    statistics: [
      { label: 'Digitized Artifacts', value: '14.2M', change: '3D Photogrammetry', description: 'High-fidelity digital twins of museum and field antiquities.' },
      { label: 'Translated Codices', value: '4,850+', change: 'Neural Decoders', description: 'Ancient scripts deciphered via transformer-based paleography.' },
      { label: 'Mapped Settlements', value: '128K Sites', change: 'LiDAR Survey', description: 'Unmapped pre-industrial urban centers revealed beneath canopy.' },
      { label: 'Oral History Audio', value: '85K Hours', change: 'Restored & Indexed', description: 'Archived vernacular recordings spanning 140 linguistic families.' }
    ],
    features: [
      { title: 'Photogrammetric Archives', subtitle: 'Sub-Millimeter Twins', description: 'Laser scanning endangered heritage sites for permanent virtual preservation.', iconName: 'Camera', metric: '0.1mm accuracy' },
      { title: 'Linguistic Phylogeny', subtitle: 'Cognate Mapping', description: 'Tracing ancestral roots of modern dialects through computational cladistics.', iconName: 'BookOpen', metric: '7,000 languages' },
      { title: 'Trade Route Simulation', subtitle: 'Economic Flow', description: 'Agent-based modeling of Silk Road and maritime trade economies.', iconName: 'Compass', metric: '3,000 BCE - 1800' }
    ],
    timeline: [
      { year: '3000 BCE', title: 'Cuneiform & Early Scripts', description: 'Emergence of administrative record keeping in Mesopotamia.', tag: 'Origin' },
      { year: '1450 CE', title: 'Printing Press Revolution', description: 'Mass dissemination of knowledge across European centers.', tag: 'Transformation' },
      { year: '2026', title: 'Global Heritage Vault', description: 'Comprehensive decentralized backup of world culture archives.', tag: 'Preservation' }
    ],
    gallery: [
      { title: 'Ancient Architectural Twin', category: 'Heritage', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', description: 'High-resolution 3D photogrammetry model of classical masonry.' },
      { title: 'Historical Manuscript', category: 'Codex', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80', description: 'Illuminated parchment preserved under nitrogen atmosphere.' }
    ]
  },
  business: {
    id: 'business',
    name: 'Global Economics & Finance',
    eyebrow: 'Market Dynamics & Capital Allocation',
    headline: 'Optimizing Global Value Chains and Liquidity',
    description: 'Advanced financial engineering, risk contagion modeling, and institutional liquidity architectures for frictionless cross-border commerce.',
    ctaText: 'Analyze Markets',
    secondaryCtaText: 'Treasury Analytics',
    objectType: 'sphere',
    statistics: [
      { label: 'Daily Clearing Volume', value: '$4.2T', change: 'Instant Settlement', description: 'Atomic delivery-versus-payment settlement across major liquidity pools.' },
      { label: 'Risk VaR Precision', value: '99.98%', change: 'Monte Carlo 10M', description: 'Portfolio exposure modeling under extreme market stress scenarios.' },
      { label: 'Supply Chain Nodes', value: '1.8M Active', change: 'Real-Time IoT', description: 'Tracked inventory units across global maritime and air freight corridors.' },
      { label: 'Capital Efficiency', value: '+34.2%', change: 'Optimized Margin', description: 'Reduction in collateral lockup via automated treasury algorithms.' }
    ],
    features: [
      { title: 'Atomic Settlement Engine', subtitle: 'Zero Counterparty Risk', description: 'Instantaneous multi-party asset exchange using cryptographic state proofs.', iconName: 'DollarSign', metric: '< 500ms settlement' },
      { title: 'Contagion Stress Testing', subtitle: 'Macro Simulation', description: 'Simulating cascading credit defaults across interconnected banking networks.', iconName: 'TrendingUp', metric: '10,000 scenarios' },
      { title: 'Dynamic Working Capital', subtitle: 'Liquidity Optimization', description: 'Automated cash sweep and invoice discounting based on real-time ERP feeds.', iconName: 'PieChart', metric: '18% yield boost' }
    ],
    timeline: [
      { year: '1971', title: 'Electronic Marketmaking', description: 'Inception of automated quotation and execution networks.', tag: 'Digitization' },
      { year: '2010', title: 'Algorithmic High-Frequency', description: 'Sub-millisecond market clearing and smart order routing.', tag: 'Speed' },
      { year: '2026', title: 'Autonomous Treasury Nets', description: 'Self-balancing institutional liquidity pools operating 24/7.', tag: 'Maturity' }
    ],
    gallery: [
      { title: 'Global Liquidity Hub', category: 'Trading', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80', description: 'Real-time order book depth visualization across international exchanges.' },
      { title: 'Supply Chain Corridor', category: 'Logistics', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', description: 'Automated container port handling millions of TEUs annually.' }
    ]
  },
  education: {
    id: 'education',
    name: 'Cognitive Science & Education',
    eyebrow: 'Adaptive Learning & Knowledge Transfer',
    headline: 'Personalized Cognitive Apprenticeship at Scale',
    description: 'Neuroscience-backed pedagogical frameworks, interactive simulations, and adaptive mentorship models tailored to individual cognitive curves.',
    ctaText: 'Enter Curriculum',
    secondaryCtaText: 'Cognitive Profiler',
    objectType: 'torusKnot',
    statistics: [
      { label: 'Knowledge Retention', value: '94.8%', change: '+38% vs Traditional', description: 'Spaced repetition and active recall mastery verification.' },
      { label: 'Active Learners', value: '45M+', change: 'Global Cohort', description: 'Enrolled students engaging with interactive simulation modules.' },
      { label: 'Skill Mastery Velocity', value: '3.4x Faster', change: 'Adaptive Paths', description: 'Time required to achieve professional competency benchmarks.' },
      { label: 'Curriculum Coverage', value: '120K Topics', change: 'Peer-Reviewed', description: 'Comprehensive domain knowledge graphs verified by experts.' }
    ],
    features: [
      { title: 'Adaptive Pacing Engine', subtitle: 'Cognitive Load Balancing', description: 'Real-time difficulty adjustment matching working memory limits and fatigue curves.', iconName: 'Brain', metric: 'Dynamic Hz' },
      { title: 'Immersive Lab Simulators', subtitle: 'Virtual Experiential Sandbox', description: 'WebGL chemistry, physics, and surgery simulators for hands-on experiential training.', iconName: 'Beaker', metric: '60 FPS simulation' },
      { title: 'Peer Synthesis Networks', subtitle: 'Collaborative Problem Solving', description: 'Structured Socratic discourse pods guided by domain-expert facilitation agents.', iconName: 'Users', metric: '98% engagement' }
    ],
    timeline: [
      { year: '2012', title: 'Massive Open Online Scale', description: 'Democratization of university lectures to global audiences.', tag: 'Access' },
      { year: '2020', title: 'Adaptive Knowledge Graphs', description: 'Personalized prerequisite mapping and mastery diagnostics.', tag: 'Intelligence' },
      { year: '2026', title: 'Cognitive Apprenticeship Agents', description: 'One-on-one expert tutoring available for every student worldwide.', tag: 'Personalization' }
    ],
    gallery: [
      { title: 'Immersive Physics Sandbox', category: 'Simulation', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', description: 'Interactive quantum mechanics simulation manipulated in 3D space.' },
      { title: 'Collaborative Study Pod', category: 'Campus', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', description: 'Students engaging in joint problem-solving using interactive whiteboards.' }
    ]
  },
  culture: {
    id: 'culture',
    name: 'Culture & Arts',
    eyebrow: 'Aesthetic Expression & Narrative Design',
    headline: 'Synthesizing Global Aesthetics and Human Stories',
    description: 'Exploring the intersection of generative art, architectural spatial design, and cross-cultural storytelling in the digital renaissance.',
    ctaText: 'Explore Exhibition',
    secondaryCtaText: 'Curator Notes',
    objectType: 'icosahedron',
    statistics: [
      { label: 'Curated Exhibitions', value: '1,240', change: 'Global Venues', description: 'Virtual and physical showcases celebrating contemporary creators.' },
      { label: 'Cultural Archives', value: '4.5M Items', change: 'Multi-Media', description: 'Preserved music, literature, visual arts, and oral histories.' },
      { label: 'Global Audience', value: '120M Reach', change: '180 Countries', description: 'Cross-border engagement with diverse artistic expressions.' },
      { label: 'Creator Grants', value: '$45M Distributed', change: 'Independent Art', description: 'Funding innovative storytelling and avant-garde media projects.' }
    ],
    features: [
      { title: 'Generative Canvas Studio', subtitle: 'Algorithmic Art', description: 'Tools for artists to blend code, vector graphics, and neural styles into installations.', iconName: 'Palette', metric: 'Infinite scale' },
      { title: 'Spatial Acoustic Halls', subtitle: 'Immersive Soundscapes', description: 'Binaural audio environments reproducing historic acoustic architecture.', iconName: 'Volume2', metric: 'Dolby Atmos' },
      { title: 'Multilingual Narrative Engine', subtitle: 'Cultural Nuance', description: 'Context-aware translation preserving poetic and idiom fidelity across dialects.', iconName: 'Languages', metric: '120 dialects' }
    ],
    timeline: [
      { year: '1995', title: 'Digital Art Genesis', description: 'First web-based galleries and interactive multimedia exhibitions.', tag: 'Dawn' },
      { year: '2018', title: 'Immersive Projection Spaces', description: 'Walk-in algorithmic projection rooms transforming museum culture.', tag: 'Experience' },
      { year: '2026', title: 'Decentralized Cultural Commons', description: 'Global preservation and co-creation of shared human heritage.', tag: 'Renaissance' }
    ],
    gallery: [
      { title: 'Generative Light Installation', category: 'Exhibition', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', description: 'Interactive LED sculpture responding to ambient spectator movement.' },
      { title: 'Acoustic Concert Hall', category: 'Architecture', imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80', description: 'Parametric wood paneling designed for optimal acoustic dispersion.' }
    ]
  },
  social: {
    id: 'social',
    name: 'Society & Ethics',
    eyebrow: 'Governance, Rights & Human Impact',
    headline: 'Building Equitable Institutions for a Complex World',
    description: 'Rigorous ethical frameworks, democratic deliberation tools, and social impact metrics addressing inequality, privacy, and civic trust.',
    ctaText: 'Read Ethics Manifesto',
    secondaryCtaText: 'Policy Frameworks',
    objectType: 'dodecahedron',
    statistics: [
      { label: 'Civic Participation', value: '78.4%', change: '+22% Voting', description: 'Encouraging verified citizen engagement in municipal budgeting.' },
      { label: 'Privacy Compliance', value: '100% Zero-Knowledge', change: 'Data Sovereignty', description: 'Ensuring personal data remains encrypted and user-controlled.' },
      { label: 'Algorithmic Audit', value: 'Zero Bias', change: 'Continuous Red-Team', description: 'Regular third-party verification of fairness in public decision models.' },
      { label: 'Dispute Resolution', value: '48hr Median', change: 'Community Jury', description: 'Decentralized, restorative mediation for digital community conflicts.' }
    ],
    features: [
      { title: 'Deliberative Democracy Portals', subtitle: 'Quadratic Voting', description: 'Transparent platforms for weighted citizen preference aggregation and policy design.', iconName: 'Users', metric: 'Verified ID' },
      { title: 'Algorithmic Fairness Guard', subtitle: 'Bias Mitigation', description: 'Automated auditing tools detecting demographic skew in automated systems.', iconName: 'Scale', metric: '0.001 disparity' },
      { title: 'Transparent Philanthropy', subtitle: 'Impact Traceability', description: 'Smart contract escrow releasing grant funding upon milestone verification.', iconName: 'HeartHandshake', metric: '100% audited' }
    ],
    timeline: [
      { year: '2015', title: 'Digital Rights Charters', description: 'Establishment of baseline online privacy and data ownership laws.', tag: 'Rights' },
      { year: '2021', title: 'Algorithmic Accountability Acts', description: 'Mandatory bias testing for high-stakes public AI systems.', tag: 'Regulation' },
      { year: '2026', title: 'Global Civic Protocols', description: 'Standardized decentralized frameworks for cross-border cooperation.', tag: 'Governance' }
    ],
    gallery: [
      { title: 'Civic Assembly Hall', category: 'Democracy', imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80', description: 'Multicultural delegates collaborating on international humanitarian treaties.' },
      { title: 'Community Innovation Lab', category: 'Grassroots', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80', description: 'Local stakeholders co-designing neighborhood resilience infrastructure.' }
    ]
  },
  innovation: {
    id: 'innovation',
    name: 'Innovation & R&D',
    eyebrow: 'Emerging Technologies & Applied Invention',
    headline: 'Accelerating Breakthroughs from Laboratory to Reality',
    description: 'Venture incubation pipelines, rapid prototyping sandboxes, and technology readiness level assessments for disruptive deep tech.',
    ctaText: 'View R&D Pipeline',
    secondaryCtaText: 'Submit Proposal',
    objectType: 'octahedron',
    statistics: [
      { label: 'Active R&D Projects', value: '340+', change: 'Deep Tech Incubator', description: 'Prototypes undergoing rigorous stress testing and user validation.' },
      { label: 'Patent Portfolios', value: '1,850', change: 'Global IP Protected', description: 'Proprietary core inventions across materials science and quantum tech.' },
      { label: 'Time to Prototype', value: '14 Days', change: '-70% Industry Avg', description: 'Rapid additive manufacturing and digital twin simulation cycle.' },
      { label: 'Success Transition', value: '42.5%', change: 'Commercial Scale', description: 'Projects successfully graduating to production enterprise deployment.' }
    ],
    features: [
      { title: 'Rapid Digital Prototyping', subtitle: 'Virtual Wind & Stress', description: 'Cloud-based physics simulation accelerating hardware iteration cycles.', iconName: 'Zap', metric: '10x iteration' },
      { title: 'Materials Discovery Lab', subtitle: 'Generative Chemistry', description: 'AI-driven molecular screening predicting novel superconductor and alloy properties.', iconName: 'Atom', metric: '1M screened/day' },
      { title: 'Venture Incubation Matrix', subtitle: 'Milestone Gatekeeping', description: 'Automated KPI tracking and resource allocation for early-stage engineering teams.', iconName: 'Rocket', metric: 'Stage-gate AI' }
    ],
    timeline: [
      { year: '2010', title: 'Open Innovation Labs', description: 'Decentralized R&D syndicates sharing open-source hardware blueprints.', tag: 'Openness' },
      { year: '2019', title: 'Generative R&D Acceleration', description: 'AI co-pilots integrated into experimental laboratory workflows.', tag: 'Automation' },
      { year: '2026', title: 'Autonomous Invention Loops', description: 'Self-directed scientific discovery engines synthesizing novel materials.', tag: 'Breakthrough' }
    ],
    gallery: [
      { title: 'Advanced Robotics Lab', category: 'Hardware', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80', description: 'Autonomous robotic arms performing precision circuit assembly and testing.' },
      { title: 'Materials Science Cleanroom', category: 'Nanotech', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', description: 'Researcher inspecting microfluidic semiconductor chips under polarized light.' }
    ]
  },
  future: {
    id: 'future',
    name: 'Future Concepts & Horizon',
    eyebrow: 'Megatrends & Speculative Engineering',
    headline: 'Designing the World of 2050 and Beyond',
    description: 'Speculative horizon scanning, Kardashev energy scaling models, and post-scarcity socio-technical architectures for interplanetary civilization.',
    ctaText: 'Explore Horizon 2050',
    secondaryCtaText: 'Foresight Report',
    objectType: 'sphere',
    statistics: [
      { label: 'Horizon Forecast', value: '25 Years', change: 'Scenario Modeling', description: 'Probabilistic modeling of civilizational inflection points.' },
      { label: 'Energy Mastery', value: 'Kardashev 0.76', change: '+0.02 Decadal', description: 'Percentage of total planetary solar flux harnessed for civilization.' },
      { label: 'Planetary Habitats', value: '3 Outposts', change: 'Lunar & Martian', description: 'Self-sustaining closed-loop ecological life support systems.' },
      { label: 'Synthetic Biology', value: '100% Programmable', change: 'Custom Genomes', description: 'Engineered cellular factories producing advanced biopolymers.' }
    ],
    features: [
      { title: 'Megascale Architecture', subtitle: 'Orbital Ring Systems', description: 'Engineering feasibility studies for space elevators and equatorial launch loops.', iconName: 'Sun', metric: '100k km cable' },
      { title: 'Post-Scarcity Economics', subtitle: 'Energy-Backed Value', description: 'Resource allocation models based on erg-hour expenditure rather than fiat debt.', iconName: 'Infinity', metric: 'Zero inflation' },
      { title: 'Consciousness Studies', subtitle: 'Interface Evolution', description: 'Non-invasive neural telemetry and high-bandwidth cognitive augmentation.', iconName: 'Eye', metric: 'Terabit/sec' }
    ],
    timeline: [
      { year: '2030', title: 'Commercial Lunar Base', description: 'Permanent human settlement established at Shackleton Crater.', tag: 'Expansion' },
      { year: '2040', title: 'Controlled Fusion Mastery', description: 'Commercial net-positive fusion power supplying global grids.', tag: 'Energy' },
      { year: '2050+', title: 'Interplanetary Civilization', description: 'Multi-planetary species operating sovereign habitats across the solar system.', tag: 'Horizon' }
    ],
    gallery: [
      { title: 'Lunar Habitation Outpost', category: 'Space Colonization', imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80', description: 'Shielded 3D-printed regolith habitats on the lunar south pole.' },
      { title: 'Orbital Solar Collector', category: 'Mega-Engineering', imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80', description: 'Solar power satellite beaming clean energy microwaves to terrestrial receivers.' }
    ]
  }
};
