# AGENTS.md

Comprehensive guide for AI agents on discovering, invoking, and creating skills from this collection. Compatible with Claude Code, Cursor, Zed ACP, GitHub Copilot, and other AI coding tools.

> **Note**: For Claude-specific guidance, see [CLAUDE.md](./CLAUDE.md).

---

## Table of Contents

- [Project Vision](#project-vision)
- [Repository Structure](#repository-structure)
- [Skill Categories](#skill-categories)
- [Skill Discovery](#skill-discovery)
- [Skill Invocation](#skill-invocation)
- [Skill Writing Guide](#skill-writing-guide)
- [Progressive Disclosure](#progressive-disclosure)
- [Universal Rules](#universal-rules)
- [Common Workflows](#common-workflows)
- [Quality Standards](#quality-standards)
- [Tool Reference](#tool-reference)

---

## Project Vision

This is a library of 200+ AI "skills" for coding agents - modular packages that extend agent capabilities with:

- **Scientific Databases**: Direct API access to 30+ databases (PubMed, UniProt, AlphaFold, ClinVar, etc.)
- **Bioinformatics**: Sequence analysis, single-cell omics, molecular biology
- **Drug Discovery**: Molecular modeling, cheminformatics, ADMET prediction
- **Machine Learning**: PyTorch, scikit-learn, transformers, statistical analysis
- **Scientific Computing**: Mathematics, physics, astronomy, fluid dynamics
- **Clinical & Medical**: Healthcare AI, clinical reports, medical imaging
- **Scientific Writing**: Literature review, peer review, publication tools
- **Lab Automation**: Protocol management, lab robotics, ELN integration
- **Web Development**: React, frontend design, testing, deployment
- **Design & Art**: Visual design, generative art, brand guidelines
- **Agent Workflows**: Git, code review, testing, multi-agent orchestration
- **Context Engineering**: AI context optimization, memory management
- **Quantum Computing**: Qiskit, Cirq, PennyLane, QuTiP
- **Document Processing**: PDF, DOCX, PPTX, XLSX manipulation

**Goal**: Provide agents with specialized knowledge and tools for scientific research, software development, and creative work across diverse domains.

---

## Repository Structure

```
skills/
├── CLAUDE.md            # Claude-specific guidance (concise)
├── AGENTS.md            # This file (comprehensive, cross-tool)
├── README.md            # Full skill catalog (EN)
├── README_zh.md        # Full skill catalog (中文)
├── public/
│   ├── skill-creator/ # Framework for creating skills
│   ├── document-skills/ # PDF, DOCX, PPTX, XLSX
│   ├── mcp-builder/     # MCP server creation
│   └── [skill-name]/   # 200+ skill packages
│       ├── SKILL.md     # Skill definition
│       ├── scripts/     # Executable code
│       ├── references/  # Detailed documentation
│       └── assets/     # Templates, fonts, etc.
└── .claude/            # Claude-specific settings
```

---

## Skill Categories

### 1. Scientific Databases (31)
Direct REST/SOAP API access to scientific databases.

| Skill | Description |
|-------|-------------|
| alphafold-database | AlphaFold 200M+ protein structures |
| pubmed-database | PubMed direct REST API |
| uniprot-database | UniProt direct REST API |
| chembl-database | ChEMBL bioactive molecules |
| clinvar-database | ClinVar variant significance |
| drugbank-database | DrugBank comprehensive drug info |
| gwas-database | GWAS Catalog SNP-trait associations |
| kegg-database | KEGG pathways direct API |
| string-database | STRING protein interactions |
| zinc-database | ZINC purchasable compounds |
| *...and21 more* | |

### 2. Bioinformatics & Genomics (19)
Biological sequence and omics analysis.

| Skill | Description |
|-------|-------------|
| biopython | Molecular biology toolkit |
| scanpy | Single-cell RNA-seq pipeline |
| scvi-tools | Deep single-cell omics models |
| arboreto | Gene regulatory networks |
| cobrapy | Metabolic modeling (FBA) |
| lamindb | Biology data framework |
| pysam | SAM/BAM/VCF processing |
| scikit-bio | Phylogenetic analysis |
| *...and 11 more* | |

### 3. Drug Discovery & Chemistry (16)
Molecular modeling and cheminformatics.

| Skill | Description |
|-------|-------------|
| rdkit | Cheminformatics toolkit |
| datamol | RDKit Python wrapper |
| deepchem | Molecular ML |
| diffdock | Diffusion-based docking |
| esm | Protein language models |
| molfeat | Molecular featurization |
| torchdrug | PyTorch GNNs for molecules |
| pytdc | Therapeutics Data Commons |
| *...and 8 more* | |

### 4. Machine Learning & Data Science (21)
ML frameworks and statistical tools.

| Skill | Description |
|-------|-------------|
| scikit-learn | ML in Python |
| pytorch-lightning | Multi-GPU deep learning |
| transformers | Pre-trained transformers |
| shap | Model interpretability |
| statsmodels | Statistical inference |
| dask | Distributed computing |
| polars | Fast DataFrame library |
| vaex | Billion-row datasets |
| *...and 13 more* | |

### 5. Scientific Computing (9)
Math, physics, astronomy computation.

| Skill | Description |
|-------|-------------|
| sympy | Symbolic mathematics |
| astropy | Astronomy toolkit |
| matlab | MATLAB/Octave computing |
| simpy | Discrete-event simulation |
| fluidsim | Computational fluid dynamics |
| neurokit2 | Biosignal processing |
| pydicom | Medical imaging (DICOM) |
| *...and 3 more* | |

### 6. Clinical & Medical (10)
Healthcare AI and clinical research.

| Skill | Description |
|-------|-------------|
| clinical-reports | Clinical report writing |
| clinical-decision-support | CDS document generation |
| pyhealth | Healthcare ML |
| treatment-plans | Medical treatment plans |
| iso-13485-certification | Medical device QMS |
| pathml | Computational pathology |
| histolab | WSI tile extraction |
| *...and 4 more* | |

### 7. Scientific Writing & Publishing (17)
Literature review, peer review, publication.

| Skill | Description |
|-------|-------------|
| literature-review | Systematic literature review |
| scientific-writing | IMRAD manuscript writing |
| peer-review | Structured manuscript review |
| citation-management | BibTeX management |
| research-grants | NSF/NIH/DOE proposals |
| market-research-reports | Consulting-style reports |
| latex-posters | LaTeX research posters |
| venue-templates | Journal formatting |
| *...and 9 more* | |

### 8. Frontend & Web Development (22)
UI/UX, React, web testing.

| Skill | Description |
|-------|-------------|
| frontend-design | Production-grade interfaces |
| react-best-practices | React/Next.js optimization |
| webapp-testing | Playwright testing |
| audit | Interface quality audit |
| design-principles | 10 design principles |
| polish | Final quality pass |
| mcp-builder | MCP server creation |
| vercel-deploy-claimable | Vercel deployment |
| *...and 14 more* | |

### 9. Design & Art (14)
Visual design and creative tools.

| Skill | Description |
|-------|-------------|
| algorithmic-art | p5.js generative art |
| canvas-design | PNG/PDF visual art |
| brand-guidelines | Anthropic brand styling |
| generate-image | AI image generation |
| theme-factory | Pre-set themes |
| scientific-slides | Research presentations |
| slack-gif-creator | Slack-optimized GIFs |
| *...and 7 more* | |

### 10. Agent & Workflow (25)
Agent orchestration and development.

| Skill | Description |
|-------|-------------|
| skill-creator | Create new skills |
| find-skills | Discover skills |
| writing-skills | Edit/verify skills |
| git-commit | Intelligent git commits |
| code-simplifier | Code refinement |
| brainstorming | Creative exploration |
| systematic-debugging | Bug diagnosis |
| test-driven-development | TDD workflow |
| receiving-code-review | Code review handling |
| requesting-code-review | Code review requests |
| *...and 15 more* | |

### 11-15. Other Categories
- **Context Engineering** (4): context-compression, context-degradation, context-fundamentals, context-optimization
- **Quantum Computing** (4): cirq, pennylane, qiskit, qutip
- **Document Processing** (6): docx, pdf, pptx, pptx-posters, xlsx, markitdown
- **Data Visualization** (5): matplotlib, plotly, seaborn, scientific-visualization, scientific-schematics
- **Lab Automation** (10): benchling-integration, dnanexus-integration, labarchive-integration, latchbio-integration, omero-integration, opentrons-integration, protocolsio-integration, pylabrobot, and more

---

## Skill Discovery

### How Skills Are Triggered

Skills are activated by the `name` and `description` in each skill's SKILL.md YAML frontmatter:

```yaml
---
name: pubmed-database
description: |
  Direct REST API access to PubMed. Use when searching for papers,
  querying MeSH terms, batch processing citations, or accessing E-utilities.
  For quick lookups use gget; for multi-database workflows use bioservices.
user-invokable: true
---
```

**Trigger mechanism**: The description text is the primary trigger. Include all relevant "when to use" contexts naturally.

### Finding Skills

**Method 1**: Check the catalog
- [README.md](./README.md) - Full English catalog
- [README_zh.md](./README_zh.md) - Full Chinese catalog

**Method 2**: Use the find-skills skill
```
Use /find-skills query="protein structure prediction"
```

**Method 3**: Grep for keywords
```bash
# Search for skills related to protein analysis
grep -l "protein" public/*/SKILL.md

# Search for visualization-related skills
grep -l "visualization\|plotting\|chart" public/*/SKILL.md

# Search for machine learning skills
grep -l "machine learning\|ML\|sklearn" public/*/SKILL.md
```

### Naming Conventions

| Type | Pattern | Examples |
|------|---------|----------|
| Database | `{name}-database` | `pubmed-database`, `uniprot-database` |
| ML/Analysis | Library/tool name | `scanpy`, `torch_geometric`, `scikit-learn` |
| Task-based | Verb-object | `literature-review`, `peer-review`, `git-commit` |
| Design | Adjective/quality | `polish`, `normalize`, `harden`, `audit` |
| Workflow | Verb-object | `brainstorming`, `systematic-debugging` |

---

## Skill Invocation

### Using the Skill Tool

Invoke skills using the Skill tool:
```
/<skill-name> [optional args]
```

Examples:
```
/pubmed-database query="CRISPR gene editing efficiency"
/audit area="login-flow"
/literature-review topic="mRNA vaccine stability"
```

### Passing Arguments

Skills with frontmatter `args` accept structured arguments:

```yaml
---
name: audit
description: Perform comprehensive audit of interface quality...
user-invokable: true
args:
  - name: area
    description: The feature or area to audit (optional)
    required: false
  - name: focus
    description: Specific focus area (accessibility, performance, etc.)
    required: false
---
```

When the user specifies arguments, pass them:
```
/audit area="checkout-flow" focus="accessibility"
```

### Skill Chaining

Skills can be chained for complex workflows. Each skill's output can inform the next:

```
# Scientific Research
/literature-review topic="COVID-19 antibodies"
  → /scientific-writing draft="literature synthesis"
    → /statistical-analysis data=" antibody titers"
      → /scientific-visualization figures="bar plot, volcano"
        → /peer-review manuscript="draft"
          → /venue-templates template="Nature"

# Drug Discovery
/pubchem-database search="kinase inhibitors"
  → /chembl-database activity="IC50 data"
    → /deepchem predict="ADMET properties"
      → /diffdock dock="protein-ligand binding"
        → /pymatgen analyze="binding energy"
          → /zinc-database analogs="similar compounds"

# Clinical Research
/clinicaltrials-database condition="breast cancer"
  → /pubmed-database literature="immunotherapy"
    → /clinical-decision-support generate="treatment guidelines"
      → /clinical-reports write="case report"
        → /pyhealth predict="readmission risk"
          → /treatment-plans generate="care plan"

# Web Development
/brainstorming feature="user dashboard"
  → /frontend-design design="dashboard layout"
    → /react-best-practices implement="React components"
      → /webapp-testing test="user interactions"
        → /audit review="accessibility"
          → /polish refine="UI details"
            → /vercel-deploy-claimable deploy="production"

# Data Science
/get-available-resources check="GPU memory"
  → /exploratory-data-analysis analyze="dataset.csv"
    → /scikit-learn build="prediction model"
      → /shap explain="model predictions"
        → /scientific-visualization create="feature importance plot"
          → /scientific-writing document="findings"
```

---

## Skill Writing Guide

### Frontmatter Essentials

Every skill needs complete frontmatter:

```yaml
---
name: skill-name # REQUIRED: Unique, lowercase, hyphenated
description: |                # REQUIRED: Primary trigger - be specific
  One or more paragraphs explaining when to use this skill.
  Include all relevant "when to use" contexts.
  Mention related skills for differentiation and referral.
  Be specific about use cases and trigger keywords.
license: MIT                  # License for code/scripts (optional)
user-invokable: true # Set true if slash command is useful
args: # Optional: Define parameters
  - name: param_name
    description: What this parameter does
    required: false
metadata: # Optional: Author, version, etc.
  skill-author: Your Name
---
```

### Description Guidelines

**✅ DO:**
- Include trigger keywords naturally ("use when...", "applicable for...", "triggers on...")
- Mention related skills for referral
- Be specific about use cases and scope
- Keep it concise but complete (2-4 sentences typically)
- Mention when to use this vs. similar skills

**❌ DON'T:**
- Be vague ("handles data processing")
- Overlap unnecessarily with other skills
- Include implementation details (save for SKILL.md body)
- Use jargon without explanation

**Good examples:**

```yaml
# Database skill
description: |
  Direct REST API access to PubMed. Advanced Boolean/MeSH queries,
  E-utilities API, batch processing, citation management. For Python
  workflows, prefer biopython (Bio.Entrez). Use this for direct
  HTTP/REST work or custom API implementations.

# ML skill
description: |
  Machine learning in Python with scikit-learn. Use when working
  with supervised learning (classification, regression), unsupervised
  learning (clustering, dimensionality reduction), model evaluation,
  hyperparameter tuning, preprocessing, or building ML pipelines.

# Design skill
description: |
  Final quality pass before shipping. Fixes alignment, spacing,
  consistency, and detail issues that separate good from great.
  Use before deployment or handoff.
```

### Directory Structure

```
public/<skill-name>/
├── SKILL.md              # REQUIRED: frontmatter + essential docs
├── scripts/              # Optional: executable code
│   ├── main.py
│   └── utils.py
├── references/          # Optional: detailed documentation
│   ├── api-guide.md
│   └── examples.md
└── assets/              # Optional: templates, fonts, etc.
    └── template.xlsx
```

### Testing Skills

Always test scripts before committing:

```bash
# Run skill scripts with sample input
python public/<skill-name>/scripts/main.py --input sample.csv

# Validate skill structure
python public/skill-creator/scripts/quick_validate.py public/<skill-name>

# Package and test distribution
python public/skill-creator/scripts/package_skill.py public/<skill-name>
```

---

## Progressive Disclosure

Skills follow progressive disclosure to manage context efficiently.

### SKILL.md (Essential - Keep Concise)

- What the skill does (1-2 sentences)
- When to use it (trigger contexts)
- Key parameters/options
- Basic usage examples
- Related skills (for referral)

### references/ (Detailed - Load on Demand)

- Full API documentation
- Extended examples
- Troubleshooting guide
- Implementation notes
- Performance considerations

### scripts/ (Executable - Deterministic)

- Working code implementations
- Deterministic operations
- Tool wrappers

---

## Universal Rules

### For All Agents

1. **Skill-first approach**: Always check if a skill exists before implementing from scratch
2. **Progressive disclosure**: Essential info in SKILL.md, details in `references/`
3. **Description as trigger**: Include all "when to use" contexts naturally
4. **Test before commit**: Run scripts, verify functionality
5. **No duplicates**: Check for existing skills covering the same purpose
6. **Cross-reference**: Mention related skills in descriptions

### Skill Quality Standards

- [ ] SKILL.md has complete frontmatter (name, description)
- [ ] Description includes all trigger contexts
- [ ] Related skills are mentioned
- [ ] Directory structure follows conventions
- [ ] Scripts are tested and work
- [ ] No duplicate skills exist
- [ ] Skill fits into an existing category or justifies a new one

---

## Common Workflows

### Scientific Research

```
literature-review        → scientific-writing → peer-review
                         → statistical-analysis    → scientific-visualization
                         → venue-templates
```

### Drug Discovery

```
pubchem-database        → chembl-database         → deepchem
                       → diffdock                → pymatgen
                       → zinc-database
```

### Clinical Research

```
clinicaltrials-database → pubmed-database         → clinical-decision-support
                       → clinical-reports       → pyhealth
                       → treatment-plans
```

### Web Development

```
brainstorming           → frontend-design        → react-best-practices
                       → webapp-testing → audit
                       → polish                 → vercel-deploy-claimable
```

### Data Science

```
get-available-resources → exploratory-data-analysis → scikit-learn
                       → shap → scientific-visualization
                       → scientific-writing
```

### Agent Development

```
skill-creator           → write skills           → test skills
                       → find-skills           → validate skills
                       → writing-skills        → package skills
```

---

## Quality Standards

### Before Committing a New Skill

- [ ] SKILL.md has complete frontmatter (name, description, user-invokable)
- [ ] Description includes all trigger contexts naturally
- [ ] Related skills are mentioned for referral
- [ ] Directory structure follows conventions
- [ ] Scripts are tested and work correctly
- [ ] No duplicate skills exist for the same purpose
- [ ] Skill fits into an existing or new category
- [ ] Frontmatter is valid YAML

### SKILL.md Quality Checklist

- [ ] Name is unique, lowercase, hyphenated
- [ ] Description is 2-4 sentences, specific and complete
- [ ] Trigger keywords are included naturally
- [ ] Related skills are mentioned
- [ ] Body content is concise (< 500 lines)
- [ ] Examples are provided where helpful

---

## Tool Reference

### Skill Management

```bash
# Initialize new skill from template
python public/skill-creator/scripts/init_skill.py <skill-name> --path public/

# Validate skill structure
python public/skill-creator/scripts/quick_validate.py public/<skill-name>

# Package skill for distribution
python public/skill-creator/scripts/package_skill.py public/<skill-name>

# List all skills
ls public/*/SKILL.md | wc -l
```

### Skill Discovery

```bash
# Search by keyword
grep -l "keyword" public/*/SKILL.md

# Search by category
ls public/*-database/SKILL.md      # All database skills
ls public/*/SKILL.md | grep -E "^public/(scanpy|scikit|torch)"  # ML skills

# Count skills by category
for cat in database bioinformatics ml clinical writing design agent; do
  echo "$cat: $(ls public/*$cat*/SKILL.md 2>/dev/null | wc -l)"
done
```

### Cross-Reference

- [CLAUDE.md](./CLAUDE.md) - Claude-specific guidance
- [README.md](./README.md) - Full skill catalog
- [README_zh.md](./README_zh.md) - 中文版技能目录
- public/skill-creator/ - Skill creation framework
- public/*/SKILL.md - Individual skill definitions

---

**Last updated**: 2026-06-06
**Total skills**: 200+
**Categories**: 15