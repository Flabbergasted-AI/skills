# Skills CLI — 技术方案

## 概述

一个 Node.js 命令行工具，用于搜索、安装、管理 AI agent skills。支持将 skill 安装到多个 agent 工具目录（Claude Code、Cursor、~/.agents 等）。

发布为 npm 包，用户通过 `npx @flabbergasted-ai/skills` 或全局安装 `npm i -g @flabbergasted-ai/skills` 使用。

---

## 技术选型

| 组件     | 选择                      | 理由                                  |
| -------- | ------------------------- | ------------------------------------- |
| 运行时   | Node.js ≥ 18              | `npx` 零安装体验、JSON 处理天然优势   |
| CLI 框架 | Commander.js              | 轻量、成熟、无额外依赖                |
| 搜索     | Fuse.js                   | 轻量 fuzzy search，无需外部服务       |
| 配置     | cosmiconfig               | 标准配置文件发现（支持 yaml/json/rc） |
| 输出美化 | chalk + ora               | 彩色输出 + spinner                    |
| 文件操作 | fs-extra                  | cp/rm 递归操作                        |
| 远程索引 | node-fetch (或内置 fetch) | 从 GitHub 获取 index.json             |
| 打包格式 | archiver / adm-zip        | .skill 文件打包（zip 格式）           |

---

## 命令设计

### 搜索与发现

```bash
skills search <query>                    # 关键词模糊搜索
skills search --category <category>      # 按分类筛选
skills search --tag <tag>                # 按标签筛选
skills list                              # 列出所有可用 skill
skills list --installed                  # 列出已安装的 skill
skills info <skill-name>                 # 查看 skill 详情
```

### 安装与卸载

```bash
skills install <name...>                 # 安装到默认目标
skills install <name> --target <id>      # 指定目标 (claude/cursor/agents/all)
skills install <name> --path <dir>       # 自定义路径
skills install <name> --project          # 项目级安装 (cwd/.claude/skills/)
skills install --category <category>     # 安装整个分类
skills install --from skills.txt         # 从文件批量安装

skills uninstall <name...>               # 从所有目标卸载
skills uninstall <name> --target <id>    # 从指定目标卸载
```

### 更新

```bash
skills update                            # 更新所有已安装 skill
skills update <name>                     # 更新指定 skill
skills outdated                          # 列出可更新的 skill
```

### 创建与打包

```bash
skills init <name>                       # 创建新 skill 模板
skills init <name> --path <dir>          # 指定输出目录
skills validate <path>                   # 验证 skill 结构
skills package <path>                    # 打包为 .skill 文件
skills package <path> --output <dir>     # 指定输出目录
```

### 配置

```bash
skills config                            # 显示当前配置
skills config set <key> <value>          # 设置配置项
skills config add-target <id> <path>     # 添加自定义安装目标
skills config remove-target <id>         # 移除自定义目标
skills targets                           # 列出所有安装目标及检测状态
```

### 索引构建（维护者）

```bash
skills index build                       # 扫描 public/ 生成 index.json
skills index build --output <path>       # 指定输出路径
```

---

## 安装目标系统

### 内置目标

| Target ID        | 路径                     | 说明                    |
| ---------------- | ------------------------ | ----------------------- |
| `claude`         | `~/.claude/skills/`      | Claude Code 全局 skills |
| `cursor`         | `~/.cursor/skills/`      | Cursor 全局 skills      |
| `agents`         | `~/.agents/skills/`      | 通用 Agent skills 目录  |
| `codex`          | `~/.codex/skills/`       | OpenAI Codex CLI        |
| `aider`          | `~/.aider/skills/`       | Aider                   |
| `continue`       | `~/.continue/skills/`    | Continue.dev            |
| `project`        | `${cwd}/.claude/skills/` | 项目级 Claude           |
| `cursor-project` | `${cwd}/.cursor/skills/` | 项目级 Cursor           |

### 自动检测

安装时自动检测哪些 agent 工具已安装（检查父目录是否存在），只向已检测到的目标安装：

```
$ skills install alphafold-database

🔍 Detected targets:
   ✓ claude   → ~/.claude/skills/
   ✓ cursor   → ~/.cursor/skills/
   ✓ agents   → ~/.agents/skills/
   ✗ codex    (not detected)
   ✗ aider    (not detected)

📦 Installing alphafold-database...
   → ~/.claude/skills/alphafold-database/  ✓
   → ~/.cursor/skills/alphafold-database/  ✓
   → ~/.agents/skills/alphafold-database/  ✓

✅ Installed to 3 targets
```

### 自定义目标

用户可通过配置文件或命令添加自定义安装目标：

```bash
skills config add-target my-agent ~/my-agent-framework/skills/
```

---

## 配置文件

位置：`~/.skillsrc`（支持 `.skillsrc.yaml`、`.skillsrc.json`、`~/.config/skills/config.yaml`）

```yaml
# 默认安装目标（不指定 --target 时生效）
defaultTargets:
  - claude
  - cursor
  - agents

# 自动检测模式（true=只安装到已存在的目标）
autoDetect: true

# 自定义安装目标
customTargets:
  my-agent:
    path: ~/my-agent-framework/skills/
  work:
    path: ~/work/monorepo/.claude/skills/

# Registry 配置（支持多源）
registries:
  - name: flabbergasted
    url: https://raw.githubusercontent.com/Flabbergasted-AI/skills/main/index.json
    type: github
```

---

## 索引格式 (index.json)

```json
{
  "version": "1.0.0",
  "updatedAt": "2026-06-06T14:00:00Z",
  "skills": [
    {
      "name": "alphafold-database",
      "description": "Access AlphaFold 200M+ AI-predicted protein structures",
      "category": "scientific-databases",
      "tags": ["protein", "structure", "alphafold", "api", "bioinformatics"],
      "path": "public/alphafold-database",
      "hasReferences": true,
      "hasScripts": false,
      "hasAssets": false
    }
  ],
  "categories": [
    {
      "id": "scientific-databases",
      "name": "Scientific Databases",
      "description": "Direct REST/SOAP API access to scientific databases"
    }
  ]
}
```

---

## 项目结构

```
skills/
├── public/                    # 所有 skill 包 (205+)
├── index.json                 # 自动生成的索引（CI 构建）
├── docs/
│   └── cli-design.md          # 本文档
├── cli/                       # CLI 工具源码
│   ├── package.json
│   ├── tsconfig.json
│   ├── bin/
│   │   └── skills.mjs         # 入口 (#!/usr/bin/env node)
│   └── src/
│       ├── index.ts           # CLI 主入口
│       ├── commands/
│       │   ├── search.ts      # search / list / info
│       │   ├── install.ts     # install
│       │   ├── uninstall.ts   # uninstall
│       │   ├── update.ts      # update / outdated
│       │   ├── init.ts        # init
│       │   ├── validate.ts    # validate
│       │   ├── package.ts     # package
│       │   ├── config.ts      # config
│       │   └── index-build.ts # index build (维护者)
│       ├── lib/
│       │   ├── registry.ts    # 索引获取、解析、缓存
│       │   ├── targets.ts     # 安装目标检测与管理
│       │   ├── installer.ts   # skill 安装/卸载逻辑
│       │   ├── config.ts      # 配置文件读写
│       │   ├── search.ts      # 搜索引擎 (Fuse.js)
│       │   ├── validator.ts   # SKILL.md 验证
│       │   └── packager.ts    # .skill 打包
│       └── types.ts           # 类型定义
├── scripts/
│   └── build-index.ts         # 独立索引构建脚本 (CI 用)
├── .github/
│   └── workflows/
│       └── build-index.yml    # PR/push 时自动重建 index.json
├── AGENTS.md
├── CLAUDE.md
└── README.md
```

---

## 核心流程

### install 流程

```
1. 解析参数 (skill 名称, --target, --path, --project)
2. 加载配置文件确定默认目标
3. 获取/缓存 index.json（本地或远程）
4. 在索引中查找 skill → 获取 path
5. 确定安装目标列表
   - 有 --target → 使用指定目标
   - 有 --path → 使用自定义路径
   - autoDetect=true → 检测已安装的 agent 工具
   - 否则 → 使用 defaultTargets
6. 对每个目标：
   a. 确认目标目录存在（不存在则 mkdir -p）
   b. 复制 skill 目录到目标路径
   c. 记录安装元数据 (~/.skills/installed.json)
7. 输出安装结果
```

### search 流程

```
1. 获取/缓存 index.json
2. 用 Fuse.js 对 name + description + tags 做模糊匹配
3. 如指定 --category 则先过滤
4. 格式化输出匹配结果（名称、描述、分类、安装命令）
```

### index build 流程

```
1. 扫描 public/ 下所有子目录
2. 对每个目录读取 SKILL.md
3. 解析 frontmatter (yaml 或 table 格式)
4. 推断 category（从 README.md 分类表或目录名）
5. 检测 references/、scripts/、assets/ 是否存在
6. 生成 index.json 写入 repo 根目录
```

---

## 安装元数据

记录在 `~/.skills/installed.json`，用于 update/outdated/list --installed：

```json
{
  "alphafold-database": {
    "installedAt": "2026-06-06T14:00:00Z",
    "version": "1.0.0",
    "source": "flabbergasted",
    "targets": ["claude", "cursor", "agents"],
    "commit": "abc1234"
  }
}
```

---

## npm 包配置

```json
{
  "name": "@flabbergasted-ai/skills",
  "version": "0.1.0",
  "description": "CLI tool for managing AI agent skills",
  "bin": {
    "skills": "./bin/skills.mjs"
  },
  "type": "module",
  "engines": {
    "node": ">=18"
  },
  "dependencies": {
    "commander": "^12.0.0",
    "chalk": "^5.3.0",
    "ora": "^8.0.0",
    "fs-extra": "^11.0.0",
    "cosmiconfig": "^9.0.0",
    "fuse.js": "^7.0.0",
    "gray-matter": "^4.0.3",
    "adm-zip": "^0.5.0",
    "yaml": "^2.4.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/fs-extra": "^11.0.0",
    "tsup": "^8.0.0",
    "vitest": "^2.0.0"
  }
}
```

---

## CI/CD

### GitHub Actions: build-index.yml

在每次 push 到 main 分支时自动重建 `index.json`：

```yaml
name: Build Index
on:
  push:
    branches: [main]
    paths: ['public/**']
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
        working-directory: cli
      - run: npx tsx scripts/build-index.ts
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore: rebuild index.json'
          file_pattern: index.json
```

### 发布流程

```yaml
name: Publish
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: npm ci && npm run build
        working-directory: cli
      - run: npm publish --access public
        working-directory: cli
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 发布操作步骤

1. **更新版本号**

```bash
cd cli
npm version patch   # 或 minor / major
cd ..
```

2. **提交版本变更**

```bash
git add cli/package.json
git commit -m "chore: bump version to x.y.z"
```

3. **打 tag 并推送**

```bash
git tag v$(node -p "require('./cli/package.json').version")
git push origin main --tags
```

4. **自动发布** — 推送 tag 后 GitHub Actions 自动执行：
   - `npm ci` 安装依赖
   - `npm run build` 构建 dist/
   - `npm run build-index` 重建 index.json
   - `npm publish --access public --provenance` 发布到 npm

5. **验证发布**

```bash
# 确认 npm 包已发布
npm info @flabbergasted-ai/skills

# 测试 npx 使用
npx @flabbergasted-ai/skills --version
```

### 前置要求

- 在 GitHub repo 的 Settings → Secrets → Actions 中添加 `NPM_TOKEN`
- npm token 需要 publish 权限：`npm token create --read-only=false`
- package.json 中的 `name` 字段需要是你有发布权限的 scope

---

## 使用示例

```bash
# 首次使用（npx 零安装）
npx @flabbergasted-ai/skills search "single cell"

# 全局安装后
npm i -g @flabbergasted-ai/skills
skills install scanpy biopython anndata
skills list --installed
skills update

# 项目级安装
cd my-research-project
skills install alphafold-database --project

# 配置默认目标
skills config set defaultTargets claude,agents

# 添加自定义目标
skills config add-target windsurf ~/.windsurf/skills/
```

---

## 后续扩展

1. **skills.sh 兼容** — 支持 `skills add <owner/repo@skill>` 语法
2. **skill 依赖** — frontmatter 中 `requires` 字段声明依赖关系
3. **版本锁定** — `skills.lock` 文件锁定 commit hash
4. **Web UI** — GitHub Pages 静态站点浏览和搜索 skills
5. **skill 评分** — 基于安装量和用户反馈的质量排序
