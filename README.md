# Flabbergasted AI Skills

A curated collection of 200+ AI skills for Claude Code that extend capabilities across scientific research, software development, and creative work.

**[English](./README.md)** | **[中文版](./README_zh.md)** | **[日本語版](./README_ja.md)** | **[Agent Guide](./AGENTS.md)** | **[CLAUDE.md](./CLAUDE.md)**

---

## Table of Contents

- [Scientific Databases](#scientific-databases)
- [Bioinformatics & Genomics](#bioinformatics--genomics)
- [Drug Discovery & Chemistry](#drug-discovery--chemistry)
- [Machine Learning & Data Science](#machine-learning--data-science)
- [Scientific Computing](#scientific-computing)
- [Data Visualization](#data-visualization)
- [Clinical & Medical](#clinical--medical)
- [Scientific Writing & Publishing](#scientific-writing--publishing)
- [Lab Automation & Protocols](#lab-automation--protocols)
- [Frontend & Web Development](#frontend--web-development)
- [Design & Art](#design--art)
- [Agent & Workflow](#agent--workflow)
- [Context Engineering](#context-engineering)
- [Quantum Computing](#quantum-computing)
- [Document Processing](#document-processing)

---

## Scientific Databases

Direct REST/SOAP API access to scientific databases for querying and downloading research data.

| Skill | Description |
|-------|-------------|
| [alphafold-database](./public/alphafold-database/) | Access AlphaFold 200M+ AI-predicted protein structures |
| [biomni](./public/biomni/) | Autonomous biomedical AI agent for complex research tasks |
| [biorxiv-database](./public/biorxiv-database/) | Search life sciences preprints on bioRxiv |
| [brenda-database](./public/brenda-database/) | Access BRENDA enzyme database for kinetic parameters |
| [cellxgene-census](./public/cellxgene-census/) | Query CELLxGENE Census (61M+ cells) for single-cell data |
| [chembl-database](./public/chembl-database/) | Query ChEMBL for bioactive molecules and drug discovery data |
| [clinicaltrials-database](./public/clinicaltrials-database/) | Search ClinicalTrials.gov for clinical trial data |
| [clinpgx-database](./public/clinpgx-database/) | Access ClinPGx pharmacogenomics data and CPIC guidelines |
| [clinvar-database](./public/clinvar-database/) | Query ClinVar for variant clinical significance |
| [cosmic-database](./public/cosmic-database/) | Access COSMIC cancer mutation database |
| [datacommons-client](./public/datacommons-client/) | Query public statistical data from Data Commons |
| [drugbank-database](./public/drugbank-database/) | Access DrugBank for comprehensive drug information |
| [ena-database](./public/ena-database/) | Access European Nucleotide Archive for sequences and reads |
| [ensembl-database](./public/ensembl-database/) | Query Ensembl genome database for 250+ species |
| [fda-database](./public/fda-database/) | Query openFDA API for drugs, devices, and adverse events |
| [gene-database](./public/gene-database/) | Query NCBI Gene for gene information and annotations |
| [geo-database](./public/geo-database/) | Access NCBI GEO for gene expression datasets |
| [gwas-database](./public/gwas-database/) | Query GWAS Catalog for SNP-trait associations |
| [hmdb-database](./public/hmdb-database/) | Access Human Metabolome Database for metabolite data |
| [kegg-database](./public/kegg-database/) | Direct REST API access to KEGG pathways |
| [metabolomics-workbench-database](./public/metabolomics-workbench-database/) | Query NIH Metabolomics Workbench |
| [openalex-database](./public/openalex-database/) | Analyze scholarly literature via OpenAlex |
| [opentargets-database](./public/opentargets-database/) | Query Open Targets Platform for target-disease associations |
| [pdb-database](./public/pdb-database/) | Access RCSB PDB for 3D protein structures |
| [pubchem-database](./public/pubchem-database/) | Query PubChem for 110M+ compounds |
| [pubmed-database](./public/pubmed-database/) | Direct REST API access to PubMed |
| [reactome-database](./public/reactome-database/) | Query Reactome for pathway analysis |
| [string-database](./public/string-database/) | Query STRING for protein-protein interactions |
| [uniprot-database](./public/uniprot-database/) | Direct REST API access to UniProt |
| [uspto-database](./public/uspto-database/) | Access USPTO for patent and trademark searches |
| [zinc-database](./public/zinc-database/) | Access ZINC for purchasable compounds |

---

## Bioinformatics & Genomics

Tools for analyzing biological sequences, genomics data, and single-cell omics.

| Skill | Description |
|-------|-------------|
| [anndata](./public/anndata/) | Data structure for annotated matrices in single-cell analysis |
| [arboreto](./public/arboreto/) | Infer gene regulatory networks from expression data |
| [biopython](./public/biopython/) | Comprehensive molecular biology toolkit |
| [bioservices](./public/bioservices/) | Unified Python interface to 40+ bioinformatics services |
| [cellxgene-census](./public/cellxgene-census/) | Query CELLxGENE Census for expression data |
| [cobrapy](./public/cobrapy/) | Constraint-based metabolic modeling and FBA |
| [deeptools](./public/deeptools/) | NGS analysis toolkit for ChIP-seq, RNA-seq visualization |
| [dnanexus-integration](./public/dnanexus-integration/) | DNAnexus cloud genomics platform |
| [etetoolkit](./public/etetoolkit/) | Phylogenetic tree toolkit for phylogenomics |
| [flowio](./public/flowio/) | Parse FCS flow cytometry files |
| [gget](./public/gget/) | Fast CLI queries to 20+ bioinformatics databases |
| [geniml](./public/geniml/) | Genomic interval machine learning for BED files |
| [gtars](./public/gtars/) | High-performance genomic interval analysis in Rust |
| [lamindb](./public/lamindb/) | Open-source data framework for biology |
| [neuropixels-analysis](./public/neuropixels-analysis/) | Neuropixels neural recording analysis |
| [pysam](./public/pysam/) | Genomic file toolkit for SAM/BAM/VCF processing |
| [scanpy](./public/scanpy/) | Standard single-cell RNA-seq analysis pipeline |
| [scikit-bio](./public/scikit-bio/) | Biological data toolkit for sequence analysis |
| [scvi-tools](./public/scvi-tools/) | Deep generative models for single-cell omics |

---

## Drug Discovery & Chemistry

Molecular modeling, cheminformatics, and drug discovery workflows.

| Skill | Description |
|-------|-------------|
| [adaptyv](./public/adaptyv/) | Cloud laboratory platform for protein testing |
| [chembl-database](./public/chembl-database/) | Query ChEMBL for bioactive molecules |
| [datamol](./public/datamol/) | Pythonic wrapper around RDKit with simplified interface |
| [deepchem](./public/deepchem/) | Molecular ML with featurizers and MoleculeNet datasets |
| [diffdock](./public/diffdock/) | Diffusion-based molecular docking |
| [drugbank-database](./public/drugbank-database/) | Access DrugBank drug information |
| [esm](./public/esm/) | Protein language models for protein design |
| [matchms](./public/matchms/) | Spectral similarity for metabolomics |
| [medchem](./public/medchem/) | Medicinal chemistry filters (Lipinski, PAINS) |
| [molfeat](./public/molfeat/) | Molecular featurization with 100+ featurizers |
| [pymatgen](./public/pymatgen/) | Materials science toolkit for crystal structures |
| [pyopenms](./public/pyopenms/) | Complete mass spectrometry analysis platform |
| [pytdc](./public/pytdc/) | Therapeutics Data Commons for drug discovery datasets |
| [rdkit](./public/rdkit/) | Cheminformatics toolkit for molecular analysis |
| [torchdrug](./public/torchdrug/) | PyTorch-native GNNs for molecules and proteins |
| [zinc-database](./public/zinc-database/) | Access ZINC for purchasable compounds |

---

## Machine Learning & Data Science

ML frameworks, statistical modeling, and data science tools.

| Skill | Description |
|-------|-------------|
| [aeon](./public/aeon/) | Time series machine learning (classification, forecasting) |
| [dask](./public/dask/) | Distributed computing for larger-than-RAM workflows |
| [exploratory-data-analysis](./public/exploratory-data-analysis/) | Comprehensive EDA on200+ scientific file formats |
| [get-available-resources](./public/get-available-resources/) | Detect system resources for computational planning |
| [hypogenic](./public/hypogenic/) | Automated LLM-driven hypothesis generation and testing |
| [networkx](./public/networkx/) | Complex network and graph analysis |
| [polars](./public/polars/) | Fast in-memory DataFrame library |
| [pydeseq2](./public/pydeseq2/) | Differential gene expression analysis |
| [pymc](./public/pymc/) | Bayesian modeling with PyMC |
| [pymoo](./public/pymoo/) | Multi-objective optimization framework |
| [pytorch-lightning](./public/pytorch-lightning/) | Deep learning framework with multi-GPU support |
| [scikit-learn](./public/scikit-learn/) | Machine learning in Python |
| [scikit-survival](./public/scikit-survival/) | Survival analysis and time-to-event modeling |
| [shap](./public/shap/) | Model interpretability using SHAP values |
| [stable-baselines3](./public/stable-baselines3/) | Production-ready reinforcement learning |
| [statsmodels](./public/statsmodels/) | Statistical models library for inference |
| [torch_geometric](./public/torch_geometric/) | Graph Neural Networks with PyG |
| [transformers](./public/transformers/) | Pre-trained transformer models (NLP, CV, audio) |
| [umap-learn](./public/umap-learn/) | UMAP dimensionality reduction |
| [vaex](./public/vaex/) | Out-of-core DataFrame for billion-row datasets |
| [modal](./public/modal/) | Run Python in the cloud with serverless containers and GPUs |
| [polars](./public/polars/) | Fast in-memory DataFrame library |
| [pufferlib](./public/pufferlib/) | High-performance reinforcement learning framework |
| [pydeseq2](./public/pydeseq2/) | Differential gene expression analysis |
| [pymc](./public/pymc/) | Bayesian modeling with PyMC |
| [pymoo](./public/pymoo/) | Multi-objective optimization framework |
| [pytorch-lightning](./public/pytorch-lightning/) | Deep learning framework with multi-GPU support |
| [scikit-learn](./public/scikit-learn/) | Machine learning in Python |
| [scikit-survival](./public/scikit-survival/) | Survival analysis and time-to-event modeling |
| [shap](./public/shap/) | Model interpretability using SHAP values |
| [stable-baselines3](./public/stable-baselines3/) | Production-ready reinforcement learning |
| [statsmodels](./public/statsmodels/) | Statistical models library for inference |
| [torch_geometric](./public/torch_geometric/) | Graph Neural Networks with PyG |
| [transformers](./public/transformers/) | Pre-trained transformer models (NLP, CV, audio) |
| [umap-learn](./public/umap-learn/) | UMAP dimensionality reduction |
| [vaex](./public/vaex/) | Out-of-core DataFrame for billion-row datasets |
| [zarr-python](./public/zarr-python/) | Chunked N-D arrays for cloud storage |

---

## Scientific Computing

Mathematical, physical, and astronomical computation tools.

| Skill | Description |
|-------|-------------|
| [astropy](./public/astropy/) | Python library for astronomy and astrophysics |
| [fluidsim](./public/fluidsim/) | Computational fluid dynamics simulations |
| [geopandas](./public/geopandas/) | Geospatial vector data analysis and mapping |
| [matlab](./public/matlab/) | MATLAB and GNU Octave numerical computing |
| [neurokit2](./public/neurokit2/) | Biosignal processing for ECG, EEG, EDA signals |
| [pydicom](./public/pydicom/) | Python library for DICOM medical imaging files |
| [pymoo](./public/pymoo/) | Multi-objective optimization framework |
| [rowan](./public/rowan/) | Cloud-based quantum chemistry platform |
| [simpy](./public/simpy/) | Discrete-event simulation framework |
| [sympy](./public/sympy/) | Symbolic mathematics in Python |

---

## Data Visualization

Plotting libraries, scientific visualization, and chart creation.

| Skill | Description |
|-------|-------------|
| [matplotlib](./public/matplotlib/) | Low-level plotting library for full customization |
| [plotly](./public/plotly/) | Interactive visualization library |
| [scientific-schematics](./public/scientific-schematics/) | Create publication-quality scientific diagrams |
| [scientific-visualization](./public/scientific-visualization/) | Publication-ready figures with journal formatting |
| [seaborn](./public/seaborn/) | Statistical visualization with pandas integration |

---

## Clinical & Medical

Healthcare AI, clinical research, and medical documentation tools.

| Skill | Description |
|-------|-------------|
| [clinical-decision-support](./public/clinical-decision-support/) | Generate CDS documents with GRADE evidence grading |
| [clinical-reports](./public/clinical-reports/) | Write comprehensive clinical reports |
| [clinpgx-database](./public/clinpgx-database/) | Access ClinPGx for pharmacogenomics data |
| [clinvar-database](./public/clinvar-database/) | Query ClinVar for variant clinical significance |
| [histolab](./public/histolab/) | WSI tile extraction and preprocessing |
| [iso-13485-certification](./public/iso-13485-certification/) | ISO 13485 medical device QMS documentation |
| [omero-integration](./public/omero-integration/) | Microscopy data management platform |
| [pathml](./public/pathml/) | Computational pathology toolkit |
| [pyhealth](./public/pyhealth/) | Healthcare AI for EHR and clinical prediction |
| [treatment-plans](./public/treatment-plans/) | Generate concise medical treatment plans |

---

## Scientific Writing & Publishing

Literature review, manuscript writing, peer review, and publication tools.

| Skill | Description |
|-------|-------------|
| [citation-management](./public/citation-management/) | Comprehensive citation management and BibTeX |
| [clinical-reports](./public/clinical-reports/) | Write clinical reports with regulatory compliance |
| [doc-coauthoring](./public/doc-coauthoring/) | Structured workflow for co-authoring documentation |
| [latex-posters](./public/latex-posters/) | Create professional research posters in LaTeX |
| [literature-review](./public/literature-review/) | Conduct systematic literature reviews |
| [market-research-reports](./public/market-research-reports/) | Generate consulting-style market research reports |
| [paper-2-web](./public/paper-2-web/) | Convert academic papers to websites and videos |
| [peer-review](./public/peer-review/) | Structured manuscript/grant review |
| [research-grants](./public/research-grants/) | Write competitive research proposals |
| [research-lookup](./public/research-lookup/) | Look up current research with Perplexity |
| [scholar-evaluation](./public/scholar-evaluation/) | Evaluate scholarly work with ScholarEval framework |
| [scientific-brainstorming](./public/scientific-brainstorming/) | Creative research ideation |
| [scientific-critical-thinking](./public/scientific-critical-thinking/) | Evaluate scientific claims and evidence quality |
| [scientific-writing](./public/scientific-writing/) | Write scientific manuscripts in IMRAD structure |
| [statistical-analysis](./public/statistical-analysis/) | Guided statistical analysis with APA reporting |
| [treatment-plans](./public/treatment-plans/) | Generate medical treatment plans |
| [venue-templates](./public/venue-templates/) | LaTeX templates for major publication venues |

---

## Lab Automation & Protocols

Laboratory automation, protocol management, and experimental workflows.

| Skill | Description |
|-------|-------------|
| [benchling-integration](./public/benchling-integration/) | Benchling R&D platform integration |
| [dnanexus-integration](./public/dnanexus-integration/) | DNAnexus cloud genomics platform |
| [hypogenic](./public/hypogenic/) | Automated hypothesis testing on datasets |
| [labarchive-integration](./public/labarchive-integration/) | Electronic lab notebook API integration |
| [latchbio-integration](./public/latchbio-integration/) | Latch platform for bioinformatics workflows |
| [omero-integration](./public/omero-integration/) | Microscopy data management platform |
| [opentrons-integration](./public/opentrons-integration/) | Opentrons Protocol API for lab robots |
| [protocolsio-integration](./public/protocolsio-integration/) | Integration with protocols.io API |
| [pylabrobot](./public/pylabrobot/) | Vendor-agnostic lab automation framework |
| [treatment-plans](./public/treatment-plans/) | Generate medical treatment plans |

---

## Frontend & Web Development

UI/UX design, web development, and frontend optimization.

| Skill | Description |
|-------|-------------|
| [adapt](./public/adapt/) | Adapt designs for different screen sizes and platforms |
| [amap-jsapi-skill](./public/amap-jsapi-skill/) | AMap (高德地图) JSAPI v2.0 WebGL development |
| [animate](./public/animate/) | Enhance with animations and micro-interactions |
| [audit](./public/audit/) | Comprehensive interface quality audit |
| [clarify](./public/clarify/) | Improve unclear UX copy and error messages |
| [critique](./public/critique/) | Evaluate design effectiveness from UX perspective |
| [design-principles](./public/design-principles/) | Apply 10 proven design principles |
| [distill](./public/distill/) | Strip designs to their essence |
| [frontend-design](./public/frontend-design/) | Create production-grade frontend interfaces |
| [harden](./public/harden/) | Improve interface resilience and error handling |
| [json-canvas](./public/json-canvas/) | Create and edit JSON Canvas files |
| [mcp-builder](./public/mcp-builder/) | Create MCP servers for tool integrations |
| [obsidian-bases](./public/obsidian-bases/) | Create Obsidian Bases database views |
| [obsidian-markdown](./public/obsidian-markdown/) | Create Obsidian Flavored Markdown |
| [onboard](./public/onboard/) | Design onboarding flows and empty states |
| [optimize](./public/optimize/) | Improve interface performance |
| [polish](./public/polish/) | Final quality pass before shipping |
| [react-best-practices](./public/react-best-practices/) | React/Next.js performance optimization |
| [vercel-deploy-claimable](./public/vercel-deploy-claimable/) | Deploy applications to Vercel |
| [vercel-react-best-practices](./public/vercel-react-best-practices/) | Vercel React performance guidelines |
| [vercel-react-native-skills](./public/vercel-react-native-skills/) | React Native and Expo best practices |
| [web-artifacts-builder](./public/web-artifacts-builder/) | Create elaborate HTML artifacts |
| [web-design-guidelines](./public/web-design-guidelines/) | Review UI for Web Interface Guidelines |
| [webapp-testing](./public/webapp-testing/) | Test web applications with Playwright |

---

## Design & Art

Visual design, creative tools, and aesthetic enhancement.

| Skill | Description |
|-------|-------------|
| [algorithmic-art](./public/algorithmic-art/) | Create algorithmic art with p5.js |
| [bolder](./public/bolder/) | Amplify designs to make them more visually interesting |
| [brand-guidelines](./public/brand-guidelines/) | Apply Anthropic brand colors and typography |
| [canvas-design](./public/canvas-design/) | Create visual art in PNG and PDF |
| [colorize](./public/colorize/) | Add strategic color to monochromatic designs |
| [delight](./public/delight/) | Add moments of joy and personality |
| [extract](./public/extract/) | Extract design tokens into design system |
| [generate-image](./public/generate-image/) | Generate images with AI models |
| [normalize](./public/normalize/) | Normalize design to match design system |
| [quieter](./public/quieter/) | Tone down overly bold designs |
| [scientific-slides](./public/scientific-slides/) | Build slide decks for research talks |
| [slack-gif-creator](./public/slack-gif-creator/) | Create animated GIFs for Slack |
| [teach-impeccable](./public/teach-impeccable/) | One-time setup for design context |
| [theme-factory](./public/theme-factory/) | Style artifacts with pre-set themes |

---

## Agent & Workflow

Agent orchestration, workflow management, and development practices.

| Skill | Description |
|-------|-------------|
| [brainstorming](./public/brainstorming/) | Explore user intent before creative work |
| [code-simplifier](./public/code-simplifier/) | Simplify and refine code for clarity |
| [denario](./public/denario/) | Multiagent AI for scientific research |
| [dispatching-parallel-agents](./public/dispatching-parallel-agents/) | Handle 2+ independent tasks in parallel |
| [doc-coauthoring](./public/doc-coauthoring/) | Structured workflow for co-authoring docs |
| [executing-plans](./public/executing-plans/) | Execute implementation plans with checkpoints |
| [find-skills](./public/find-skills/) | Discover and install agent skills |
| [finishing-a-development-branch](./public/finishing-a-development-branch/) | Guide development branch completion |
| [git-commit](./public/git-commit/) | Execute git commit with intelligent staging |
| [git-release](./public/git-release/) | Create consistent releases and changelogs |
| [hypothesis-generation](./public/hypothesis-generation/) | Structured hypothesis formulation |
| [internal-comms](./public/internal-comms/) | Write internal communications |
| [markitdown](./public/markitdown/) | Convert documents to Markdown |
| [perplexity-search](./public/perplexity-search/) | AI-powered web searches |
| [receiving-code-review](./public/receiving-code-review/) | Handle code review feedback |
| [requesting-code-review](./public/requesting-code-review/) | Request code review before merging |
| [serenity-skill](./public/serenity-skill/) | Serenity-style investment research and thesis testing |
| [skill-creator](./public/skill-creator/) | Create effective skills |
| [subagent-driven-development](./public/subagent-driven-development/) | Execute plans with independent tasks |
| [systematic-debugging](./public/systematic-debugging/) | Debug bugs before proposing fixes |
| [test-driven-development](./public/test-driven-development/) | Implement features with TDD |
| [using-git-worktrees](./public/using-git-worktrees/) | Create isolated git worktrees |
| [using-superpowers](./public/using-superpowers/) | Find and use skills |
| [verification-before-completion](./public/verification-before-completion/) | Verify work before claiming completion |
| [writing-plans](./public/writing-plans/) | Write plans for multi-step tasks |
| [writing-skills](./public/writing-skills/) | Create and edit skills |

---

## Context Engineering

AI context optimization, memory management, and agent architecture.

| Skill | Description |
|-------|-------------|
| [context-compression](./public/context-compression/) | Compress context and reduce token usage |
| [context-degradation](./public/context-degradation/) | Diagnose context problems and failures |
| [context-fundamentals](./public/context-fundamentals/) | Understand context windows and architecture |
| [context-optimization](./public/context-optimization/) | Optimize context and reduce costs |

---

## Quantum Computing

Quantum computing frameworks and quantum machine learning.

| Skill | Description |
|-------|-------------|
| [cirq](./public/cirq/) | Google quantum computing framework |
| [pennylane](./public/pennylane/) | Hardware-agnostic quantum ML framework |
| [qiskit](./public/qiskit/) | IBM quantum computing framework |
| [qutip](./public/qutip/) | Quantum physics simulation library |

---

## Document Processing

File format handling, document creation, and data extraction.

| Skill | Description |
|-------|-------------|
| [docx](./public/docx/) | Create and edit Word documents |
| [markitdown](./public/markitdown/) | Convert files to Markdown |
| [pdf](./public/pdf/) | Comprehensive PDF manipulation |
| [pptx](./public/pptx/) | Create and edit PowerPoint presentations |
| [pptx-posters](./public/pptx-posters/) | Create research posters in PPTX |
| [xlsx](./public/xlsx/) | Create and edit Excel spreadsheets |

---

## Skills CLI

A command-line tool for searching, installing, and managing skills. Supports installing to multiple agent tool directories at once.

### Quick Start

Install from npm (recommended):

```bash
# Run directly with npx (no install needed)
npx @flabbergasted-ai/skills search "protein"
npx @flabbergasted-ai/skills install alphafold-database

# Or install globally
npm install -g @flabbergasted-ai/skills
skills search "protein"
skills install alphafold-database --target claude
```

Or run from the repo:

```bash
# From repo root
cd cli && npm install && cd ..

npx tsx cli/src/index.ts search "protein"
npx tsx cli/src/index.ts install alphafold-database
npx tsx cli/src/index.ts install scanpy --target claude --project
```

### All Commands

| Command | Description |
|---------|-------------|
| `search [query]` | Search skills by keyword, `--category`, or `--tag` |
| `list` | List all available skills (`--installed` for installed only) |
| `info <name>` | Show detailed skill information |
| `install <names...>` | Install skills (`--target`, `--path`, `--project`) |
| `uninstall <names...>` | Uninstall skills |
| `update [names...]` | Update installed skills |
| `outdated` | Check for available updates |
| `init <name>` | Create a new skill from template |
| `validate <path>` | Validate skill directory structure |
| `package <path>` | Package skill into `.skill` file |
| `config show` | Show current configuration |
| `config set <key> <value>` | Set config value |
| `config add-target <id> <path>` | Add custom install target |
| `targets` | List all install targets and detection status |

### Install Targets

The CLI auto-detects installed agent tools and installs skills to all of them:

| Target | Path | Tool |
|--------|------|------|
| `claude` | `~/.claude/skills/` | Claude Code |
| `cursor` | `~/.cursor/skills/` | Cursor |
| `agents` | `~/.agents/skills/` | General Agent |
| `codex` | `~/.codex/skills/` | OpenAI Codex CLI |
| `aider` | `~/.aider/skills/` | Aider |
| `continue` | `~/.continue/skills/` | Continue.dev |

Custom targets can be added via `config add-target <id> <path>`.

---

## Contributing

See [CLAUDE.md](./CLAUDE.md) for guidance on creating and modifying skills.

### Updating Skills (CLI Release Not Needed)

Skills and the CLI are decoupled — the CLI fetches the skill index from GitHub CDN. Adding or updating skills does **not** require a CLI release.

**Workflow:**

```bash
# 1. Modify or add skills in public/
# 2. Rebuild the skill index
cd cli && npm run build-index

# 3. Commit and push — CDN updates automatically
git add public/ index.json
git commit -m "feat: add new-skill"
git push
```

Users will pick up the new skill on their next CLI invocation.

**Only release a new CLI version when:**
- Adding CLI features or fixing CLI bugs
- Changing the `build-index.ts` index generation logic

---

## License

See individual skill directories for license information.