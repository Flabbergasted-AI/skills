# Flabbergasted AI Skills

Claude Code 向けの 200+ AI スキルコレクション。科学研究、ソフトウェア開発、クリエイティブワークなど多分野にわたる能力を拡張します。

**[English](./README.md)** | **[中文](./README_zh.md)** | **[Agent Guide](./AGENTS.md)** | **[CLAUDE.md](./CLAUDE.md)**

---

## 目次

- [科学データベース](#科学データベース)
- [生物情報学とゲノム科学](#生物情報学とゲノム科学)
-創薬と化学](#創薬と化学)
- [機械学習とデータ科学](#機械学習とデータ科学)
- [科学計算](#科学計算)
- [データ可視化](#データ可視化)
- [臨床と医学](#臨床と医学)
- [科学論文執筆と出版](#科学論文執筆と出版)
- [ラボ自動化とプロトコル](#ラボ自動化とプロトコル)
- [フロントエンドとウェブ開発](#フロントエンドとウェブ開発)
- [デザインとアート](#デザインとアート)
- [エージェントとワークフロー](#エージェントとワークフロー)
- [コンテキストエンジニアリング](#コンテキストエンジニアリング)
- [量子コンピューティング](#量子コンピューティング)
- [ドキュメント処理](#ドキュメント処理)

---

## 科学データベース

REST/SOAP APIを通じて科学データベースに直接アクセスし、研究データの查询とダウンロードを行います。

| スキル | 説明 |
|--------|------|
| [alphafold-database](./public/alphafold-database/) | AlphaFold 2億+ AI 予測タンパク質構造へのアクセス |
| [biomni](./public/biomni/) | 複雑な研究タスクを実行する自律型生物医学 AI エージェント |
| [biorxiv-database](./public/biorxiv-database/) | bioRxiv 生命科学プレプリントの検索 |
| [brenda-database](./public/brenda-database/) | BRENDA 酵素データベースへのアクセス（动力学パラメータ） |
| [cellxgene-census](./public/cellxgene-census/) | CELLxGENE Census（6100万+ 細胞）の查询 |
| [chembl-database](./public/chembl-database/) | ChEMBL 生物活性分子データの查询 |
| [clinicaltrials-database](./public/clinicaltrials-database/) | ClinicalTrials.gov 臨床試験データの検索 |
| [clinpgx-database](./public/clinpgx-database/) | ClinPGx 药物ゲノム学データと CPIC ガイドラインへのアクセス |
| [clinvar-database](./public/clinvar-database/) | ClinVar 変異の臨床的意義の查询 |
| [cosmic-database](./public/cosmic-database/) | COSMIC 癌変異データベースへのアクセス |
| [datacommons-client](./public/datacommons-client/) | Data Commons 公共統計データの查询 |
| [drugbank-database](./public/drugbank-database/) | DrugBank 包括的药物情報へのアクセス |
| [ena-database](./public/ena-database/) | ヨーロッパ核酸アーカイブへのアクセス（配列と原始データ） |
| [ensembl-database](./public/ensembl-database/) | Ensembl ゲノムデータベースの query（250+ 種） |
| [fda-database](./public/fda-database/) | openFDA API 药品・器械・有害事象の查询 |
| [gene-database](./public/gene-database/) | NCBI Gene 遺伝子情報とアノテーションの query |
| [geo-database](./public/geo-database/) | NCBI GEO 遺伝子発現データセットへのアクセス |
| [gwas-database](./public/gwas-database/) | GWAS Catalog SNP-形質関連性の query |
| [hmdb-database](./public/hmdb-database/) |  человеский метаболомная база данныхへのアクセス |
| [kegg-database](./public/kegg-database/) | KEGG パスウェイへの直接 REST API アクセス |
| [metabolomics-workbench-database](./public/metabolomics-workbench-database/) | NIHメタボロミクスワークベンチの query |
| [openalex-database](./public/openalex-database/) | OpenAlex による学術文献の分析 |
| [opentargets-database](./public/opentargets-database/) | Open Targets 靶点-疾患関連の query |
| [pdb-database](./public/pdb-database/) | RCSB PDB タンパク質3D 構造へのアクセス |
| [pubchem-database](./public/pubchem-database/) | PubChem 1.1億+ 化合物の query |
| [pubmed-database](./public/pubmed-database/) | PubMed への直接 REST API アクセス |
| [reactome-database](./public/reactome-database/) | Reactome パスウェイ分析の query |
| [string-database](./public/string-database/) | STRING タンパク質間相互作用の query |
| [uniprot-database](./public/uniprot-database/) | UniProt への直接 REST API アクセス |
| [uspto-database](./public/uspto-database/) | USPTO 特許・商標検索へのアクセス |
| [zinc-database](./public/zinc-database/) | ZINC 購入可能化合物のアクセス |

---

## 生物情報学とゲノム科学

生物配列、ゲノムデータ、単細胞オミクスの分析ツール。

| スキル | 説明 |
|--------|------|
| [anndata](./public/anndata/) |単細胞分析用アノテーションマトリックスデータ構造 |
| [arboreto](./public/arboreto/) | 発現データから遺伝子上流ネットワークを推定 |
| [biopython](./public/biopython/) | 包括的分子生物学ツールキット |
| [bioservices](./public/bioservices/) | 40+ 生物情報サービスへの統一 Python インターフェース |
| [cellxgene-census](./public/cellxgene-census/) | CELLxGENE Census 発現データの query |
| [cobrapy](./public/cobrapy/) | 制約ベース代謝モデリングと FLUX平衡分析 |
| [deeptools](./public/deeptools/) | ChIP-seq、RNA-seq 可視化用 NGS 分析ツールキット |
| [dnanexus-integration](./public/dnanexus-integration/) | DNAnexus クラウドゲノム科学プラットフォーム |
| [etetoolkit](./public/etetoolkit/) | 系統樹ツールキット（系統ゲノム科学用） |
| [flowio](./public/flowio/) | FCSフローサイトメトリーファイルの解析 |
| [gget](./public/gget/) | 20+ 生命科学データベースへの高速 CLI query |
| [geniml](./public/geniml/) | BED ファイル用ゲノム領域機械学習 |
| [gtars](./public/gtars/) | Rust による高性能ゲノム領域解析 |
| [lamindb](./public/lamindb/) | 生物学用オープンソースデータフレームワーク |
| [neuropixels-analysis](./public/neuropixels-analysis/) | Neuropixels 神経記録解析 |
| [pysam](./public/pysam/) | SAM/BAM/VCF 処理用ゲノムファイルツールキット |
| [scanpy](./public/scanpy/) |標準的単細胞 RNA-seq 分析パイプライン |
| [scikit-bio](./public/scikit-bio/) | 配列分析用生物データツールキット |
| [scvi-tools](./public/scvi-tools/) | 単細胞オミクス用深層生成モデル |

---

## 創薬と化学

分子モデリング、創薬化学、創薬ワークフロー。

| スキル | 説明 |
|--------|------|
| [adaptyv](./public/adaptyv/) | タンパク質テスト用クラウドラボプラットフォーム |
| [chembl-database](./public/chembl-database/) | ChEMBL 生物活性分子の query |
| [datamol](./public/datamol/) | RDKit の簡略化インターフェースを持つ Python ラッパー |
| [deepchem](./public/deepchem/) |分子機械学習と MoleculeNet データセット |
| [diffdock](./public/diffdock/) | 拡散ベース分子ドッキング |
| [drugbank-database](./public/drugbank-database/) | DrugBank 药物情報へのアクセス |
| [esm](./public/esm/) | タンパク質設計用タンパク質言語モデル |
| [matchms](./public/matchms/) | メタボロミクス用スペクトル類似度比較 |
| [medchem](./public/medchem/) | 創薬化学フィルター（Lipinski、PAINS） |
| [molfeat](./public/molfeat/) | 100+ 分子特徴量化手法 |
| [pymatgen](./public/pymatgen/) | 計算材料科学ツールキット |
| [pyopenms](./public/pyopenms/) | 完全質量分析プラットフォーム |
| [pytdc](./public/pytdc/) | 創薬 AI対応データセット |
| [rdkit](./public/rdkit/) | 分子化学情報学ツールキット |
| [torchdrug](./public/torchdrug/) | 分子・タンパク質用 PyTorch 原生 GNN |
| [zinc-database](./public/zinc-database/) | ZINC 購入可能化合物へのアクセス |

---

## 機械学習とデータ科学

機械学習フレームワーク、統計モデリング、データ科学ツール。

| スキル | 説明 |
|--------|------|
| [aeon](./public/aeon/) | 時系列機械学習（分類、予測） |
| [dask](./public/dask/) | 超メモリワークフローのための分散計算 |
| [exploratory-data-analysis](./public/exploratory-data-analysis/) | 200+ 科学ファイル形式の探索的データ分析 |
| [get-available-resources](./public/get-available-resources/) | 計算計画のためのシステムリソース検出 |
| [hypogenic](./public/hypogenic/) | 自动 LLM 駆動仮説生成と検証 |
| [modal](./public/modal/) | サーバーレ斯卡메라と GPU でクラウド実行 Python |
| [networkx](./public/networkx/) | 複雑なネットワークとグラフ分析 |
| [polars](./public/polars/) | 高速メモリ DataFrame ライブラリ |
| [pufferlib](./public/pufferlib/) | 高性能強化学習フレームワーク |
| [pydeseq2](./public/pydeseq2/) | 差次的遺伝子発現分析 |
| [pymc](./public/pymc/) | PyMC によるベイズモデリング |
| [pymoo](./public/pymoo/) | マルチ目的最適化フレームワーク |
| [pytorch-lightning](./public/pytorch-lightning/) | マルチ GPU 対応の深層学習フレームワーク |
| [scikit-learn](./public/scikit-learn/) | Python 機械学習ライブラリ |
| [scikit-survival](./public/scikit-survival/) | 生存分析とイベント時刻モデリング |
| [shap](./public/shap/) | SHAP 値によるモデル解釈可能性 |
| [stable-baselines3](./public/stable-baselines3/) | 本番対応強化学習アルゴリズム |
| [statsmodels](./public/statsmodels/) | 統計モデリングライブラリ |
| [torch_geometric](./public/torch_geometric/) | PyG によるグラフニューラルネットワーク |
| [transformers](./public/transformers/) | 事前学習済みトランスフォーマーモデル |
| [umap-learn](./public/umap-learn/) | UMAP 次元削減 |
| [vaex](./public/vaex/) | 10 億行データセット用アウトオブコア DataFrame |
| [zarr-python](./public/zarr-python/) | クラウドストレージ用チャンク化 N-D 配列 |

---

## 科学計算

数学、物理、天文学計算ツール。

| スキル | 説明 |
|--------|------|
| [astropy](./public/astropy/) | Python 天文学・天体物理学ライブラリ |
| [fluidsim](./public/fluidsim/) | 計算流体力学シミュレーション |
| [geopandas](./public/geopandas/) | 地理空間ベクトルデータ分析とマッピング |
| [matlab](./public/matlab/) | MATLAB と GNU Octave 数値計算 |
| [neurokit2](./public/neurokit2/) | ECG、EEG、EDA 生体信号処理 |
| [pydicom](./public/pydicom/) | DICOM 医用画像ファイル Python ライブラリ |
| [pymoo](./public/pymoo/) | マルチ目的最適化フレームワーク |
| [rowan](./public/rowan/) | クラウドベース量子化学プラットフォーム |
| [simpy](./public/simpy/) | 離散イベントシミュレーションツールキット |
| [sympy](./public/sympy/) | Python 記号数学 |

---

##データ可視化

プロットライブラリ、科学可視化、チャート作成。

| スキル | 説明 |
|--------|------|
| [matplotlib](./public/matplotlib/) | 完全カスタマイズ可能な低レベルプロットライブラリ |
| [plotly](./public/plotly/) | インタラクティブ可視化ライブラリ |
| [scientific-schematics](./public/scientific-schematics/) | 出版グレード科学ダイアグラムの作成 |
| [scientific-visualization](./public/scientific-visualization/) | ジャーナル形式出版グレード図 |
| [seaborn](./public/seaborn/) | pandas 統合統計可視化 |

---

## 臨床と医学

医療 AI、臨床研究、医学ドキュメントツール。

| スキル | 説明 |
|--------|------|
| [clinical-decision-support](./public/clinical-decision-support/) | GRADE 証拠分级 CDS ドキュメント生成 |
| [clinical-reports](./public/clinical-reports/) | 包括的臨床レポートの作成 |
| [clinpgx-database](./public/clinpgx-database/) | ClinPGx 药物ゲノム学データへのアクセス |
| [clinvar-database](./public/clinvar-database/) | ClinVar 変異の臨床的意義の query |
| [histolab](./public/histolab/) | 全スライド画像タイル抽出と前処理 |
| [iso-13485-certification](./public/iso-13485-certification/) | ISO 13485 医療機器 QMS ドキュメント |
| [omero-integration](./public/omero-integration/) | 顕微鏡データ管理プラットフォーム |
| [pathml](./public/pathml/) | 計算病理学ツールキット |
| [pyhealth](./public/pyhealth/) | EHR と臨床予測向け医療 AI |
| [treatment-plans](./public/treatment-plans/) | 簡潔な治療計画書の生成 |

---

## 科学論文執筆と出版

文献レビュー、原稿執筆、同行審査、出版ツール。

| スキル | 説明 |
|--------|------|
| [citation-management](./public/citation-management/) | 包括的引用管理と BibTeX |
| [clinical-reports](./public/clinical-reports/) | 規制遵守臨床レポートの作成 |
| [doc-coauthoring](./public/doc-coauthoring/) | ドキュメント共同執筆のための構造化ワークフロー |
| [latex-posters](./public/latex-posters/) | LaTeX による専門研究ポスターの作成 |
| [literature-review](./public/literature-review/) | 系統的文献レビューの実施 |
| [market-research-reports](./public/market-research-reports/) | コンサルティングスタイル市場調査レポートの生成 |
| [paper-2-web](./public/paper-2-web/) | 学術論文をウェブサイトと動画に変換 |
| [peer-review](./public/peer-review/) | 構造化原稿・助成金審査 |
| [research-grants](./public/research-grants/) | 競争力ある研究提案書の作成 |
| [research-lookup](./public/research-lookup/) | Perplexity で現在の研究を調査 |
| [scholar-evaluation](./public/scholar-evaluation/) | ScholarEval フレームワークで学術評価 |
| [scientific-brainstorming](./public/scientific-brainstorming/) | クリエイティブ研究アイデア出し |
| [scientific-critical-thinking](./public/scientific-critical-thinking/) | 科学的主張と証拠の質の評価 |
| [scientific-writing](./public/scientific-writing/) | IMRAD 構造で科学原稿を書く |
| [statistical-analysis](./public/statistical-analysis/) | APA 形式によるガイド付き統計分析 |
| [treatment-plans](./public/treatment-plans/) | 治療計画書の生成 |
| [venue-templates](./public/venue-templates/) | 主要出版機関用 LaTeX テンプレート |

---

## ラボ自動化とプロトコル

ラボ自動化、プロトコル管理、実験ワークフロー。

| スキル | 説明 |
|--------|------|
| [benchling-integration](./public/benchling-integration/) | Benchling R&D プラットフォーム統合 |
| [dnanexus-integration](./public/dnanexus-integration/) | DNAnexus クラウドゲノム科学プラットフォーム |
| [hypogenic](./public/hypogenic/) | データセット自動仮説検証 |
| [labarchive-integration](./public/labarchive-integration/) |電子ラボノート API 統合 |
| [latchbio-integration](./public/latchbio-integration/) | Latch 生物情報学ワークフロープラットフォーム |
| [omero-integration](./public/omero-integration/) | 顕微鏡データ管理プラットフォーム |
| [opentrons-integration](./public/opentrons-integration/) | Opentrons プロトコル API（ラボロボット用） |
| [protocolsio-integration](./public/protocolsio-integration/) | protocols.io API 統合 |
| [pylabrobot](./public/pylabrobot/) | ベンダー非依存ラボ自動化フレームワーク |
| [treatment-plans](./public/treatment-plans/) | 治療計画書の生成 |

---

## フロントエンドとウェブ開発

UI/UX デザイン、ウェブ開発、フロントエンド最適化。

| スキル | 説明 |
|--------|------|
| [adapt](./public/adapt/) | 異なる画面サイズとプラットフォームにデザインを適応 |
| [amap-jsapi-skill](./public/amap-jsapi-skill/) | 高徳地図 JSAPI v2.0 WebGL開発 |
| [animate](./public/animate/) | アニメーションとマイクロインタラクションで強化 |
| [audit](./public/audit/) | 包括的インターフェース品質監査 |
| [clarify](./public/clarify/) | 不明確な UX コピーとエラーメッセージの改善 |
| [critique](./public/critique/) | UX の観点からデザイン効果を評価 |
| [design-principles](./public/design-principles/) | 10 の実証済みデザイン原則の適用 |
| [distill](./public/distill/) | デザインを本質まで絞り込む |
| [frontend-design](./public/frontend-design/) | 本番グレードフロントエンドインターフェースの作成 |
| [harden](./public/harden/) | インターフェースレジリエンスとエラー処理の向上 |
| [json-canvas](./public/json-canvas/) | JSON Canvas ファイルの作成と編集 |
| [mcp-builder](./public/mcp-builder/) | ツール統合用 MCP サーバーの作成 |
| [obsidian-bases](./public/obsidian-bases/) | Obsidian Bases データベースビューの作成 |
| [obsidian-markdown](./public/obsidian-markdown/) | Obsidian フレーバーマークダウンの作成 |
| [onboard](./public/onboard/) | オンボーディングフローの設計 |
| [optimize](./public/optimize/) | インターフェースパフォーマンスの向上 |
| [polish](./public/polish/) | 出荷前の最終品質チェック |
| [react-best-practices](./public/react-best-practices/) | React/Next.js パフォーマンス最適化 |
| [vercel-deploy-claimable](./public/vercel-deploy-claimable/) | Vercel へのアプリケーションデプロイ |
| [vercel-react-best-practices](./public/vercel-react-best-practices/) | Vercel React パフォーマンスガイドライン |
| [vercel-react-native-skills](./public/vercel-react-native-skills/) | React Native と Expo ベストプラクティス |
| [web-artifacts-builder](./public/web-artifacts-builder/) | 複雑な HTML アーティファクトの作成 |
| [web-design-guidelines](./public/web-design-guidelines/) | UI のウェブインターフェースガイドライン準拠確認 |
| [webapp-testing](./public/webapp-testing/) | Playwright でウェブアプリケーションをテスト |

---

## デザインとアート

ビジュアルデザイン、クリエイティブツール、美学的強化。

| スキル | 説明 |
|--------|------|
| [algorithmic-art](./public/algorithmic-art/) | p5.js でアルゴリズムアートを作成 |
| [bolder](./public/bolder/) | デザインを視覚的に興味深いものに強化 |
| [brand-guidelines](./public/brand-guidelines/) | Anthropic ブランド色彩とタイポグラフィの適用 |
| [canvas-design](./public/canvas-design/) | PNG と PDF でビジュアルアートを作成 |
| [colorize](./public/colorize/) |モノクロデザインに戦略的色彩を追加 |
| [delight](./public/delight/) | 喜びと個の要素を追加 |
| [extract](./public/extract/) | デザインをトークンとしてデザインシステムに抽出 |
| [generate-image](./public/generate-image/) | AI モデルで画像を生成 |
| [normalize](./public/normalize/) | デザインがデザインシステムと一致するように正規化 |
| [quieter](./public/quieter/) | 過度に大胆なデザインを落ち着いたものに |
| [scientific-slides](./public/scientific-slides/) | 研究発表用スライドデッキの構築 |
| [slack-gif-creator](./public/slack-gif-creator/) | Slack 用アニメーション GIF の作成 |
| [teach-impeccable](./public/teach-impeccable/) | デザインコンテキストの一括設定 |
| [theme-factory](./public/theme-factory/) | プリセットテーマでアーティファクトをスタイリング |

---

## エージェントとワークフロー

エージェントオーケストレーション、ワークフロー管理、開発プラクティス。

| スキル | 説明 |
|--------|------|
| [brainstorming](./public/brainstorming/) | クリエイティブワーク前のユーザー意図の探る |
| [code-simplifier](./public/code-simplifier/) | 明確さのためにコードを簡略化・改良 |
| [denario](./public/denario/) | 科学研究用マルチエージェント AI |
| [dispatching-parallel-agents](./public/dispatching-parallel-agents/) | 2+ の独立タスクを並列処理 |
| [doc-coauthoring](./public/doc-coauthoring/) | ドキュメント共同執筆のための構造化ワークフロー |
| [executing-plans](./public/executing-plans/) |チェックポイントで実装計画を実行 |
| [find-skills](./public/find-skills/) | エージェントスキルの発見とインストール |
| [finishing-a-development-branch](./public/finishing-a-development-branch/) | 開発ブランチ完了のガイド |
| [git-commit](./public/git-commit/) | インテリジェントステージングで gitコミット |
| [git-release](./public/git-release/) | 一貫したリリースと changelog の作成 |
| [hypothesis-generation](./public/hypothesis-generation/) | 構造化仮説構築 |
| [internal-comms](./public/internal-comms/) | 内部コミュニケーションの作成 |
| [markitdown](./public/markitdown/) | ドキュメントを Markdown に変換 |
| [perplexity-search](./public/perplexity-search/) | AI 駆動ウェブ検索 |
| [receiving-code-review](./public/receiving-code-review/) | コードレビューフィードバックの処理 |
| [requesting-code-review](./public/requesting-code-review/) | マージ前のコードレビュー依頼 |
| [serenity-skill](./public/serenity-skill/) | Serenity スタイル投資研究とテーゼ検証 |
| [skill-creator](./public/skill-creator/) | 効果的なスキルの作成 |
| [subagent-driven-development](./public/subagent-driven-development/) | 独立タスクで計画を実行 |
| [systematic-debugging](./public/systematic-debugging/) | 修正提案前の体系的なデバッグ |
| [test-driven-development](./public/test-driven-development/) | TDD で機能を実装 |
| [using-git-worktrees](./public/using-git-worktrees/) | 隔離 gitワークトリーの作成 |
| [using-superpowers](./public/using-superpowers/) | スキルの検索と使用 |
| [verification-before-completion](./public/verification-before-completion/) | 完成前の作業検証 |
| [writing-plans](./public/writing-plans/) | マルチステップタスク計画の策定 |
| [writing-skills](./public/writing-skills/) | スキルの作成と編集 |

---

## コンテキストエンジニアリング

AI コンテキスト最適化、メモリ管理、エージェントアーキテクチャ。

| スキル | 説明 |
|--------|------|
| [context-compression](./public/context-compression/) | コンテキスト圧縮とトークン使用量の削減 |
| [context-degradation](./public/context-degradation/) | コンテキスト問題と故障の診断 |
| [context-fundamentals](./public/context-fundamentals/) | コンテキストウィンドウとアーキテクチャの理解 |
| [context-optimization](./public/context-optimization/) | コンテキスト最適化とコスト削減 |

---

## 量子コンピューティング

量子計算フレームワークと量子機械学習。

| スキル | 説明 |
|--------|------|
| [cirq](./public/cirq/) | Google 量子計算フレームワーク |
| [pennylane](./public/pennylane/) | ハードウェア非依存量子 ML フレームワーク |
| [qiskit](./public/qiskit/) | IBM 量子計算フレームワーク |
| [qutip](./public/qutip/) | 量子物理シミュレーションライブラリ |

---

## ドキュメント処理

ファイルフォーマット処理、ドキュメント作成、データ抽出。

| スキル | 説明 |
|--------|------|
| [docx](./public/docx/) | Word ドキュメントの作成と編集 |
| [markitdown](./public/markitdown/) | ファイルを Markdown に変換 |
| [pdf](./public/pdf/) | 包括的 PDF 操作 |
| [pptx](./public/pptx/) | PowerPoint プレゼンテーションの作成と編集 |
| [pptx-posters](./public/pptx-posters/) | PPTX で研究ポスターを作成 |
| [xlsx](./public/xlsx/) | Excel スプレッドシートの作成と編集 |

---

## Skills CLI

スキルの検索、インストール、管理を行うコマンドラインツール。複数のエージェントツールディレクトリへの同時インストールに対応。

### クイックスタート

npm からインストール（推奨）：

```bash
# npx で直接実行（インストール不要）
npx @flabbergasted-ai/skills search "protein"
npx @flabbergasted-ai/skills install alphafold-database

# またはグローバルインストール
npm install -g @flabbergasted-ai/skills
skills search "protein"
skills install alphafold-database --target claude
```

または repo から実行：

```bash
# repo ルートで実行
cd cli && npm install && cd ..
cd cli && npm run build-index

npx tsx cli/src/index.ts search "protein"
npx tsx cli/src/index.ts install alphafold-database
npx tsx cli/src/index.ts install scanpy --target claude --project
```

### 全コマンド

| コマンド | 説明 |
|----------|------|
| `search [query]` | キーワード検索、`--category`、`--tag` 対応 |
| `list` | 全スキル一覧（`--installed` でインストール済みのみ） |
| `info <name>` | スキル詳細情報の表示 |
| `install <names...>` | スキルのインストール（`--target`、`--path`、`--project`） |
| `uninstall <names...>` | スキルのアンインストール |
| `update [names...]` | インストール済みスキルの更新 |
| `outdated` | 利用可能な更新の確認 |
| `init <name>` | テンプレートから新規スキルを作成 |
| `validate <path>` | スキルディレクトリ構造の検証 |
| `package <path>` | スキルを `.skill` ファイルにパッケージ |
| `config show` | 現在の設定を表示 |
| `config set <key> <value>` | 設定値の変更 |
| `config add-target <id> <path>` | カスタムインストール先の追加 |
| `targets` | 全インストール先と検出状態の一覧 |
| `index-build` | `public/` から `index.json` を再構築 |

### インストール先

CLI はインストール済みのエージェントツールを自動検出し、すべてにスキルをインストールします：

| ターゲット | パス | ツール |
|------------|------|--------|
| `claude` | `~/.claude/skills/` | Claude Code |
| `cursor` | `~/.cursor/skills/` | Cursor |
| `agents` | `~/.agents/skills/` | General Agent |
| `codex` | `~/.codex/skills/` | OpenAI Codex CLI |
| `aider` | `~/.aider/skills/` | Aider |
| `continue` | `~/.continue/skills/` | Continue.dev |

`config add-target <id> <path>` でカスタムターゲットを追加できます。

---

## 貢献

スキルの作成と編集は [CLAUDE.md](./CLAUDE.md) を参照してください。

---

## ライセンス

各スキルディレクトリにライセンス情報が含まれています。