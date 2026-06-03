# NearMe — Share MD profiles with people nearby

通过 AI Agent 分享个人简介，拿到同场地其他人的简介到本地。

## 安装

```bash
git clone https://github.com/paultang/nearme ~/.claude/skills/nearme
```

## 要求

- Node.js 18+
- Claude Code

## 使用

```
nearme here <code|描述>     定位到空间
nearme share <路径>          上传 profile
nearme list                  列出所有人
nearme view <名字>           查看单人详情
nearme download             全部下载到本地
nearme unshare              撤回 profile
nearme refresh              检查新人
nearme message <名字> <内容> 留言
nearme inbox                收件箱
nearme notice [内容]         公告板
nearme board                查看公告板
nearme network              互动关系（仅创建者）
nearme partner <名字>        添加伙伴（仅创建者）
nearme close                关闭空间（仅创建者）
nearme create <名称>         创建空间
```

## 数据

所有数据通过云函数 API 存储，本地缓存存在 `nearme-profiles/` 目录。
