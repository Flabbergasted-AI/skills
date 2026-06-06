# @flabbergasted-ai/skills

AIエージェントスキルの検索、インストール、管理を行うCLIツール。

[English](./README.md) | [中文](./README_zh.md)

## これは何ですか？

AIエージェントスキルの検索、インストール、管理を行うコマンドラインツールです。200以上のスキルをClaude Code、Cursor、またはカスタムターゲット環境にインストールでき、AIエージェントに専門的なドメイン知識、ワークフロー、ツール統合機能を拡張します。

## クイックスタート

```bash
# npxで直接実行（インストール不要）
npx @flabbergasted-ai/skills search "protein"

# またはグローバルインストール
npm install -g @flabbergasted-ai/skills
```

## コマンド一覧

### 検索

```bash
skills search <キーワード>           # ファジーキーワード検索
skills search --category <カテゴリ>  # カテゴリで絞り込み
```

### インストール・アンインストール

```bash
skills install <名前...>            # デフォルトターゲットにインストール
skills install <名前> -t cursor     # 特定ターゲットにインストール (claude/cursor/agents/all)
skills install <名前> --project     # プロジェクトレベル .claude/skills/ にインストール
skills install <名前> -p <ディレクトリ>  # カスタムパスにインストール

skills uninstall <名前...>          # すべてのターゲットからアンインストール
```

### 更新

```bash
skills update                       # インストール済みスキルをすべて更新
skills update <名前>                # 特定のスキルを更新
```

### 作成・パッケージ

```bash
skills init <名前>                  # 新しいスキルテンプレートを作成
skills validate <パス>              # スキル構造を検証
skills package <パス>               # .skill ファイルにパッケージ化
```

### 設定

```bash
skills config                       # 現在の設定を表示
skills config set <キー> <値>       # 設定値を変更
```

## インストールターゲット

CLIはインストール済みのエージェントツールを自動検出し、適切なディレクトリにスキルをインストールします：

| ターゲット | パス |
|-----------|------|
| `claude` | `~/.claude/skills/` |
| `cursor` | `~/.cursor/skills/` |
| `agents` | `~/.agents/skills/` |

`--target`、`--path`、`--project` フラグでデフォルト動作をオーバーライドできます。

## 動作要件

- Node.js >= 24

## ライセンス

MIT
