---
name: nearme
description: >-
  在聚会/办公区/会议等场景分享自己的 Markdown profile，并拿到同场地其他人的 profiles 到本地。
  用户可以通过本地 AI Agent 搜索和发现附近的人。
  When triggered: 用户提到"附近的人"、"谁在"、"分享 profile"、"meetup"、"聚会认识人"、
  "附近有什么人"、"这个场地有谁"、"nm"、"nearme"、"周围有谁"、或在同场地想找到周围的人。
---

# NearMe

通过 AI Agent 分享个人简介，拿到同场地其他人的简介到本地。
用户只需要随口说说自己是谁、对什么感兴趣，其他事情 AI 搞定。

**CLI 路径**：`scripts/index.js` 在本 skill base directory 下。
```
node <base-dir>/scripts/index.js <command> [args]
```
下文用 `nearme` 代替。
base-dir 见 "Base directory for this skill:"。state 存在 skill 根目录 `state.json` 里。

## 核心流程

```
① 到场地 → nearme here <code|描述>    # 定位空间
② 分享   → 用户随口说，AI 创建文件并 share
③ 看看谁 → nearme list                # 看有哪些人（编号列表）
④ 下载   → nearme download             # 决定要了再下载到本地
⑤ 探索   → 问 AI "谁做 Rust？"           # 读本地文件回答
```

## 命令

| 命令 | 用法 | 说明 |
|------|------|------|
| `here` | `nearme here <code\|描述>` | 定位到空间 |
| `share` | `nearme share <路径>` | 上传自己的 profile |
| `list` | `nearme list` | 列出当前空间所有人 |
| `download` | `nearme download` | 下载所有 profiles 到本地 |
| `unshare` | `nearme unshare` | 撤回自己的 profile |
| `refresh` | `nearme refresh` | 检查新人 |
| `message` | `nearme message <名字> <内容>` | 给某人留言 |
| `inbox` | `nearme inbox` | 查看留言 |
| `notice` | `nearme notice [内容]` | 查看/发布公告 |
| `board` | `nearme board` | 查看公告板 |
| `network` | `nearme network` | 互动关系（仅创建者） |
| `partner` | `nearme partner <名字>` | 添加伙伴（仅创建者） |
| `close` | `nearme close` | 关闭空间（仅创建者） |
| `create` | `nearme create <名称> [--pass]` | 创建空间 |

## 使用流程

### 用户说"我要分享"：
1. 读 base-dir 下 `state.json` 的 `lastProfileName` — 知道你是谁
2. 认识你 → 问"要修改介绍吗？" → 创建/更新 `.md` 文件（存到 base-dir 下）
3. 不认识 → 问几个问题 → 创建 `.md`（存到 base-dir 下）
4. 如果用户不知道写什么，展示 `template.md` 的内容作为参考

5. 运行 `nearme share <base-dir>/你的文件名.md`

### 用户说"看看谁在"或 list：
1. `nearme list`
2. 直接展示 CLI 的输出结果，**保留原有的 👑 🤝 📝 标记**，不要重新排版
3. 用户选编号 → 用 `nearme view <名字>` 查看单人详情（只下载一个人，不影响其他缓存）

### 管理伙伴（仅创建者）：
- `list` 后问"要把谁加为伙伴？输入编号"
- `nearme partner <名字>`
- 进入新空间时，检查 `state.json` 的历史伙伴，问"要带过来吗？"

## Profile 格式（你生成，用户不需要知道）
```markdown
---
name: 名字
tags: [行业, 角色, 资源]
---
## 我是谁
一句话介绍自己（行业 + 角色 + 核心优势）

## 我提供
- **产品/服务：** 具体做什么
- **核心优势：** 差异化竞争力

## 我需求
- **找渠道：** 下游分销 / 推广合作
- **找资源：** 上游供应链 / 技术 / 资金
- **找伙伴：** 项目合伙 / 联合运营 / 技术合作

## 联系方式
- **网站：** https://
- **公众号：**
- **视频号 / 抖音：**
```

## 注意事项
- 先执行 `nearme here <code>` 再执行其他命令
- 密码空间用 `nearme here <code> --pass <密码>`
- 内容自动审查
- 空间 24h 无活动自动过期
