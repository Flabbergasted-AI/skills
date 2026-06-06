# @flabbergasted-ai/skills

AI Agent 技能包的搜索、安装与管理工具。

[English](./README.md) | [日本語](./README_ja.md)

## 这是什么？

一个命令行工具，用于搜索、安装和管理 AI Agent 技能包。支持将 200+ 技能安装到 Claude Code、Cursor 或任何自定义目标环境中，为 AI Agent 扩展专业领域知识、工作流和工具集成能力。

## 快速开始

```bash
# 使用 npx 直接运行（无需安装）
npx @flabbergasted-ai/skills search "蛋白质"

# 或者全局安装
npm install -g @flabbergasted-ai/skills
```

## 命令列表

### 搜索与发现

```bash
skills search <关键词>               # 模糊关键词搜索
skills search --category <分类>      # 按分类筛选
```

### 安装与卸载

```bash
skills install <名称...>            # 安装到默认目标
skills install <名称> -t cursor     # 安装到指定目标 (claude/cursor/agents/all)
skills install <名称> --project     # 安装到项目级 .claude/skills/
skills install <名称> -p <目录>     # 安装到自定义路径

skills uninstall <名称...>          # 从所有目标卸载
```

### 更新

```bash
skills update                       # 更新所有已安装技能
skills update <名称>                # 更新指定技能
```

### 创建与打包

```bash
skills init <名称>                  # 创建新技能模板
skills validate <路径>              # 验证技能结构
skills package <路径>               # 打包为 .skill 文件
```

### 配置

```bash
skills config                       # 显示当前配置
skills config set <键> <值>         # 设置配置项
```

## 安装目标

CLI 会自动检测已安装的 Agent 工具并将技能安装到对应目录：

| 目标 | 路径 |
|------|------|
| `claude` | `~/.claude/skills/` |
| `cursor` | `~/.cursor/skills/` |
| `agents` | `~/.agents/skills/` |

可通过 `--target`、`--path` 或 `--project` 参数覆盖默认行为。

## 系统要求

- Node.js >= 24

## 许可证

MIT
