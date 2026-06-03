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
| `view` | `nearme view <名字\|编号>` | 查看单人详情 |
| `message` | `nearme message <名字\|编号> <内容>` | 给某人留言 |
| `inbox` | `nearme inbox` | 查看留言 |
| `notice` | `nearme notice [内容]` | 查看/发布公告 |
| `board` | `nearme board` | 查看公告板 |
| `network` | `nearme network` | 互动关系（仅创建者） |
| `partner` | `nearme partner <名字\|编号>` | 添加伙伴（仅创建者） |
| `close` | `nearme close` | 关闭空间（仅创建者） |
| `create` | `nearme create <名称> [--pass]` | 创建空间 |

## 使用流程

### 用户说"我要分享"：
1. 读 base-dir 下 `state.json` 的 `lastProfileName` — 知道你是谁
2. 认识你 → 问"要修改介绍吗？" → 走下方"引导提问"流程完善内容
3. 不认识 → 进入下方"引导提问"流程
4. 如果用户不知道写什么，展示 `template.md` 的内容作为参考

### 引导提问流程（用问题库引导对话）：
1. **先检查当前目录** `./questions.md` 是否存在
2. 如果存在：
   a. **读取 `./questions.md`**，用其中的问题引导对话
   b. **逐个提问**：每次问 1 个问题，根据回答自然追问
   c. **不要一次性抛所有问题**，模拟真人的对话节奏
   d. 覆盖各维度：基本信息 → 业务定位 → AI 工具与技术栈 → 市场渠道 → 资本资源 → 连接意向
3. 如果当前目录没有，检查 skill base-dir 下是否存在 `questions.md`（缓存）
4. 两个地方都没有（回退）：
   a. 用通用问题了解：行业、角色、提供什么、需要什么
   b. 或展示 `template.md` 让用户参考

4. 收集足够信息后，按下方 Profile 格式生成 `.md` 文件

5. **名字查重：** 创建/更新前，先 `nearme list` 看看空间里有没有同名的人
   - 有重名 → 告知用户，建议改个不同的名字（如加后缀、用昵称）
   - 确保每个人在空间中有唯一标识的名字
6. 运行 `nearme share <base-dir>/你的文件名.md`

### 用户说"看看谁在"或 list：
1. `nearme list`
2. 直接展示 CLI 的输出结果，**保留原有的（主持人）🤝 📝 标记和编号**，不要重新排版
3. 用户选编号 → 用 `nearme view <编号>` 查看单人详情
4. 支持用编号代替名字：`nearme view 3`、`nearme message 2 你好`、`nearme partner 4`

### 管理伙伴（仅创建者）：
- `list` 后问"要把谁加为伙伴？输入编号"
- `nearme partner <名字>`
- 进入新空间时，检查 `state.json` 的历史伙伴，问"要带过来吗？"

### 创建/改进问题库（通过对话生成）：
当用户说"设置问题"、"改进问题"、"创建问题库"时，不走文件编辑，而是通过**对话**逐步构建：

1. **了解场景：** 先问用户"这是什么类型的聚会？什么主题？有什么特点？"
   - 例如：AI 技术聚会、跨境电商沙龙、投资人对接会
2. **建议分类：** 根据场景，推荐 4-6 个问题分类（如：基本信息、业务定位、工具技能、市场渠道、资本资源、连接意向）
3. **逐一讨论：** 对每个分类，问用户"关于[XX类别]，你想了解大家的什么信息？"
   - 根据用户描述，生成该分类下的具体问题
   - 用户可以补充、修改、删除某个问题
4. **汇总确认：** 生成完整的问题列表，展示给用户确认
5. **生成文件：** 确认后，按 Markdown 格式生成 `questions.md` 并保存到 base-dir
6. **绑定空间：** 运行 `nearme questions --set <base-dir>/questions.md`

过程中保持对话感，不要一次性列出所有问题让用户改，而是逐个分类讨论。

## Profile 格式（你生成，用户不需要知道）
```markdown
---
name: 名字
tags: [行业, 角色, 资源]
---
## 我在哪
- **桌号：**
- **排数：**

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
- `questions.md` 保存在**当前目录**（`./questions.md`），可手动编辑后用 `nearme questions --set ./questions.md` 更新到云端
- **每次用户查询（list / inbox / board / view 等），必须重新运行命令并展示结果。不要说"同上"、"跟上次一样"，直接执行并展示**
