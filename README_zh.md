# Flabbergasted AI Skills

为 Claude Code 打造的 200+ 专业 AI 技能库，涵盖科学研究、软件开发创意工作等领域。

**[English Version](./README.md)** | **[Agent Guide](./AGENTS.md)** | **[CLAUDE.md](./CLAUDE.md)**

---

## 目录

- [科学数据库](#科学数据库)
- [生物信息学与基因组学](#生物信息学与基因组学)
- [药物发现与化学](#药物发现与化学)
- [机器学习与数据科学](#机器学习与数据科学)
- [科学计算](#科学计算)
- [数据可视化](#数据可视化)
- [临床与医学](#临床与医学)
- [科技论文写作与出版](#科技论文写作与出版)
- [实验室自动化与实验方案](#实验室自动化与实验方案)
- [前端与网页开发](#前端与网页开发)
- [设计与艺术](#设计与艺术)
- [智能体与工作流](#智能体与工作流)
- [上下文工程](#上下文工程)
- [量子计算](#量子计算)
- [文档处理](#文档处理)

---

## 科学数据库

通过 REST/SOAP API 直接访问科学数据库，查询和下载研究数据。

| 技能 | 描述 |
|------|------|
| [alphafold-database](./public/alphafold-database/) | 访问 AlphaFold 2亿+ AI 预测蛋白质结构 |
| [biomni](./public/biomni/) | 自主生物医学 AI 智能体，执行复杂研究任务 |
| [biorxiv-database](./public/biorxiv-database/) | 搜索 bioRxiv 生命科学预印本 |
| [brenda-database](./public/brenda-database/) | 访问 BRENDA 酶数据库获取动力学参数 |
| [cellxgene-census](./public/cellxgene-census/) | 查询 CELLxGENE Census (6100万+ 细胞) |
| [chembl-database](./public/chembl-database/) | 查询 ChEMBL 生物活性分子数据 |
| [clinicaltrials-database](./public/clinicaltrials-database/) | 搜索 ClinicalTrials.gov 临床试验数据 |
| [clinpgx-database](./public/clinpgx-database/) | 访问 ClinPGx 药物基因组学数据和 CPIC 指南 |
| [clinvar-database](./public/clinvar-database/) | 查询 ClinVar 变异临床意义 |
| [cosmic-database](./public/cosmic-database/) | 访问 COSMIC 癌症突变数据库 |
| [datacommons-client](./public/datacommons-client/) | 查询 Data Commons 公共统计数据 |
| [drugbank-database](./public/drugbank-database/) | 访问 DrugBank 综合药物信息 |
| [ena-database](./public/ena-database/) | 访问欧洲核苷酸档案库获取序列和原始数据 |
| [ensembl-database](./public/ensembl-database/) | 查询 Ensembl 基因组数据库 (250+ 物种) |
| [fda-database](./public/fda-database/) | 查询 openFDA API 药品/器械/不良事件 |
| [gene-database](./public/gene-database/) | 查询 NCBI Gene 基因信息和注释 |
| [geo-database](./public/geo-database/) | 访问 NCBI GEO 基因表达数据集 |
| [gwas-database](./public/gwas-database/) | 查询 GWAS Catalog SNP-性状关联 |
| [hmdb-database](./public/hmdb-database/) | 访问人类代谢组数据库 |
| [kegg-database](./public/kegg-database/) | KEGG 通路直接 REST API 访问 |
| [metabolomics-workbench-database](./public/metabolomics-workbench-database/) | 查询 NIH代谢组学工作台 |
| [openalex-database](./public/openalex-database/) | 通过 OpenAlex 分析学术文献 |
| [opentargets-database](./public/opentargets-database/) | 查询 Open Targets 靶点-疾病关联 |
| [pdb-database](./public/pdb-database/) | 访问 RCSB PDB 蛋白质3D 结构 |
| [pubchem-database](./public/pubchem-database/) | 查询 PubChem 1.1亿+ 化合物 |
| [pubmed-database](./public/pubmed-database/) | PubMed 直接 REST API 访问 |
| [reactome-database](./public/reactome-database/) | 查询 Reactome 通路分析 |
| [string-database](./public/string-database/) | 查询 STRING 蛋白质相互作用 |
| [uniprot-database](./public/uniprot-database/) | UniProt 直接 REST API 访问 |
| [uspto-database](./public/uspto-database/) | 访问 USPTO 专利商标检索 |
| [zinc-database](./public/zinc-database/) | 访问 ZINC 可购买化合物 |

---

## 生物信息学与基因组学

用于分析生物序列、基因组数据和单细胞组学。

| 技能 | 描述 |
|------|------|
| [anndata](./public/anndata/) | 单细胞分析的注释矩阵数据结构 |
| [arboreto](./public/arboreto/) | 从表达数据推断基因调控网络 |
| [biopython](./public/biopython/) | 综合分子生物学工具包 |
| [bioservices](./public/bioservices/) | 统一 Python 接口连接 40+ 生物信息服务 |
| [cellxgene-census](./public/cellxgene-census/) | 查询 CELLxGENE Census表达数据 |
| [cobrapy](./public/cobrapy/) | 基于约束的代谢建模和通量平衡分析 |
| [deeptools](./public/deeptools/) | NGS 分析工具包，用于 ChIP-seq、RNA-seq 可视化 |
| [dnanexus-integration](./public/dnanexus-integration/) | DNAnexus 云基因组学平台 |
| [etetoolkit](./public/etetoolkit/) | 系统发育树工具包用于系统发育基因组学 |
| [flowio](./public/flowio/) | 解析 FCS 流式细胞术文件 |
| [gget](./public/gget/) | 快速 CLI 查询 20+ 生物信息数据库 |
| [geniml](./public/geniml/) | BED 文件基因组区间机器学习 |
| [gtars](./public/gtars/) | Rust 高性能基因组区间分析 |
| [lamindb](./public/lamindb/) | 生物学开源数据框架 |
| [neuropixels-analysis](./public/neuropixels-analysis/) | Neuropixels 神经记录分析 |
| [pysam](./public/pysam/) | SAM/BAM/VCF 处理基因组文件工具包 |
| [scanpy](./public/scanpy/) | 标准单细胞 RNA-seq 分析流程 |
| [scikit-bio](./public/scikit-bio/) | 序列分析生物学数据工具包 |
| [scvi-tools](./public/scvi-tools/) | 单细胞组学深度生成模型 |

---

## 药物发现与化学

分子建模、药物化学和药物发现工作流。

| 技能 | 描述 |
|------|------|
| [adaptyv](./public/adaptyv/) | 蛋白质测试云端实验室平台 |
| [chembl-database](./public/chembl-database/) | 查询 ChEMBL 生物活性分子 |
| [datamol](./public/datamol/) | 简化界面的 RDKit Python 封装 |
| [deepchem](./public/deepchem/) | 分子机器学习与 MoleculeNet 数据集 |
| [diffdock](./public/diffdock/) | 基于扩散的分子对接 |
| [drugbank-database](./public/drugbank-database/) | 访问 DrugBank 药物信息 |
| [esm](./public/esm/) | 蛋白质语言模型用于蛋白质设计 |
| [matchms](./public/matchms/) | 代谢组学光谱相似度比较 |
| [medchem](./public/medchem/) | 药物化学过滤器 (Lipinski, PAINS) |
| [molfeat](./public/molfeat/) | 100+ 种分子特征化方法 |
| [pymatgen](./public/pymatgen/) | 计算材料学工具包 |
| [pyopenms](./public/pyopenms/) |完整质谱分析平台 |
| [pytdc](./public/pytdc/) | 药物发现 AI 就绪数据集 |
| [rdkit](./public/rdkit/) |分子化学信息学工具包 |
| [torchdrug](./public/torchdrug/) | PyTorch 原生 GNN 用于分子和蛋白质 |
| [zinc-database](./public/zinc-database/) | 访问 ZINC 可购买化合物 |

---

## 机器学习与数据科学

机器学习框架、统计建模和数据科学工具。

| 技能 | 描述 |
|------|------|
| [aeon](./public/aeon/) | 时间序列机器学习 (分类、预测) |
| [dask](./public/dask/) | 分布式计算处理超内存工作流 |
| [exploratory-data-analysis](./public/exploratory-data-analysis/) | 200+ 科学文件格式探索性数据分析 |
| [get-available-resources](./public/get-available-resources/) | 检测系统资源用于计算规划 |
| [hypogenic](./public/hypogenic/) | 自动 LLM 驱动假设生成和检验 |
| [modal](./public/modal/) | 使用无服务器容器和 GPU 在云端运行 Python |
| [networkx](./public/networkx/) | 复杂网络和图分析 |
| [polars](./public/polars/) | 快速内存 DataFrame 库 |
| [pufferlib](./public/pufferlib/) | 高性能强化学习框架 |
| [pydeseq2](./public/pydeseq2/) | 差异基因表达分析 |
| [pymc](./public/pymc/) | PyMC 贝叶斯建模 |
| [pymoo](./public/pymoo/) | 多目标优化框架 |
| [pytorch-lightning](./public/pytorch-lightning/) | 支持多 GPU 的深度学习框架 |
| [scikit-learn](./public/scikit-learn/) | Python 机器学习库 |
| [scikit-survival](./public/scikit-survival/) | 生存分析和事件时间建模 |
| [shap](./public/shap/) | 使用 SHAP 值进行模型可解释性分析 |
| [stable-baselines3](./public/stable-baselines3/) | 生产级强化学习算法 |
| [statsmodels](./public/statsmodels/) | 统计模型库用于推断 |
| [torch_geometric](./public/torch_geometric/) | PyG 图神经网络 |
| [transformers](./public/transformers/) | 预训练变换器模型 (NLP、CV、音频) |
| [umap-learn](./public/umap-learn/) | UMAP 降维 |
| [vaex](./public/vaex/) | 核心外 DataFrame 处理十亿行数据集 |
| [zarr-python](./public/zarr-python/) | 云存储分块 N-D 数组 |

---

## 科学计算

数学、物理和天文计算工具。

| 技能 | 描述 |
|------|------|
| [astropy](./public/astropy/) | Python 天文学和天体物理学库 |
| [fluidsim](./public/fluidsim/) | 计算流体力学模拟 |
| [geopandas](./public/geopandas/) | 地理空间矢量数据分析和地图制作 |
| [matlab](./public/matlab/) | MATLAB 和 GNU Octave 数值计算 |
| [neurokit2](./public/neurokit2/) | ECG、EEG、EDA 生物信号处理 |
| [pydicom](./public/pydicom/) | DICOM 医学影像文件 Python 库 |
| [pymoo](./public/pymoo/) | 多目标优化框架 |
| [rowan](./public/rowan/) | 基于云的量子化学平台 |
| [simpy](./public/simpy/) | 离散事件模拟框架 |
| [sympy](./public/sympy/) | Python 符号数学 |

---

## 数据可视化

绘图库、科学可视化和图表创建。

| 技能 | 描述 |
|------|------|
| [matplotlib](./public/matplotlib/) | 完全可定制的底层绘图库 |
| [plotly](./public/plotly/) | 交互式可视化库 |
| [scientific-schematics](./public/scientific-schematics/) | 创建出版级科学图表 |
| [scientific-visualization](./public/scientific-visualization/) | 期刊格式出版级图表 |
| [seaborn](./public/seaborn/) | 集成 pandas 的统计可视化 |

---

## 临床与医学

医疗 AI、临床研究和医学文档工具。

| 技能 | 描述 |
|------|------|
| [clinical-decision-support](./public/clinical-decision-support/) | 生成 GRADE 证据分级 CDS 文档 |
| [clinical-reports](./public/clinical-reports/) | 编写综合临床报告 |
| [clinpgx-database](./public/clinpgx-database/) | 访问 ClinPGx 药物基因组学数据 |
| [clinvar-database](./public/clinvar-database/) | 查询 ClinVar 变异临床意义 |
| [histolab](./public/histolab/) | 整张切片图像分块提取和预处理 |
| [iso-13485-certification](./public/iso-13485-certification/) | ISO 13485 医疗器械 QMS 文档 |
| [omero-integration](./public/omero-integration/) | 显微镜数据管理平台 |
| [pathml](./public/pathml/) | 计算病理学工具包 |
| [pyhealth](./public/pyhealth/) | EHR 和临床预测医疗 AI |
| [treatment-plans](./public/treatment-plans/) | 生成简洁医疗治疗方案 |

---

## 科技论文写作与出版

文献综述、手稿撰写、同行评审和出版工具。

| 技能 | 描述 |
|------|------|
| [citation-management](./public/citation-management/) | 综合引文管理和 BibTeX |
| [clinical-reports](./public/clinical-reports/) | 编写符合监管合规的临床报告 |
| [doc-coauthoring](./public/doc-coauthoring/) | 协作撰写文档的结构化工作流 |
| [latex-posters](./public/latex-posters/) | 使用 LaTeX 创建专业学术海报 |
| [literature-review](./public/literature-review/) | 进行系统文献综述 |
| [market-research-reports](./public/market-research-reports/) | 生成咨询风格市场研究报告 |
| [paper-2-web](./public/paper-2-web/) | 将学术论文转换为网站和视频 |
| [peer-review](./public/peer-review/) | 结构化手稿/基金评审 |
| [research-grants](./public/research-grants/) | 撰写有竞争力的研究提案 |
| [research-lookup](./public/research-lookup/) | 使用 Perplexity 查询当前研究 |
| [scholar-evaluation](./public/scholar-evaluation/) | 使用 ScholarEval 框架评估学术成果 |
| [scientific-brainstorming](./public/scientific-brainstorming/) | 创意研究构思 |
| [scientific-critical-thinking](./public/scientific-critical-thinking/) | 评估科学声明和证据质量 |
| [scientific-writing](./public/scientific-writing/) | 使用 IMRAD 结构撰写科学手稿 |
| [statistical-analysis](./public/statistical-analysis/) | APA 格式引导统计分析 |
| [treatment-plans](./public/treatment-plans/) | 生成医疗治疗方案 |
| [venue-templates](./public/venue-templates/) | 主要出版机构的 LaTeX 模板 |

---

## 实验室自动化与实验方案

实验室自动化、方案管理和实验工作流。

| 技能 | 描述 |
|------|------|
| [benchling-integration](./public/benchling-integration/) | Benchling R&D 平台集成 |
| [dnanexus-integration](./public/dnanexus-integration/) | DNAnexus 云基因组学平台 |
| [hypogenic](./public/hypogenic/) | 自动假设检验数据集 |
| [labarchive-integration](./public/labarchive-integration/) | 电子实验室笔记本 API 集成 |
| [latchbio-integration](./public/latchbio-integration/) | Latch 生物信息学工作流平台 |
| [omero-integration](./public/omero-integration/) | 显微镜数据管理平台 |
| [opentrons-integration](./public/opentrons-integration/) | Opentrons 协议 API 用于实验室机器人 |
| [protocolsio-integration](./public/protocolsio-integration/) | protocols.io API 集成 |
| [pylabrobot](./public/pylabrobot/) | 供应商无关实验室自动化框架 |
| [treatment-plans](./public/treatment-plans/) | 生成医疗治疗方案 |

---

## 前端与网页开发

UI/UX 设计、网页开发和前端优化。

| 技能 | 描述 |
|------|------|
| [adapt](./public/adapt/) | 使设计适应不同屏幕尺寸和平台 |
| [amap-jsapi-skill](./public/amap-jsapi-skill/) | 高德地图 JSAPI v2.0 WebGL 开发 |
| [animate](./public/animate/) | 使用动画和微交互增强设计 |
| [audit](./public/audit/) | 综合界面质量审计 |
| [clarify](./public/clarify/) | 改善不清晰的 UX 文案和错误消息 |
| [critique](./public/critique/) | 从 UX 角度评估设计效果 |
| [design-principles](./public/design-principles/) | 应用 10 条经过验证的设计原则 |
| [distill](./public/distill/) | 提炼设计至本质 |
| [frontend-design](./public/frontend-design/) | 创建生产级前端界面 |
| [harden](./public/harden/) | 提高界面弹性和错误处理 |
| [json-canvas](./public/json-canvas/) | 创建和编辑 JSON Canvas 文件 |
| [mcp-builder](./public/mcp-builder/) | 创建 MCP 服务器用于工具集成 |
| [obsidian-bases](./public/obsidian-bases/) | 创建 Obsidian Bases 数据库视图 |
| [obsidian-markdown](./public/obsidian-markdown/) | 创建 Obsidian 风格 Markdown |
| [onboard](./public/onboard/) | 设计入职引导流程 |
| [optimize](./public/optimize/) | 提高界面性能 |
| [polish](./public/polish/) | 发布前的最终质量检查 |
| [react-best-practices](./public/react-best-practices/) | React/Next.js 性能优化 |
| [vercel-deploy-claimable](./public/vercel-deploy-claimable/) | 部署应用到 Vercel |
| [vercel-react-best-practices](./public/vercel-react-best-practices/) | Vercel React 性能指南 |
| [vercel-react-native-skills](./public/vercel-react-native-skills/) | React Native 和 Expo 最佳实践 |
| [web-artifacts-builder](./public/web-artifacts-builder/) | 创建复杂的 HTML 工件 |
| [web-design-guidelines](./public/web-design-guidelines/) | 审查 UI 符合网页界面指南 |
| [webapp-testing](./public/webapp-testing/) | 使用 Playwright 测试网页应用 |

---

## 设计与艺术

视觉设计、创意工具和美学增强。

| 技能 | 描述 |
|------|------|
| [algorithmic-art](./public/algorithmic-art/) | 使用 p5.js 创建算法艺术 |
| [bolder](./public/bolder/) | 增强设计使其更具视觉吸引力 |
| [brand-guidelines](./public/brand-guidelines/) | 应用 Anthropic 品牌色彩和排版 |
| [canvas-design](./public/canvas-design/) | 在 PNG 和 PDF 中创建视觉艺术 |
| [colorize](./public/colorize/) | 为单调设计添加战略性色彩 |
| [delight](./public/delight/) | 添加愉悦和个性的元素 |
| [extract](./public/extract/) | 提取设计标记到设计系统 |
| [generate-image](./public/generate-image/) | 使用 AI 模型生成图像 |
| [normalize](./public/normalize/) | 使设计与设计系统保持一致 |
| [quieter](./public/quieter/) | 柔化过于大胆的设计 |
| [scientific-slides](./public/scientific-slides/) | 为研究演讲构建幻灯片 |
| [slack-gif-creator](./public/slack-gif-creator/) | 为 Slack 创建动画 GIF |
| [teach-impeccable](./public/teach-impeccable/) | 一次性设置设计上下文 |
| [theme-factory](./public/theme-factory/) | 使用预设主题样式化工件 |

---

## 智能体与工作流

智能体编排、工作流管理和开发实践。

| 技能 | 描述 |
|------|------|
| [brainstorming](./public/brainstorming/) | 在创意工作前探索用户意图 |
| [code-simplifier](./public/code-simplifier/) | 简化和改进代码以提高清晰度 |
| [denario](./public/denario/) | 多智能体 AI 用于科学研究 |
| [dispatching-parallel-agents](./public/dispatching-parallel-agents/) | 并行处理 2+ 个独立任务 |
| [doc-coauthoring](./public/doc-coauthoring/) | 协作撰写文档的结构化工作流 |
| [executing-plans](./public/executing-plans/) | 使用检查点执行实施计划 |
| [find-skills](./public/find-skills/) | 发现和安装智能体技能 |
| [finishing-a-development-branch](./public/finishing-a-development-branch/) | 指导开发分支完成 |
| [git-commit](./public/git-commit/) | 智能暂存执行 git 提交 |
| [git-release](./public/git-release/) | 创建一致的发布和变更日志 |
| [hypothesis-generation](./public/hypothesis-generation/) | 结构化假设构建 |
| [internal-comms](./public/internal-comms/) | 撰写内部沟通 |
| [markitdown](./public/markitdown/) | 将文档转换为 Markdown |
| [perplexity-search](./public/perplexity-search/) | AI 驱动的网络搜索 |
| [receiving-code-review](./public/receiving-code-review/) | 处理代码审查反馈 |
| [requesting-code-review](./public/requesting-code-review/) | 合并前请求代码审查 |
| [serenity-skill](./public/serenity-skill/) | Serenity 风格投资研究和论点检验 |
| [skill-creator](./public/skill-creator/) | 创建有效的技能 |
| [subagent-driven-development](./public/subagent-driven-development/) | 使用独立任务执行计划 |
| [systematic-debugging](./public/systematic-debugging/) | 在提出修复前系统调试 |
| [test-driven-development](./public/test-driven-development/) | 使用 TDD 实现功能 |
| [using-git-worktrees](./public/using-git-worktrees/) | 创建隔离的 git 工作树 |
| [using-superpowers](./public/using-superpowers/) | 查找和使用技能 |
| [verification-before-completion](./public/verification-before-completion/) | 完成前验证工作 |
| [writing-plans](./public/writing-plans/) | 撰写多步骤任务计划 |
| [writing-skills](./public/writing-skills/) | 创建和编辑技能 |

---

## 上下文工程

AI 上下文优化、内存管理和智能体架构。

| 技能 | 描述 |
|------|------|
| [context-compression](./public/context-compression/) | 压缩上下文减少 token 使用 |
| [context-degradation](./public/context-degradation/) | 诊断上下文问题和故障 |
| [context-fundamentals](./public/context-fundamentals/) | 理解上下文窗口和架构 |
| [context-optimization](./public/context-optimization/) | 优化上下文降低成本 |

---

## 量子计算

量子计算框架和量子机器学习。

| 技能 | 描述 |
|------|------|
| [cirq](./public/cirq/) | Google 量子计算框架 |
| [pennylane](./public/pennylane/) | 硬件无关量子 ML 框架 |
| [qiskit](./public/qiskit/) | IBM 量子计算框架 |
| [qutip](./public/qutip/) | 量子物理模拟库 |

---

## 文档处理

文件格式处理、文档创建和数据提取。

| 技能 | 描述 |
|------|------|
| [docx](./public/docx/) | 创建和编辑 Word 文档 |
| [markitdown](./public/markitdown/) | 将文件转换为 Markdown |
| [pdf](./public/pdf/) | 综合 PDF 操作 |
| [pptx](./public/pptx/) | 创建和编辑 PowerPoint 演示文稿 |
| [pptx-posters](./public/pptx-posters/) | 使用 PPTX 创建研究海报 |
| [xlsx](./public/xlsx/) | 创建和编辑 Excel 电子表格 |

---

## 贡献指南

创建和修改技能请参阅 [CLAUDE.md](./CLAUDE.md)。

---

## 许可证

各技能目录包含各自的许可证信息。