# 🚀 Waline 后端部署指南

## 📋 准备工作

你需要：

- ✅ GitHub 账号
- ✅ Vercel 账号（用 GitHub 登录）
- ✅ LeanCloud 账号（免费数据库，可选）

---

## 🎯 方法 1: 一键部署到 Vercel（推荐）

### 步骤 1: 点击一键部署按钮

访问：https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample

或者直接访问 Waline 官网：https://waline.js.org/guide/deploy/vercel.html

### 步骤 2: 登录 Vercel

用你的 GitHub 账号登录 Vercel

### 步骤 3: 创建仓库

Vercel 会自动创建一个新的 GitHub 仓库（建议命名：`waline-backend`）

### 步骤 4: 配置环境变量

在 Vercel 部署页面添加以下环境变量：

**必需配置：**

```
LEAN_ID=你的LeanCloud AppID
LEAN_KEY=你的LeanCloud AppKey
LEAN_MASTER_KEY=你的LeanCloud MasterKey
```

**可选配置（推荐）：**

```
SITE_NAME=Jiahua Ma's Website
SITE_URL=https://jiahuama.com
AUTHOR_EMAIL=naxxhua@gmail.com
```

### 步骤 5: 部署

点击 **Deploy** 按钮，等待 1-2 分钟

部署完成后，你会得到一个 URL，类似：

```
https://your-waline-backend.vercel.app
```

---

## 🗄️ 配置 LeanCloud 数据库（免费）

### 步骤 1: 注册 LeanCloud

访问：https://console.leancloud.app/register

选择 **国际版**（支持中国区域但不需要备案）

### 步骤 2: 创建应用

1. 点击 "创建应用"
2. 应用名称：`waline-comments`
3. 开发版（免费）

### 步骤 3: 获取密钥

进入应用 → 设置 → 应用凭证，复制：

- App ID
- App Key
- Master Key

### 步骤 4: 配置安全域名

进入应用 → 设置 → 安全中心：

- 添加 Web 安全域名：
  - `https://jiahuama.com`
  - `http://localhost:4322`（本地测试）

---

## ⚙️ 更新网站配置

### 步骤 1: 修改 WalineComment.astro

打开 `src/components/WalineComment.astro`，找到第 37 行：

```javascript
serverURL: 'https://your-waline-server.vercel.app',
```

替换为你的 Vercel 部署 URL：

```javascript
serverURL: 'https://your-waline-backend.vercel.app',
```

### 步骤 2: 测试

运行本地开发服务器：

```bash
npm run dev
```

访问：http://localhost:4322/contact

测试留言功能：

- ✅ 输入昵称和邮箱
- ✅ 写评论
- ✅ 上传图片（拖拽或点击上传）
- ✅ 提交

---

## 🎨 高级配置（可选）

### 1. 启用邮件通知

在 Vercel 环境变量中添加：

```
# SMTP 邮箱（163邮箱示例）
SMTP_SERVICE=163
SMTP_USER=your-email@163.com
SMTP_PASS=your-auth-code
SITE_NAME=Jiahua Ma's Website
SITE_URL=https://jiahuama.com
AUTHOR_EMAIL=naxxhua@gmail.com
```

### 2. 启用图床（默认用 Waline 自带）

如果想用自己的图床（七牛云、腾讯云），在 Vercel 环境变量添加：

```
# 腾讯云 COS 示例
IMG_UPLOAD_TYPE=tcb
TCB_ENV_ID=your-env-id
TCB_SECRET_ID=your-secret-id
TCB_SECRET_KEY=your-secret-key
TCB_FOLDER=waline-images
```

### 3. 配置管理员（审核评论）

访问：`https://your-waline-backend.vercel.app/ui/register`

注册第一个用户（自动成为管理员）

管理后台：`https://your-waline-backend.vercel.app/ui`

---

## 🔍 常见问题

### Q: 评论区不显示？

- 检查 `serverURL` 是否正确
- 打开浏览器控制台查看错误信息
- 确认 Vercel 部署成功

### Q: 图片上传失败？

- 默认图片会存储在 Vercel（有限制）
- 建议配置腾讯云 COS 或七牛云

### Q: 收不到邮件通知？

- 检查 SMTP 配置是否正确
- 使用邮箱的"授权码"而不是登录密码

### Q: 如何审核评论？

- 访问管理后台：`your-waline-backend.vercel.app/ui`
- 登录后可以审核、删除、回复评论

---

## 📝 快速检查清单

部署完成后，检查这些：

- [ ] Vercel 部署成功，访问 URL 无报错
- [ ] LeanCloud 创建应用并配置安全域名
- [ ] Vercel 环境变量配置完整（LEAN_ID, LEAN_KEY, LEAN_MASTER_KEY）
- [ ] `WalineComment.astro` 中的 `serverURL` 已更新
- [ ] 本地测试评论功能正常
- [ ] 图片上传功能正常
- [ ] 中英文切换正常
- [ ] 管理员账号已注册

---

## 🎉 完成！

现在你的朋友可以：

- ✅ 匿名留言（只需昵称+邮箱）
- ✅ 直接上传图片（拖拽或粘贴）
- ✅ 使用 Markdown 格式
- ✅ 添加 Emoji 表情
- ✅ 中英文界面切换

你可以：

- ✅ 在后台审核所有评论
- ✅ 收到邮件通知
- ✅ 回复、删除、置顶评论
- ✅ 查看评论统计

---

## 📚 更多文档

- Waline 官方文档：https://waline.js.org
- Vercel 文档：https://vercel.com/docs
- LeanCloud 文档：https://docs.leancloud.app

有问题随时问我！🚀
