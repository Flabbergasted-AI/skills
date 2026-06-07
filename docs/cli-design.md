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

### CLI 自身升级

```bash
skills upgrade                           # 检查并安装 CLI 最新版本
skills upgrade --check                   # 仅检查，不安装
```

### 版本锁定

```bash
skills lock create                       # 从已安装 skill 生成 skills.lock
skills lock show                         # 查看锁定的版本
skills lock update                       # 更新锁定到最新 commit
skills lock update <name>                # 更新指定 skill 的锁定
skills lock remove <name...>             # 从锁文件中移除 skill

skills install <name> --lock             # 安装并写入 skills.lock
skills install <name> --frozen           # 严格使用 skills.lock 中的版本（CI 场景）
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
│   ├── CHANGELOG.md           # 版本更新日志
│   ├── bin/
│   │   └── skills.mjs         # 入口 (#!/usr/bin/env node)
│   └── src/
│       ├── index.ts           # CLI 主入口
│       ├── commands/
│       │   ├── search.ts      # search / list / info
│       │   ├── install.ts     # install (支持 --lock / --frozen)
│       │   ├── uninstall.ts   # uninstall
│       │   ├── update.ts      # update / outdated
│       │   ├── upgrade.ts     # upgrade (CLI 自身更新)
│       │   ├── lock.ts        # lock create/show/update/remove
│       │   ├── init.ts        # init
│       │   ├── validate.ts    # validate
│       │   ├── package.ts     # package
│       │   ├── config.ts      # config
│       │   └── index-build.ts # index build (维护者)
│       ├── lib/
│       │   ├── registry.ts    # 索引获取、解析、缓存
│       │   ├── targets.ts     # 安装目标检测与管理
│       │   ├── installer.ts   # skill 安装/卸载逻辑
│       │   ├── lockfile.ts    # skills.lock 读写
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
    "commit": "abc1234def5678901234567890abcdef12345678"
  }
}
```

---

## 版本锁定 — skills.lock

`skills.lock` 文件将每个 skill 锁定到特定的 Git commit hash，确保团队成员和 CI 环境安装完全一致的版本。

### 文件位置

- 项目级：`${cwd}/skills.lock`（推荐提交到 Git）
- 文件随项目走，不同项目可以锁定不同版本

### 文件格式

```json
{
  "lockfileVersion": 1,
  "skills": {
    "alphafold-database": {
      "commit": "abc1234def5678901234567890abcdef12345678",
      "installedAt": "2026-06-07T10:00:00Z",
      "source": "flabbergasted"
    },
    "scanpy": {
      "commit": "abc1234def5678901234567890abcdef12345678",
      "installedAt": "2026-06-07T10:00:00Z",
      "source": "flabbergasted"
    }
  }
}
```

### 工作流程

```
install 时的锁定逻辑：

1. 检查当前目录是否有 skills.lock
2. 如果有 --frozen 标志：
   a. skills.lock 必须存在，否则报错
   b. 安装的 skill 必须在 lock 文件中，否则跳过
   c. 使用锁定的 commit hash 下载
3. 如果有 skills.lock 且无 --lock 标志：
   a. 自动使用锁定的 commit hash（默认行为）
4. 如果有 --lock 标志：
   a. 安装最新版本
   b. 将新的 commit hash 写入 skills.lock
5. 如果没有 skills.lock：
   a. 正常安装最新版本
```

### CI 场景

```bash
# 在 CI 中确保可复现安装
skills install alphafold-database scanpy --frozen

# 开发者更新 lock 文件
skills lock update
git add skills.lock
git commit -m "chore: update skills.lock"
```

---

## npm 包配置

```json
{
  "name": "@flabbergasted-ai/skills",
  "version": "0.1.5",
  "description": "CLI tool for managing AI agent skills",
  "bin": {
    "skills": "./bin/skills.mjs"
  },
  "type": "module",
  "engines": {
    "node": ">=24"
  },
  "dependencies": {
    "commander": "^13.1.0",
    "chalk": "^5.4.1",
    "ora": "^8.2.0",
    "fs-extra": "^11.2.0",
    "cosmiconfig": "^9.0.0",
    "fuse.js": "^7.1.0",
    "gray-matter": "^4.0.3",
    "adm-zip": "^0.5.16",
    "yaml": "^2.7.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.15.0",
    "@types/fs-extra": "^11.0.4",
    "@types/adm-zip": "^0.5.7",
    "tsup": "^8.4.0",
    "tsx": "^4.19.0",
    "vitest": "^3.1.0"
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

#### 自动发布（推荐）

使用内置 release 脚本一键完成 bump + CHANGELOG + commit + tag：

```bash
cd cli
npm run release            # 默认 patch (0.1.5 → 0.1.6)
npm run release:minor      # minor (0.1.5 → 0.2.0)
npm run release:major      # major (0.1.5 → 1.0.0)
```

脚本会自动：

1. 检查工作目录是否干净
2. `npm version` 更新 package.json
3. 更新 CHANGELOG.md 中的版本号和日期
4. 创建 commit: `chore(cli): bump version to vx.y.z`
5. 创建 Git tag: `vX.Y.Z`

完成后只需推送：

```bash
git push origin main --tags
```

#### 手动发布

```bash
# 1. 更新版本号
cd cli
npm version patch   # 或 minor / major
# 编辑 CHANGELOG.md：将 [Unreleased] 改为新版本号和日期

# 2. 提交
cd ..
git add cli/package.json cli/CHANGELOG.md
git commit -m "chore(cli): bump version to vx.y.z"

# 3. 打 tag 并推送
git tag v$(node -p "require('./cli/package.json').version")
git push origin main --tags
```

#### CI 自动发布

推送 tag 后 GitHub Actions 自动执行：

- `npm ci` 安装依赖
- `npm run build` 构建 dist/
- `npm publish --access public --provenance` 发布到 npm

#### 验证发布

```bash
npm info @flabbergasted-ai/skills
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

# 检查并升级 CLI 自身
skills upgrade --check
skills upgrade

# 项目级安装
cd my-research-project
skills install alphafold-database --project

# 安装并锁定版本
skills install alphafold-database scanpy --lock
cat skills.lock

# CI 可复现安装
skills install alphafold-database scanpy --frozen

# 更新锁定到最新
skills lock update
skills lock show

# 配置默认目标
skills config set defaultTargets claude,agents

# 添加自定义目标
skills config add-target windsurf ~/.windsurf/skills/
```

---

## 变更日志

CLI 的每次版本更新记录在 `cli/CHANGELOG.md`，遵循 [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 格式。

发布新版本时，需同步更新 CHANGELOG.md 中的 `[Unreleased]` 部分为新版本号及日期。

---

## 后续扩展

1. **skills.sh 兼容** — 支持 `skills add <owner/repo@skill>` 语法
2. **skill 依赖** — frontmatter 中 `requires` 字段声明依赖关系
3. **Web UI** — GitHub Pages 静态站点浏览和搜索 skills
4. **skill 评分** — 基于安装量和用户反馈的质量排序
